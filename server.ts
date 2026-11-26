import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import express from 'express';
import nodemailer from 'nodemailer';
import {GoogleGenAI, Type} from '@google/genai';
import {MEDICAL_SERVICES} from './src/data/servicesData.ts';
import {MEDICAL_ARTICLES} from './src/data/knowledgeData.ts';
import {INITIAL_REVIEWS} from './src/data/reviewsData.ts';
import {COMMON_MEDICAL_FAQS} from './src/data/faqData.ts';
import {
  CLINIC_DIRECT_PHONE,
  CLINIC_EMAIL,
  CLINIC_KSA_WHATSAPP_DISPLAY,
  CLINIC_WHATSAPP_DISPLAY,
  DOCTOR_BUSINESS_CARD_URL,
  DOCTOR_CHAT_FAQ_ANSWERS,
  DOCTOR_DIRECT_CONTACT_NOTE,
  DOCTOR_YOUTUBE_URL,
} from './src/data/doctorChatKnowledge.ts';
import {INITIAL_TOPIC_POLL} from './src/data/pollData.ts';
import type {AppointmentConfirmation, ConsultationMode, PatientReview, TopicPollState} from './src/types/medical.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const app = express();
app.use(express.json({limit: '100kb'}));

// Persistent store path (fixed server directory, never user-controlled)
const DATA_DIR = path.resolve(__dirname, 'data');
const REVIEWS_FILE = path.resolve(DATA_DIR, 'reviews.json');
const POLL_FILE = path.resolve(DATA_DIR, 'topic-poll.json');

function loadPersistedReviews(): PatientReview[] {
  try {
    if (fs.existsSync(REVIEWS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf8'));
      if (Array.isArray(parsed)) return parsed as PatientReview[];
    }
  } catch (err) {
    console.error('Failed to read persisted reviews:', err);
  }
  return [...INITIAL_REVIEWS];
}

function savePersistedReviews(list: PatientReview[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, {recursive: true});
    }
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save reviews:', err);
  }
}

function loadPersistedPoll(): TopicPollState {
  const baseOptions = INITIAL_TOPIC_POLL.options.map((opt) => ({...opt}));
  try {
    if (fs.existsSync(POLL_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(POLL_FILE, 'utf8')) as Partial<TopicPollState>;
      if (parsed && parsed.pollId === INITIAL_TOPIC_POLL.pollId && Array.isArray(parsed.options)) {
        const voteMap = new Map<string, number>();
        for (const item of parsed.options) {
          if (item && typeof item.id === 'string' && typeof item.votes === 'number' && Number.isFinite(item.votes) && item.votes >= 0) {
            voteMap.set(item.id, Math.floor(item.votes));
          }
        }
        const mergedOptions = baseOptions.map((opt) => ({
          ...opt,
          votes: voteMap.get(opt.id) ?? 0,
        }));
        const totalVotes = mergedOptions.reduce((sum, opt) => sum + opt.votes, 0);
        return {
          ...INITIAL_TOPIC_POLL,
          options: mergedOptions,
          totalVotes,
          updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : INITIAL_TOPIC_POLL.updatedAt,
        };
      }
    }
  } catch (err) {
    console.error('Failed to read persisted topic poll:', err);
  }
  return {
    ...INITIAL_TOPIC_POLL,
    options: baseOptions,
    totalVotes: 0,
  };
}

function savePersistedPoll(poll: TopicPollState) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, {recursive: true});
    }
    fs.writeFileSync(POLL_FILE, JSON.stringify(poll, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save topic poll:', err);
  }
}

// In-memory store for appointments and persistent stores for reviews & topic poll
const bookedSlots = new Map<string, AppointmentConfirmation>();
const clinicReviews: PatientReview[] = loadPersistedReviews();
const topicPollState: TopicPollState = loadPersistedPoll();

const TIME_SLOTS_BY_MODE: Record<ConsultationMode, string[]> = {
  online: ['09:00', '10:00', '11:30', '14:00', '16:00', '18:30', '20:00'],
  riyadh: ['09:30', '10:30', '12:00', '16:30', '17:30', '19:00', '20:30'],
  jordan: ['09:00', '10:30', '12:00', '13:30', '15:30', '17:00', '18:30'],
};

function sanitizeString(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[<>]/g, '').trim().slice(0, maxLen);
}

function isValidMode(mode: unknown): mode is ConsultationMode {
  return mode === 'online' || mode === 'riyadh' || mode === 'jordan';
}

