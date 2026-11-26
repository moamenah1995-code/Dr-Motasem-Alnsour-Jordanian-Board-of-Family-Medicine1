import type {BilingualText, ConsultationMode} from '../types/medical';

export const CLINIC_DIRECT_PHONE = '+966570117358';
export const CLINIC_KSA_WHATSAPP_RAW = '966570117358';
export const CLINIC_KSA_WHATSAPP_DISPLAY = '+966570117358';
export const CLINIC_KSA_WHATSAPP_URL = 'https://wa.me/966570117358';

export const CLINIC_WHATSAPP_RAW = '962785483349';
export const CLINIC_WHATSAPP_DISPLAY = '+962785483349';
export const CLINIC_WHATSAPP_URL = 'https://wa.me/962785483349';

export const CLINIC_EMAIL = 'dr.motasem.alnsour@gmail.com';
export const DOCTOR_YOUTUBE_URL = 'https://www.youtube.com/@drmotasemalnsour?si=svKzDBJs84idEi_B';
export const DOCTOR_INSTAGRAM_URL = 'https://www.instagram.com/dr_motasem_alnsour?gwpx=MXNuc2kxeXIyNTdsYQ==';
export const DOCTOR_TIKTOK_URL = 'https://www.tiktok.com/@dr.motasem.alnsour?_r=1&_t=ZS-9BjUDRLkjBM';
export const DOCTOR_BUSINESS_CARD_URL = 'https://hihello.com/hi/dr.motasem.alnsour';
export const DOCTOR_PORTRAIT_PATH = '/assets/aistudio/___________ecefce18.png';

export const DOCTOR_DIRECT_CONTACT_NOTE: BilingualText = {
  ar: 'للحصول على دقة تشخيصية أعلى والاستفادة بشكل أكبر حسب حالتك الصحية وتاريخك المرضي، من الأفضل دائماً التواصل مباشرة مع د. معتصم النسور.',
  en: 'For greater clinical accuracy and maximum benefit tailored to your symptoms and medical history, it is always best to contact and consult Dr. Motasem Alnsour directly.',
};

export const WHATSAPP_ONLY_CONTACT_NOTE: BilingualText = {
  ar: 'ملاحظة: التواصل عند الرقم يكون عبر الواتساب فقط، ولا يتم الرد على المكالمات إلا بعد تأكيد الحجز مسبقاً. شكراً لتفهمكم.',
  en: 'Note: Contact on this number is via WhatsApp only; phone calls are not answered unless an appointment is confirmed in advance. Thank you for your understanding.',
};

export interface DoctorDirectFaqEntry {
  id: string;
  topic: BilingualText;
  question: BilingualText;
  answer: BilingualText;
  recommendedServiceId: string;
  recommendedMode: ConsultationMode;
}

