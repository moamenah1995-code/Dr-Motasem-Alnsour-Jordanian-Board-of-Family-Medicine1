import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  IdCard,
  Info,
  Mail,
  MessageCircle,
  Phone,
  Video,
} from 'lucide-react';
import {useEffect, useMemo, useState, type FormEvent} from 'react';
import {
  CLINIC_EMAIL,
  CLINIC_KSA_WHATSAPP_RAW,
  CLINIC_WHATSAPP_RAW,
  DOCTOR_BUSINESS_CARD_URL,
  DOCTOR_PORTRAIT_PATH,
  WHATSAPP_ONLY_CONTACT_NOTE,
} from '../data/doctorChatKnowledge';
import {MEDICAL_SERVICES} from '../data/servicesData';
import type {AppointmentConfirmation, ConsultationMode, Lang} from '../types/medical';

interface BookingPageProps {
  lang: Lang;
  initialServiceId?: string | null;
  initialMode?: ConsultationMode | null;
}

interface SlotAvailability {
  time: string;
  available: boolean;
}

type OnlineChannelPreference = 'video' | 'audio';

function getUpcomingDates(days = 10): string[] {
  const result: string[] = [];
  const today = new Date();
  for (let i = 1; i <= days; i += 1) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    result.push(d.toISOString().slice(0, 10));
  }
  return result;
}