function isValidDateString(dateStr: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function dispatchBookingEmail(params: {
  referenceCode: string;
  mode: ConsultationMode;
  serviceTitleAr: string;
  serviceTitleEn: string;
  date: string;
  timeSlot: string;
  patientName: string;
  phone: string;
  email: string;
  notes: string;
}): Promise<boolean> {
  const clinicEmail = process.env.CLINIC_BOOKING_EMAIL?.trim() || 'dr.motasem.alnsour@gmail.com';
  const modeLabels: Record<ConsultationMode, string> = {
    online: 'Online Telehealth (عن بعد)',
    riyadh: 'In-Clinic Riyadh, KSA (حضوري - الرياض)',
    jordan: 'In-Clinic Amman, Jordan (حضوري - الأردن)',
  };

  const plainBody = [
    `New Appointment Booking - ${params.referenceCode}`,
    `Mode: ${modeLabels[params.mode]}`,
    `Service: ${params.serviceTitleAr} | ${params.serviceTitleEn}`,
    `Date & Time: ${params.date} at ${params.timeSlot}`,
    `Patient Name: ${params.patientName}`,
    `Phone / WhatsApp: ${params.phone}`,
    `Patient Email: ${params.email || 'Not provided'}`,
    `Clinical Notes: ${params.notes || 'None'}`,
  ].join('\n');

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <h2 style="color: #0B3C5D;">New Appointment Booking (${escapeHtml(params.referenceCode)})</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Mode</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(modeLabels[params.mode])}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Service</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(params.serviceTitleAr)} — ${escapeHtml(params.serviceTitleEn)}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Date & Time</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(params.date)} · ${escapeHtml(params.timeSlot)}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Patient Name</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(params.patientName)}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Phone / WhatsApp</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(params.phone)}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Patient Email</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(params.email || 'Not provided')}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Notes</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(params.notes || '—')}</td></tr>
      </table>
    </div>
  `;

  const subject = `[Clinic Booking ${params.referenceCode}] ${params.patientName} - ${params.date} ${params.timeSlot}`;

  // Option 1: Resend API if configured
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    try {
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM?.trim() || 'Clinic Booking <onboarding@resend.dev>',
          to: [clinicEmail],
          reply_to: params.email || undefined,
          subject,
          text: plainBody,
          html: htmlBody,
        }),
      });
      if (resp.ok) return true;
    } catch (err) {
      console.error('Resend dispatch failed:', err);
    }
  }

  // Option 2: Standard SMTP (e.g., Gmail App Password)
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  if (!smtpUser || !smtpPass) {
    return false;
  }

  const smtpHost = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || '465');

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Dr. Motasem Clinic Booking" <${smtpUser}>`,
      to: clinicEmail,
      replyTo: params.email || undefined,
      subject,
      text: plainBody,
      html: htmlBody,
    });
    return true;
  } catch (err) {
    console.error('SMTP dispatch failed:', err);
    return false;
  }
}