export const DOCTOR_CHAT_FAQ_ANSWERS: DoctorDirectFaqEntry[] = [
  {
    id: 'qa-booking',
    topic: {ar: 'حجز الاستشارات أونلاين', en: 'Online Appointment Booking'},
    question: {
      ar: 'كيف أحجز استشارة طبية أونلاين مع د. معتصم النسور؟',
      en: 'How do I book an online medical consultation with Dr. Motasem Alnsour?',
    },
    answer: {
      ar: 'حجز المواعيد في الموقع متاح للاستشارات الطبية أونلاين فقط (عن بعد)، ويتم مباشرة خلال دقيقة واحدة دون الحاجة لتسجيل دخول أو إنشاء حساب. الاستشارات متاحة يومياً للمرضى في السعودية والأردن وكافة الدول. فور تعبئة بياناتك واختيار الموعد، تُرسل تفاصيل الحجز مباشرة إلى بريد الدكتور وواتساب العيادة السعودي (+966570117358) والأردني (+962785483349).',
      en: 'Website booking is dedicated exclusively to Online Medical Consultations and takes under a minute with no account or login required. Online visits are available daily for patients in Saudi Arabia, Jordan, and worldwide. Once submitted, your details are routed directly to Dr. Motasem’s email and WhatsApp lines (+966570117358 KSA & +962785483349 Jordan).',
    },
    recommendedServiceId: 'general-consultations',
    recommendedMode: 'online',
  },
  {
    id: 'qa-lab-reading',
    topic: {ar: 'قراءة وتفسير الفحوصات', en: 'Lab & Report Interpretation'},
    question: {
      ar: 'هل يقرأ د. معتصم نتائج التحاليل المخبرية والأشعة أونلاين؟',
      en: 'Does Dr. Motasem read and interpret lab tests and imaging online?',
    },
    answer: {
      ar: 'نعم، تتوفر خدمة قراءة وتفسير نتائج تحاليل الدم (صورة الدم، السكر التراكمي، الدهون، الغدة الدرقية، الكلى والكبد، الفيتامينات والهرمونات) وتقارير الأشعة من أي مختبر أو مستشفى معتمد عبر الاستشارة أونلاين، مع ربط الأرقام بأعراضك الفعلية ووضع الخطوة العلاجية المناسبة. ومن الأفضل التواصل مع الدكتور مباشرة ومشاركته التقرير لضمان دقة التفسير والاستفادة الكاملة.',
      en: 'Yes. Through Online Consultations, Dr. Motasem interprets blood tests (CBC, HbA1c, lipids, thyroid, kidney/liver panels, vitamins, hormones) and radiology reports from any accredited lab or hospital—correlating findings directly with your symptoms. For accurate medical interpretation and maximum benefit, please contact Dr. Motasem directly with your reports.',
    },
    recommendedServiceId: 'lab-results-interpretation',
    recommendedMode: 'online',
  },
  {
    id: 'qa-online-consults',
    topic: {ar: 'الاستشارات الطبية أونلاين المتاحة', en: 'Available Online Consultations'},
    question: {
      ar: 'ما هي الاستشارات الطبية أونلاين المتاحة وما الذي تشمله؟',
      en: 'What online medical consultations are available and covered?',
    },
    answer: {
      ar: 'الاستشارات الطبية أونلاين متاحة يومياً وتشمل: الاستشارات الطبية العامة، قراءة وتفسير الفحوصات وطلب التحاليل الموجهة، متابعة الأمراض المزمنة (السكري، الضغط، الكوليسترول، الغدة الدرقية)، الرأي الطبي الثاني، التوجيه للتخصص الدقيق، متابعة صحة الطفل والمرأة وكبار السن، وبرامج إنقاص الوزن والإقلاع عن التدخين، مع استلام ملخص خطة علاجية واضحة بعد الجلسة.',
      en: 'Online consultations are available daily and cover general medical evaluations, reading lab/imaging reports and ordering targeted tests, chronic disease follow-up (diabetes, hypertension, cholesterol, thyroid), specialist referral guidance, child/women’s/senior wellness, weight and smoking-cessation programs, plus a structured post-visit care plan.',
    },
    recommendedServiceId: 'remote-telemedicine',
    recommendedMode: 'online',
  },
  {
    id: 'qa-channels',
    topic: {ar: 'التواصل والحسابات الرسمية والبطاقة الرقمية', en: 'WhatsApp, Social Channels & Business Card'},
    question: {
      ar: 'ما هي روابط التواصل وقنوات اليوتيوب وإنستغرام وتيك توك وبطاقة الطبيب الرقمية؟',
      en: 'What are Dr. Motasem’s WhatsApp numbers, YouTube, Instagram, TikTok, and Digital Business Card?',
    },
    answer: {
      ar: 'يمكنك التواصل مباشرة عبر واتساب السعودية (+966570117358) أو واتساب الأردن (+962785483349) أو البريد الإلكتروني (dr.motasem.alnsour@gmail.com)، علماً أن التواصل على الرقم يكون عبر الواتساب فقط ولا يتم الرد على المكالمات إلا بعد تأكيد الحجز مسبقاً. كما يمكنك متابعة المحتوى التوعوي عبر يوتيوب وإنستغرام وتيك توك وحفظ بطاقة العمل الرقمية (HiHello).',
      en: 'You can reach Dr. Motasem directly via KSA WhatsApp (+966570117358), Jordan WhatsApp (+962785483349), or email (dr.motasem.alnsour@gmail.com). Please note that contact on the number is via WhatsApp only and phone calls are answered only after an appointment is confirmed in advance. You can also follow his medical channels on YouTube, Instagram, and TikTok or save his HiHello Digital Business Card.',
    },
    recommendedServiceId: 'general-consultations',
    recommendedMode: 'online',
  },
];