export function BookingPage({lang, initialServiceId}: BookingPageProps) {
  const upcomingDates = useMemo(() => getUpcomingDates(10), []);

  // Online-only booking mode
  const mode: ConsultationMode = 'online';
  const [onlineChannel, setOnlineChannel] = useState<OnlineChannelPreference>('video');
  const [serviceId, setServiceId] = useState<string>(initialServiceId ?? MEDICAL_SERVICES[0].id);
  const [date, setDate] = useState<string>(upcomingDates[0]);
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [slots, setSlots] = useState<SlotAvailability[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmation, setConfirmation] = useState<AppointmentConfirmation | null>(null);

  useEffect(() => {
    if (initialServiceId) setServiceId(initialServiceId);
  }, [initialServiceId]);

  useEffect(() => {
    let cancelled = false;
    setLoadingSlots(true);
    setErrorMsg('');

    fetch(`/api/appointments/availability?mode=online&date=${encodeURIComponent(date)}`)
      .then((res) => res.json())
      .then((data: {slots?: SlotAvailability[]; error?: string}) => {
        if (cancelled) return;
        const fetched = Array.isArray(data.slots) ? data.slots : [];
        setSlots(fetched);
        const firstAvailable = fetched.find((s) => s.available)?.time ?? '';
        setTimeSlot(firstAvailable);
      })
      .catch(() => {
        if (!cancelled) {
          setSlots([]);
          setErrorMsg(lang === 'ar' ? 'تعذر تحميل المواعيد المتاحة.' : 'Unable to load available time slots.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });

    return () => {
      cancelled = true;
    };
  }, [date, lang]);

  const selectedService = MEDICAL_SERVICES.find((s) => s.id === serviceId) ?? MEDICAL_SERVICES[0];

  const isPatientInfoComplete = patientName.trim().length >= 2 && /^[+\d][\d\s-]{6,20}$/.test(phone.trim());
  const bookingSteps = [
    {
      id: 'booking-step-1',
      num: '01',
      label: lang === 'ar' ? 'طريقة الاستشارة' : 'Format',
      completed: Boolean(onlineChannel),
    },
    {
      id: 'booking-step-2',
      num: '02',
      label: lang === 'ar' ? 'الخدمة الطبية' : 'Service',
      completed: Boolean(serviceId),
    },
    {
      id: 'booking-step-3',
      num: '03',
      label: lang === 'ar' ? 'التاريخ والوقت' : 'Date & Time',
      completed: Boolean(date && timeSlot),
    },
    {
      id: 'booking-step-4',
      num: '04',
      label: lang === 'ar' ? 'بيانات المريض' : 'Patient Info',
      completed: isPatientInfoComplete,
    },
  ];
  const completedCount = bookingSteps.filter((step) => step.completed).length;
  const remainingSteps = bookingSteps.length - completedCount;
  const progressPercent = confirmation ? 100 : Math.round((completedCount / bookingSteps.length) * 100);

  const scrollToStep = (stepId: string) => {
    const el = document.getElementById(stepId);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!timeSlot) {
      setErrorMsg(lang === 'ar' ? 'يرجى اختيار وقت الموعد.' : 'Please choose an available time slot.');
      return;
    }

    const channelPrefix =
      onlineChannel === 'video'
        ? lang === 'ar'
          ? '[طريقة الاتصال: استشارة فيديو أونلاين]'
          : '[Channel: Online Video Consultation]'
        : lang === 'ar'
          ? '[طريقة الاتصال: استشارة صوتية / واتساب أونلاين]'
          : '[Channel: Online Audio / WhatsApp Consultation]';
    const combinedNotes = notes.trim() ? `${channelPrefix} ${notes.trim()}` : channelPrefix;

    setSubmitting(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          mode,
          serviceId,
          date,
          timeSlot,
          patientName,
          phone,
          email,
          notes: combinedNotes,
          lang,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || (lang === 'ar' ? 'يرجى التحقق من البيانات المدخلة.' : 'Please verify your booking details.'));
        return;
      }
      setConfirmation(data as AppointmentConfirmation);
    } catch {
      setErrorMsg(lang === 'ar' ? 'حدث خطأ في الاتصال بالخادم.' : 'Network error submitting appointment.');
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    const fullPatientDetailsAr = [
      `طلب حجز استشارة أونلاين — د. معتصم النسور`,
      `الرقم المرجعي: ${confirmation.referenceCode}`,
      `نوع الاستشارة: استشارة طبية أونلاين (عن بعد)`,
      `الخدمة الطبية: ${selectedService.title.ar}`,
      `التاريخ والوقت: ${confirmation.date} الساعة ${confirmation.timeSlot}`,
      `اسم المريض: ${confirmation.patientName}`,
      `رقم الجوال/واتساب: ${confirmation.phone}`,
      `البريد الإلكتروني: ${confirmation.email || 'غير متوفر'}`,
      `تفاصيل وملاحظات: ${confirmation.notes || 'لا يوجد'}`,
    ].join('\n');

    const fullPatientDetailsEn = [
      `New Online Appointment Request — Dr. Motasem Alnsour`,
      `Reference Code: ${confirmation.referenceCode}`,
      `Consultation Mode: Online Telehealth Consultation`,
      `Medical Service: ${selectedService.title.en}`,
      `Date & Time: ${confirmation.date} at ${confirmation.timeSlot}`,
      `Patient Name: ${confirmation.patientName}`,
      `Phone / WhatsApp: ${confirmation.phone}`,
      `Patient Email: ${confirmation.email || 'Not provided'}`,
      `Clinical Notes: ${confirmation.notes || 'None'}`,
    ].join('\n');

    const summaryText = lang === 'ar' ? fullPatientDetailsAr : fullPatientDetailsEn;
    const whatsappMessage = encodeURIComponent(summaryText);
    const mailSubject = encodeURIComponent(
      `[Online Booking ${confirmation.referenceCode}] ${confirmation.patientName} - ${confirmation.date} ${confirmation.timeSlot}`
    );
    const mailBody = encodeURIComponent(summaryText);

    return (
      <div className="mx-auto max-w-[860px] px-4 py-14 sm:px-6">
        {/* Completed Progress Bar */}
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
          <div className="flex items-center justify-between gap-4 text-xs font-bold text-emerald-900">
            <span>{lang === 'ar' ? 'تم إتمام جميع خطوات الحجز أونلاين' : 'All Online Booking Steps Completed'}</span>
            <span className="font-mono-num tabular-nums">100%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={100}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-emerald-200"
          >
            <div className="h-full w-full bg-[#0F766E] transition-all duration-300" />
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-xs">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 text-emerald-700">
              <CheckCircle2 className="h-7 w-7 shrink-0" />
              <h1 className="font-display text-2xl font-bold text-slate-900">
                {lang === 'ar' ? 'تم تسجيل طلب الاستشارة أونلاين بنجاح' : 'Online Consultation Request Registered'}
              </h1>
            </div>
            <img
              src={DOCTOR_PORTRAIT_PATH}
              alt={lang === 'ar' ? 'د. معتصم النسور' : 'Dr. Motasem Alnsour'}
              referrerPolicy="no-referrer"
              className="h-14 w-14 rounded-xl border border-slate-200 object-cover object-top"
            />
          </div>

          <p className="mt-3 text-sm text-slate-600">
            {lang === 'ar'
              ? 'يمكنك إرسال بيانات الموعد مباشرة عبر واتساب السعودية (+966570117358) أو واتساب الأردن (+962785483349) أو البريد الإلكتروني للطبيب (dr.motasem.alnsour@gmail.com).'
              : 'Send your booking confirmation directly via Saudi WhatsApp (+966570117358), Jordan WhatsApp (+962785483349), or Dr. Motasem’s email (dr.motasem.alnsour@gmail.com).'}
          </p>
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200/90 bg-amber-50/70 px-3.5 py-2.5 text-xs leading-relaxed text-amber-950">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
            <span>{WHATSAPP_ONLY_CONTACT_NOTE[lang]}</span>
          </div>

          <dl className="mt-5 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50 px-5 text-sm">
            <div className="flex items-center justify-between py-3">
              <dt className="text-slate-500">{lang === 'ar' ? 'الرقم المرجعي' : 'Reference Code'}</dt>
              <dd className="font-mono-num font-bold text-[#0B3C5D]">{confirmation.referenceCode}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-slate-500">{lang === 'ar' ? 'نوع الاستشارة' : 'Consultation Type'}</dt>
              <dd className="font-semibold text-emerald-700">
                {lang === 'ar' ? 'استشارة طبية أونلاين (عن بعد)' : 'Online Telehealth Consultation'}
              </dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-slate-500">{lang === 'ar' ? 'الخدمة الطبية' : 'Medical Service'}</dt>
              <dd className="font-semibold text-slate-900">{selectedService.title[lang]}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-slate-500">{lang === 'ar' ? 'التاريخ والوقت' : 'Date & Time'}</dt>
              <dd className="font-mono-num font-semibold text-slate-900">
                {confirmation.date} · {confirmation.timeSlot}
              </dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-slate-500">{lang === 'ar' ? 'اسم المريض' : 'Patient Name'}</dt>
              <dd className="font-semibold text-slate-900">{confirmation.patientName}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-slate-500">{lang === 'ar' ? 'رقم الجوال / واتساب' : 'Phone / WhatsApp'}</dt>
              <dd dir="ltr" className="font-mono-num font-semibold text-slate-900">
                {confirmation.phone}
              </dd>
            </div>
            {confirmation.email && (
              <div className="flex items-center justify-between py-3">
                <dt className="text-slate-500">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</dt>
                <dd dir="ltr" className="font-medium text-slate-900">
                  {confirmation.email}
                </dd>
              </div>
            )}
            {confirmation.notes && (
              <div className="py-3">
                <dt className="text-slate-500">{lang === 'ar' ? 'الملاحظات الطبية' : 'Clinical Notes'}</dt>
                <dd className="mt-1 text-slate-800">{confirmation.notes}</dd>
              </div>
            )}
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${CLINIC_KSA_WHATSAPP_RAW}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              <MessageCircle className="h-4 w-4" />
              <span>
                {lang === 'ar'
                  ? 'واتساب السعودية (966570117358)'
                  : 'Saudi WhatsApp (966570117358)'}
              </span>
            </a>

            <a
              href={`https://wa.me/${CLINIC_WHATSAPP_RAW}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-700 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-100"
            >
              <MessageCircle className="h-4 w-4 text-emerald-700" />
              <span>
                {lang === 'ar'
                  ? 'واتساب الأردن (962785483349)'
                  : 'Jordan WhatsApp (962785483349)'}
              </span>
            </a>

            <a
              href={`mailto:${CLINIC_EMAIL}?subject=${mailSubject}&body=${mailBody}`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0B3C5D] px-4 py-3 text-sm font-semibold text-white hover:bg-[#082c44]"
            >
              <Mail className="h-4 w-4" />
              <span>
                {lang === 'ar' ? 'إرسال للإيميل' : 'Send via Email'}
              </span>
            </a>

            <button
              type="button"
              onClick={() => {
                setConfirmation(null);
                setNotes('');
              }}
              className="cursor-pointer rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              {lang === 'ar' ? 'حجز موعد آخر' : 'Book Another Appointment'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <div className="max-w-3xl border-b border-slate-200 pb-6">
        <div className="text-xs font-semibold text-[#0369A1]">
          {lang === 'ar'
            ? 'حجز استشارة طبية أونلاين فقط · بدون تسجيل دخول · متاح يومياً'
            : 'Online Medical Consultations Only · Direct Booking Without Login · Available Daily'}
        </div>
        <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {lang === 'ar' ? 'احجز استشارتك الطبية أونلاين مع د. معتصم النسور' : 'Book Your Online Consultation With Dr. Motasem Alnsour'}
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          {lang === 'ar'
            ? 'لا يتطلب إنشاء حساب أو تسجيل دخول — عبّئ بياناتك واختر الوقت المناسب لإرسال الطلب مباشرة إلى بريد الدكتور وأرقام الواتساب المعتمدة.'
            : 'No account or sign-in required — fill in your details and select a time slot to route your online booking directly to Dr. Motasem’s email and WhatsApp lines.'}
        </p>
      </div>

      {/* Online Booking Progress Bar */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
          <div className="text-[#0B3C5D]">
            {remainingSteps === 0
              ? lang === 'ar'
                ? 'تم استكمال جميع الخطوات — جاهز لتأكيد الحجز أونلاين'
                : 'All steps completed — ready to confirm online booking'
              : lang === 'ar'
                ? `التقدم في الحجز: اكتملت ${completedCount} من ${bookingSteps.length} خطوات (متبقي ${remainingSteps} لإتمام الحجز)`
                : `Booking progress: ${completedCount} of ${bookingSteps.length} completed (${remainingSteps} remaining)`}
          </div>
          <div className="font-mono-num tabular-nums text-sm font-bold text-[#0B3C5D]">{progressPercent}%</div>
        </div>

        <div
          role="progressbar"
          aria-label={lang === 'ar' ? 'تقدم خطوات حجز الموعد أونلاين' : 'Online appointment booking progress'}
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200"
        >
          <div
            className={`h-full transition-all duration-300 ${
              remainingSteps === 0 ? 'bg-[#0F766E]' : 'bg-[#0B3C5D]'
            }`}
            style={{width: `${progressPercent}%`}}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {bookingSteps.map((step) => (
            <button
              key={step.id}
              type="button"
              onClick={() => scrollToStep(step.id)}
              className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-start transition-colors ${
                step.completed
                  ? 'border-[#0F766E]/35 bg-white text-slate-900 hover:border-[#0F766E]'
                  : 'border-slate-200 bg-white/70 text-slate-500 hover:border-[#0369A1] hover:text-slate-800'
              }`}
            >
              <div className="min-w-0">
                <div
                  className={`font-mono-num text-[11px] font-bold ${
                    step.completed ? 'text-[#0F766E]' : 'text-slate-400'
                  }`}
                >
                  {step.num}
                </div>
                <div className="truncate text-xs font-semibold">{step.label}</div>
              </div>
              <CheckCircle2
                className={`h-4 w-4 shrink-0 ${step.completed ? 'text-[#0F766E]' : 'text-slate-300'}`}
              />
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          {/* Step 1: Online Consultation Channel */}
          <section id="booking-step-1" className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-slate-900">
                <span className="font-mono-num text-[#0369A1] me-2">01.</span>
                {lang === 'ar' ? 'نوع الاستشارة (أونلاين عن بعد)' : 'Online Consultation Format'}
              </h2>
              <span className="text-xs font-semibold text-emerald-700">
                {lang === 'ar' ? 'حجز أونلاين حصراً' : 'Online Booking Exclusive'}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setOnlineChannel('video')}
                className={`cursor-pointer rounded-xl border p-4 text-start transition-colors ${
                  onlineChannel === 'video'
                    ? 'border-[#0B3C5D] bg-[#0B3C5D] text-white'
                    : 'border-slate-200 bg-slate-50/70 text-slate-900 hover:border-slate-300'
                }`}
              >
                <Video className={`h-5 w-5 ${onlineChannel === 'video' ? 'text-sky-200' : 'text-[#0B3C5D]'}`} />
                <div className="font-display mt-2.5 text-sm font-bold">
                  {lang === 'ar' ? 'استشارة مرئية أونلاين (فيديو)' : 'Online Video Consultation'}
                </div>
                <div className={`mt-1 text-xs ${onlineChannel === 'video' ? 'text-sky-100' : 'text-slate-600'}`}>
                  {lang === 'ar'
                    ? 'لقراءة الفحوصات، تقييم الأعراض، ومتابعة الأمراض المزمنة وجهاً لوجه عن بعد'
                    : 'Interactive video visit for symptoms, lab review, and chronic care follow-up'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOnlineChannel('audio')}
                className={`cursor-pointer rounded-xl border p-4 text-start transition-colors ${
                  onlineChannel === 'audio'
                    ? 'border-[#0B3C5D] bg-[#0B3C5D] text-white'
                    : 'border-slate-200 bg-slate-50/70 text-slate-900 hover:border-slate-300'
                }`}
              >
                <Phone className={`h-5 w-5 ${onlineChannel === 'audio' ? 'text-sky-200' : 'text-[#0B3C5D]'}`} />
                <div className="font-display mt-2.5 text-sm font-bold">
                  {lang === 'ar' ? 'استشارة صوتية / عبر واتساب' : 'Online Audio / WhatsApp Call'}
                </div>
                <div className={`mt-1 text-xs ${onlineChannel === 'audio' ? 'text-sky-100' : 'text-slate-600'}`}>
                  {lang === 'ar'
                    ? 'مكالمة طبية مباشرة أو متابعة تقارير المختبر والأشعة بمرونة كاملة'
                    : 'Direct clinical call or WhatsApp consultation with report sharing'}
                </div>
              </button>
            </div>
          </section>

          {/* Step 2: Select Medical Service */}
          <section id="booking-step-2" className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-slate-900">
              <span className="font-mono-num text-[#0369A1] me-2">02.</span>
              {lang === 'ar' ? 'اختر الخدمة الطبية' : 'Select Medical Service'}
            </h2>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-[#0369A1] focus:outline-none"
            >
              {MEDICAL_SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.number}. {s.title[lang]}
                </option>
              ))}
            </select>
            <p className="mt-2.5 text-xs text-slate-600">{selectedService.shortDesc[lang]}</p>
          </section>

          {/* Step 3: Date & Time Selection */}
          <section id="booking-step-3" className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-slate-900">
                <span className="font-mono-num text-[#0369A1] me-2">03.</span>
                {lang === 'ar' ? 'اختر التاريخ والوقت' : 'Choose Date & Time'}
              </h2>
              <span className="text-xs text-slate-500">
                {lang === 'ar' ? 'بتوقيت السعودية والأردن (GMT+3)' : 'KSA & Jordan Time (GMT+3)'}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {upcomingDates.map((d) => {
                const isSelected = date === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDate(d)}
                    className={`font-mono-num cursor-pointer rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'border-[#0B3C5D] bg-[#0B3C5D] text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <Clock className="h-3.5 w-3.5" />
                <span>{lang === 'ar' ? 'الأوقات المتاحة للاستشارة أونلاين' : 'Available Online Time Slots'}</span>
              </div>

              {loadingSlots ? (
                <div className="mt-3 text-sm text-slate-500">
                  {lang === 'ar' ? 'جاري التحقق من المواعيد...' : 'Checking slot availability...'}
                </div>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {slots.map((slot) => {
                    const isSelected = timeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setTimeSlot(slot.time)}
                        className={`font-mono-num rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                          !slot.available
                            ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 line-through'
                            : isSelected
                              ? 'cursor-pointer border-[#0B3C5D] bg-[#0B3C5D] text-white'
                              : 'cursor-pointer border-slate-300 bg-white text-slate-800 hover:border-[#0369A1]'
                        }`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Step 4: Patient Information */}
          <section id="booking-step-4" className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-slate-900">
              <span className="font-mono-num text-[#0369A1] me-2">04.</span>
              {lang === 'ar' ? 'بيانات المريض' : 'Patient Information'}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: أحمد محمد العلي' : 'e.g., Ahmad Al-Ali'}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#0369A1] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  {lang === 'ar' ? 'رقم الجوال / الواتساب *' : 'Phone / WhatsApp *'}
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 5X XXX XXXX"
                  className="font-mono-num mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#0369A1] focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700">
                  {lang === 'ar' ? 'البريد الإلكتروني (اختياري)' : 'Email Address (Optional)'}
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#0369A1] focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700">
                  {lang === 'ar' ? 'سبب الزيارة أو ملاحظات طبية مختصرة (اختياري)' : 'Reason for Visit / Brief Notes (Optional)'}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    lang === 'ar'
                      ? 'اذكر الأعراض الحالية أو الفحوصات المراد مراجعتها...'
                      : 'Briefly describe your symptoms or lab tests to review...'
                  }
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#0369A1] focus:outline-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Booking Summary Sticky Sidebar with Doctor Portrait & Business Card */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center gap-3.5 border-b border-slate-200 pb-4">
              <img
                src={DOCTOR_PORTRAIT_PATH}
                alt={lang === 'ar' ? 'د. معتصم النسور' : 'Dr. Motasem Alnsour'}
                referrerPolicy="no-referrer"
                className="h-16 w-16 shrink-0 rounded-xl border border-slate-200 object-cover object-top"
              />
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  {lang === 'ar' ? 'د. معتصم النسور' : 'Dr. Motasem Alnsour'}
                </h3>
                <p className="text-xs text-slate-600">
                  {lang === 'ar' ? 'أخصائي أول طب الأسرة' : 'Senior Specialist in Family Medicine'}
                </p>
                <a
                  href={DOCTOR_BUSINESS_CARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#0369A1] hover:underline"
                >
                  <IdCard className="h-3.5 w-3.5" />
                  <span>{lang === 'ar' ? 'بطاقة الطبيب الرقمية' : 'Digital Business Card'}</span>
                </a>
              </div>
            </div>

            <dl className="mt-4 space-y-3 border-b border-slate-200 pb-4 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">{lang === 'ar' ? 'نوع الحجز' : 'Booking Type'}</dt>
                <dd className="font-semibold text-emerald-700">
                  {lang === 'ar' ? 'استشارة أونلاين فقط' : 'Online Consultation Only'}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">{lang === 'ar' ? 'الخدمة' : 'Service'}</dt>
                <dd className="text-end font-semibold text-slate-900">{selectedService.title[lang]}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">{lang === 'ar' ? 'التاريخ' : 'Date'}</dt>
                <dd className="font-mono-num font-semibold text-slate-900">{date}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">{lang === 'ar' ? 'الوقت' : 'Time'}</dt>
                <dd className="font-mono-num font-semibold text-slate-900">{timeSlot || '—'}</dd>
              </div>
            </dl>

            {errorMsg && (
              <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-medium text-rose-800">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0B3C5D] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#082c44] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>
                {submitting
                  ? lang === 'ar'
                    ? 'جاري إرسال الحجز...'
                    : 'Sending Booking...'
                  : lang === 'ar'
                    ? 'تأكيد الحجز أونلاين بدون تسجيل دخول'
                    : 'Confirm Online Booking (No Login)'}
              </span>
            </button>
            <p className="mt-2.5 text-center text-[11px] leading-relaxed text-slate-500">
              {lang === 'ar'
                ? 'تُرسل البيانات مباشرة إلى بريد الدكتور (dr.motasem.alnsour@gmail.com) وواتساب السعودية (966570117358) والأردن (962785483349).'
                : 'Details are routed directly to dr.motasem.alnsour@gmail.com and WhatsApp lines (966570117358 / 962785483349).'}
            </p>
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200/90 bg-amber-50/70 px-3 py-2 text-[11px] leading-relaxed text-amber-950">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700" />
              <span>{WHATSAPP_ONLY_CONTACT_NOTE[lang]}</span>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