async function dispatchWhatsappCloudNotification(params: {
  referenceCode: string;
  mode: ConsultationMode;
  serviceTitleAr: string;
  date: string;
  timeSlot: string;
  patientName: string;
  phone: string;
  email: string;
  notes: string;
}): Promise<boolean> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  if (!token || !phoneNumberId) {
    return false;
  }

  const text = [
    `حجز موعد جديد (${params.referenceCode})`,
    `المسار: ${params.mode}`,
    `الخدمة: ${params.serviceTitleAr}`,
    `التاريخ والوقت: ${params.date} - ${params.timeSlot}`,
    `المريض: ${params.patientName}`,
    `الهاتف: ${params.phone}`,
    `الإيميل: ${params.email}`,
    `ملاحظات: ${params.notes || 'لا يوجد'}`,
  ].join('\n');

  try {
    const resp = await fetch(`https://graph.facebook.com/v20.0/${encodeURIComponent(phoneNumberId)}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: '962785483349',
        type: 'text',
        text: {body: text},
      }),
    });
    return resp.ok;
  } catch (err) {
    console.error('WhatsApp Cloud API dispatch failed:', err);
    return false;
  }
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ok: true});
});

// Available appointment slots (Online Telehealth Only)
app.get('/api/appointments/availability', (req, res) => {
  const date = typeof req.query.date === 'string' ? req.query.date : '';

  if (!isValidDateString(date)) {
    res.status(400).json({error: 'Invalid date format (YYYY-MM-DD required).'});
    return;
  }

  const mode: ConsultationMode = 'online';
  const allSlots = TIME_SLOTS_BY_MODE.online;
  const slots = allSlots.map((slot) => {
    const key = `${mode}:${date}:${slot}`;
    return {
      time: slot,
      available: !bookedSlots.has(key),
    };
  });

  res.json({mode, date, slots});
});

// Create appointment booking (Online Telehealth Only)
app.post('/api/appointments', async (req, res) => {
  const body = req.body ?? {};
  const mode: ConsultationMode = 'online';
  const serviceId = sanitizeString(body.serviceId, 64);
  const date = sanitizeString(body.date, 16);
  const timeSlot = sanitizeString(body.timeSlot, 16);
  const patientName = sanitizeString(body.patientName, 120);
  const phone = sanitizeString(body.phone, 32);
  const email = sanitizeString(body.email, 120);
  const notes = sanitizeString(body.notes, 500);

  if (body.mode && body.mode !== 'online') {
    res.status(400).json({error: 'In-clinic appointments are disabled; only Online Consultations are available.'});
    return;
  }
  const matchedService = MEDICAL_SERVICES.find((s) => s.id === serviceId);
  if (!matchedService) {
    res.status(400).json({error: 'Selected medical service not found.'});
    return;
  }
  if (!isValidDateString(date) || !TIME_SLOTS_BY_MODE[mode].includes(timeSlot)) {
    res.status(400).json({error: 'Invalid date or time slot selected.'});
    return;
  }
  if (patientName.length < 2) {
    res.status(400).json({error: 'Please enter a valid patient name.'});
    return;
  }
  if (!/^[+\d][\d\s-]{6,20}$/.test(phone)) {
    res.status(400).json({error: 'Please enter a valid phone or WhatsApp number.'});
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (email.length > 0) {
      res.status(400).json({error: 'Please enter a valid email address.'});
      return;
    }
  }

  const slotKey = `${mode}:${date}:${timeSlot}`;
  if (bookedSlots.has(slotKey)) {
    res.status(409).json({error: 'This time slot has already been reserved. Please choose another time.'});
    return;
  }

  const referenceCode = `MA-${new Date().getFullYear()}-${crypto.randomInt(1000, 9999)}`;

  const [emailDispatched, whatsappDispatched] = await Promise.all([
    dispatchBookingEmail({
      referenceCode,
      mode,
      serviceTitleAr: matchedService.title.ar,
      serviceTitleEn: matchedService.title.en,
      date,
      timeSlot,
      patientName,
      phone,
      email,
      notes,
    }),
    dispatchWhatsappCloudNotification({
      referenceCode,
      mode,
      serviceTitleAr: matchedService.title.ar,
      date,
      timeSlot,
      patientName,
      phone,
      email,
      notes,
    }),
  ]);

  const confirmation: AppointmentConfirmation = {
    referenceCode,
    mode,
    serviceId,
    date,
    timeSlot,
    patientName,
    phone,
    email,
    notes,
    status: notes ? 'confirmed_with_notes' : 'confirmed',
    emailDispatched,
    whatsappDispatched,
    createdAt: new Date().toISOString(),
  };

  bookedSlots.set(slotKey, confirmation);
  res.status(201).json(confirmation);
});

// Reviews endpoints
app.get('/api/reviews', (_req, res) => {
  res.json({reviews: clinicReviews});
});

app.post('/api/reviews', (req, res) => {
  const body = req.body ?? {};
  const name = sanitizeString(body.patientName, 80);
  const location = sanitizeString(body.location, 80);
  const consultationType = body.consultationType;
  const serviceId = sanitizeString(body.serviceId, 64);
  const visitDate = sanitizeString(body.visitDate, 16);
  const bookingRef = sanitizeString(body.bookingRef, 32).toUpperCase();
  const comment = sanitizeString(body.comment, 600);

  const rawRatings = body.ratings ?? {};
  const listening = Number(rawRatings.listening);
  const clarity = Number(rawRatings.clarity);
  const followUp = Number(rawRatings.followUp);
  const punctuality = Number(rawRatings.punctuality);

  const validScore = (n: number) => Number.isInteger(n) && n >= 1 && n <= 5;

  if (name.length < 2 || comment.length < 15 || !isValidMode(consultationType)) {
    res.status(400).json({error: 'Please enter your name, consultation location, and a detailed clinical review (at least 15 characters).'});
    return;
  }
  if (!isValidDateString(visitDate)) {
    res.status(400).json({error: 'Please enter a valid visit date (YYYY-MM-DD).'});
    return;
  }
  const matchedService = MEDICAL_SERVICES.find((s) => s.id === serviceId);
  if (!matchedService) {
    res.status(400).json({error: 'Please select the specific medical service you received.'});
    return;
  }
  if (!validScore(listening) || !validScore(clarity) || !validScore(followUp) || !validScore(punctuality)) {
    res.status(400).json({error: 'All 4 clinical evaluation criteria must be rated between 1 and 5.'});
    return;
  }

  // Verify against actual booked appointment reference if provided
  const isVerifiedByBookingRef =
    bookingRef.length > 0 &&
    Array.from(bookedSlots.values()).some((b) => b.referenceCode.toUpperCase() === bookingRef);

  const averageRating = Number(((listening + clarity + followUp + punctuality) / 4).toFixed(1));

  const newReview: PatientReview = {
    id: `rev-${crypto.randomUUID().slice(0, 8)}`,
    patientName: {ar: name, en: name},
    location: {
      ar:
        location ||
        (consultationType === 'riyadh'
          ? 'الرياض — المملكة العربية السعودية'
          : consultationType === 'jordan'
            ? 'عمّان — المملكة الأردنية الهاشمية'
            : 'استشارة طبية عن بعد (أونلاين)'),
      en:
        location ||
        (consultationType === 'riyadh'
          ? 'Riyadh, Saudi Arabia'
          : consultationType === 'jordan'
            ? 'Amman, Jordan'
            : 'Online Telehealth'),
    },
    consultationType,
    serviceId: matchedService.id,
    serviceName: matchedService.title,
    visitDate,
    bookingRef: bookingRef || undefined,
    ratings: {listening, clarity, followUp, punctuality},
    rating: averageRating,
    date: new Date().toISOString().slice(0, 10),
    comment: {ar: comment, en: comment},
    verified: isVerifiedByBookingRef,
  };

  clinicReviews.unshift(newReview);
  savePersistedReviews(clinicReviews);
  res.status(201).json({review: newReview});
});

// Knowledge Center Quick Poll endpoints
app.get('/api/poll', (_req, res) => {
  res.json(topicPollState);
});

app.post('/api/poll/vote', (req, res) => {
  const body = req.body ?? {};
  const optionId = sanitizeString(body.optionId, 64);
  const previousOptionId = sanitizeString(body.previousOptionId, 64);

  const targetOption = topicPollState.options.find((opt) => opt.id === optionId);
  if (!targetOption) {
    res.status(400).json({error: 'Invalid poll topic selected.'});
    return;
  }

  if (previousOptionId && previousOptionId !== optionId) {
    const prevOption = topicPollState.options.find((opt) => opt.id === previousOptionId);
    if (prevOption && prevOption.votes > 0) {
      prevOption.votes -= 1;
    }
    targetOption.votes += 1;
  } else if (previousOptionId !== optionId) {
    targetOption.votes += 1;
  }

  topicPollState.totalVotes = topicPollState.options.reduce((sum, opt) => sum + opt.votes, 0);
  topicPollState.updatedAt = new Date().toISOString();
  savePersistedPoll(topicPollState);

  res.json(topicPollState);
});

// Server-side Gemini AI Medical Assistant endpoint
app.post('/api/ai-assistant', async (req, res) => {
  const body = req.body ?? {};
  const message = sanitizeString(body.message, 1200);
  const lang = body.lang === 'en' ? 'en' : 'ar';
  const rawHistory = Array.isArray(body.history) ? body.history.slice(-6) : [];

  if (message.length < 2) {
    res.status(400).json({error: lang === 'ar' ? 'يرجى كتابة استفسارك الصحي.' : 'Please enter a health question.'});
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(503).json({
      error:
        lang === 'ar'
          ? 'خدمة المساعد الذكي غير مفعّلة حالياً. يرجى ضبط مفتاح GEMINI_API_KEY في إعدادات الأسرار.'
          : 'AI Assistant is unavailable because GEMINI_API_KEY is not configured in Settings > Secrets.',
    });
    return;
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const serviceCatalogSummary = MEDICAL_SERVICES.map(
    (s) => `${s.id}: ${s.title.en} / ${s.title.ar} (modes: ${s.modes.join(',')}) — ${s.shortDesc[lang]}`
  ).join('\n');

  const articleCatalogSummary = MEDICAL_ARTICLES.map(
    (a) => `${a.id}: ${a.title.en} / ${a.title.ar} [category: ${a.categoryId}]`
  ).join('\n');

  const doctorFaqKnowledge = [
    ...DOCTOR_CHAT_FAQ_ANSWERS.map((q) => `Q: ${q.question[lang]}\nDr. Motasem's Official Answer: ${q.answer[lang]}`),
    ...COMMON_MEDICAL_FAQS.map((f) => `Q: ${f.question[lang]}\nDr. Motasem's Official Answer: ${f.answer[lang]}`),
  ].join('\n\n');

  const conversationContext = rawHistory
    .map((h: unknown) => {
      if (typeof h !== 'object' || h === null) return '';
      const item = h as {role?: unknown; text?: unknown};
      const role = item.role === 'assistant' ? 'Assistant' : 'Patient';
      const text = sanitizeString(item.text, 500);
      return text ? `${role}: ${text}` : '';
    })
    .filter(Boolean)
    .join('\n');

  const systemInstruction = `You are the official Medical Consultation & Clinic Assistant for Dr. Motasem Alnsour (د. معتصم النسور), Senior Specialist in Family Medicine (Jordanian Board of Family Medicine & SCFHS Certified; clinical experience at Dr. Sulaiman Al Habib Hospital in Riyadh and Jordanian Ministry of Health).

PRACTICE & BOOKING FACTS (use these exact real details whenever asked about appointments, online consults, or channels):
- Online Consultations Only: Website appointment booking is EXCLUSIVELY for Online Telehealth Consultations ("online"). In-clinic visits are NOT booked on this website.
- Online Telehealth Consultation ("online"): Available DAILY worldwide via video or WhatsApp/audio for general consultations, reading & interpreting lab results/imaging reports (lab-results-interpretation), ordering targeted lab work (lab-tests-analysis), chronic disease management (diabetes, hypertension, cholesterol, thyroid), specialist referrals, weight/smoking cessation programs, and second medical opinions.
- Direct No-Login Booking: Patients book directly on this website WITHOUT creating an account or logging in. Submitting the form sends their booking straight to Dr. Motasem's email (${CLINIC_EMAIL}) and clinic WhatsApp lines.
- Official Contact & Social Channels:
  - Saudi Arabia WhatsApp: ${CLINIC_KSA_WHATSAPP_DISPLAY} (https://wa.me/966570117358)
  - Jordan WhatsApp: ${CLINIC_WHATSAPP_DISPLAY} (https://wa.me/962785483349)
  - Direct Call Phone: ${CLINIC_DIRECT_PHONE}
  - Clinic Email: ${CLINIC_EMAIL}
  - Official YouTube Channel: ${DOCTOR_YOUTUBE_URL}
  - Digital Business Card (HiHello): ${DOCTOR_BUSINESS_CARD_URL}

DR. MOTASEM'S REAL VERIFIED ANSWERS FOR COMMON QUESTIONS:
${doctorFaqKnowledge}

RULES:
1. Respond strictly in ${lang === 'ar' ? 'Arabic (Clear, calm, empathetic medical Arabic reflecting Dr. Motasem Alnsour’s voice)' : 'English (Clear, calm, empathetic clinical English reflecting Dr. Motasem Alnsour’s voice)'}.
2. When the user asks about appointments/booking, make sure to clarify that bookings are exclusively Online Consultations (no in-clinic bookings), explain how to book directly without login, and share the verified facts above.
3. For every medical or health-related question: provide accurate, evidence-based clinical education (never fabricate prescriptions or definitive diagnoses without examination), AND explicitly state at the end of your reply that for diagnostic accuracy and greater personalized benefit, it is best to contact Dr. Motasem Alnsour directly (e.g. "${DOCTOR_DIRECT_CONTACT_NOTE[lang]}").
4. Red-flag triage: If the user mentions crushing chest pain, severe shortness of breath, sudden weakness/numbness, fainting, severe bleeding, or infant <3 months with fever >=38C, set urgencyLevel to "urgent" and clearly advise immediate emergency care.
5. Select 1 to 3 most relevant service IDs strictly from this list:
${serviceCatalogSummary}
6. Select 1 to 3 most relevant article IDs strictly from this list:
${articleCatalogSummary}
7. Set isMedicalQuestion to true if the query involves symptoms, illnesses, lab tests, medications, prevention, or health advice; set shouldBook to true for medical questions, lab interpretation, online consults, or booking inquiries, and always set recommendedMode to "online".
8. Keep reply clear, structured, and around 90-180 words.`;

  const prompt = conversationContext
    ? `Previous context:\n${conversationContext}\n\nCurrent patient question:\n${message}`
    : message;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: 'Helpful, authentic response grounded in Dr. Motasem Alnsour’s practice in the requested language.',
            },
            urgencyLevel: {
              type: Type.STRING,
              description: 'One of: routine, soon, urgent',
            },
            suggestedServiceIds: {
              type: Type.ARRAY,
              items: {type: Type.STRING},
              description: '1 to 3 valid service IDs from the provided catalog.',
            },
            suggestedArticleIds: {
              type: Type.ARRAY,
              items: {type: Type.STRING},
              description: '1 to 3 valid article IDs from the provided catalog.',
            },
            shouldBook: {
              type: Type.BOOLEAN,
              description: 'Whether booking or contacting Dr. Motasem is recommended.',
            },
            recommendedMode: {
              type: Type.STRING,
              description: 'Always online.',
            },
            isMedicalQuestion: {
              type: Type.BOOLEAN,
              description: 'True if the question relates to medical symptoms, lab tests, diseases, or clinical advice.',
            },
            doctorAdviceNote: {
              type: Type.STRING,
              description: 'Clear reminder in the requested language advising direct contact with Dr. Motasem for diagnostic accuracy and maximum benefit.',
            },
          },
          required: ['reply', 'urgencyLevel', 'suggestedServiceIds', 'suggestedArticleIds', 'shouldBook', 'isMedicalQuestion', 'doctorAdviceNote'],
        },
      },
    });

    const rawText = (response.text ?? '{}').trim();
    const parsed = JSON.parse(rawText) as {
      reply?: string;
      urgencyLevel?: string;
      suggestedServiceIds?: string[];
      suggestedArticleIds?: string[];
      shouldBook?: boolean;
      recommendedMode?: string;
      isMedicalQuestion?: boolean;
      doctorAdviceNote?: string;
    };

    const validServiceIds = new Set(MEDICAL_SERVICES.map((s) => s.id));
    const validArticleIds = new Set(MEDICAL_ARTICLES.map((a) => a.id));

    const urgencyLevel =
      parsed.urgencyLevel === 'urgent' || parsed.urgencyLevel === 'soon' ? parsed.urgencyLevel : 'routine';

    const recommendedMode: ConsultationMode = 'online';
    const isMedicalQuestion = parsed.isMedicalQuestion !== false;
    const doctorAdviceNote =
      typeof parsed.doctorAdviceNote === 'string' && parsed.doctorAdviceNote.trim().length > 10
        ? parsed.doctorAdviceNote.trim()
        : DOCTOR_DIRECT_CONTACT_NOTE[lang];

    let finalReply = (parsed.reply || '').trim();
    if (isMedicalQuestion && finalReply && !finalReply.includes(lang === 'ar' ? 'التواصل' : 'contact')) {
      finalReply = `${finalReply}\n\n${DOCTOR_DIRECT_CONTACT_NOTE[lang]}`;
    }

    res.json({
      reply: finalReply,
      urgencyLevel,
      suggestedServiceIds: Array.isArray(parsed.suggestedServiceIds)
        ? parsed.suggestedServiceIds.filter((id) => validServiceIds.has(id)).slice(0, 3)
        : [],
      suggestedArticleIds: Array.isArray(parsed.suggestedArticleIds)
        ? parsed.suggestedArticleIds.filter((id) => validArticleIds.has(id)).slice(0, 3)
        : [],
      shouldBook: parsed.shouldBook !== false,
      recommendedMode,
      isMedicalQuestion,
      doctorAdviceNote,
    });
  } catch (err) {
    console.error('Gemini API error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Upstream AI error';
    res.status(502).json({
      error:
        lang === 'ar'
          ? `تعذر الحصول على رد من المساعد الذكي حالياً (${errorMessage}).`
          : `Unable to reach the AI assistant right now (${errorMessage}).`,
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.use('/Dr-Motasem-Alnsour-Jordanian-Board-of-Family-Medicine', express.static(distDir));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build not found');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dr. Motasem Alnsour Medical Platform listening on http://localhost:${PORT}`);
  });
}

startServer();
