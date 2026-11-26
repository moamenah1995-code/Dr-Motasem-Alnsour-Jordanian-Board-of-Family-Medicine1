import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CalendarCheck,
  ClipboardCheck,
  ExternalLink,
  HeartPulse,
  IdCard,
  Info,
  Instagram,
  MessageCircle,
  Star,
  Stethoscope,
  Video,
  Youtube,
} from 'lucide-react';
import {
  CLINIC_KSA_WHATSAPP_URL,
  CLINIC_WHATSAPP_URL,
  DOCTOR_BUSINESS_CARD_URL,
  DOCTOR_INSTAGRAM_URL,
  DOCTOR_PORTRAIT_PATH,
  DOCTOR_TIKTOK_URL,
  DOCTOR_YOUTUBE_URL,
  WHATSAPP_ONLY_CONTACT_NOTE,
} from '../data/doctorChatKnowledge';
import {UI_COPY} from '../data/translations';
import type {ConsultationMode, Lang, PageId} from '../types/medical';
import {HeroSection} from './HeroSection';
import {TikTokIcon} from './SocialIcons';

interface HomePageProps {
  lang: Lang;
  onToggleLang: () => void;
  onNavigate: (page: PageId) => void;
  onStartBooking: (mode?: ConsultationMode, serviceId?: string) => void;
  onOpenAiAssistant: () => void;
}

interface DirectorySectionItem {
  page: PageId;
  num: string;
  meta: {ar: string; en: string};
  title: {ar: string; en: string};
  summary: {ar: string; en: string};
  cta: {ar: string; en: string};
  icon: typeof Award;
}

const PLATFORM_SECTIONS: DirectorySectionItem[] = [
  {
    page: 'about',
    num: '01',
    meta: {ar: 'السيرة والاعتمادات', en: 'Credentials & Bio'},
    title: {ar: 'عن الدكتور معتصم النسور', en: 'About Dr. Motasem Alnsour'},
    summary: {
      ar: 'السيرة الذاتية، البورد الأردني، تصنيف الهيئة السعودية (SCFHS)، والخبرة في مستشفى د. سليمان الحبيب ووزارة الصحة الأردنية.',
      en: 'Biography, Jordanian Board, SCFHS certification, and clinical experience at Dr. Sulaiman Al Habib Hospital & Jordan MoH.',
    },
    cta: {ar: 'عرض السيرة والمؤهلات', en: 'View Profile & Credentials'},
    icon: Award,
  },
  {
    page: 'services',
    num: '02',
    meta: {ar: '15 خدمة طبية', en: '15 Clinical Services'},
    title: {ar: 'الخدمات الطبية والرعاية الأسرية', en: 'Medical Services Directory'},
    summary: {
      ar: 'الاستشارات العامة، متابعة السكري والضغط، عيادة الموظفين، العيادات العاجلة، تفسير التحاليل، صحة المرأة والطفل وكبار السن.',
      en: 'General consultations, chronic care, Employee & Urgent Clinics, lab interpretation, women’s, pediatric & senior care.',
    },
    cta: {ar: 'تصفح جميع الخدمات (15)', en: 'Explore All 15 Services'},
    icon: Stethoscope,
  },
  {
    page: 'family-medicine',
    num: '03',
    meta: {ar: 'دليل المريض والعائلة', en: 'Patient Guide'},
    title: {ar: 'ما هو طب الأسرة؟', en: 'What Is Family Medicine?'},
    summary: {
      ar: 'شرح مبسط لدور طبيب الأسرة كمرجع أول للعائلة، الفرق عن التخصصات الفرعية، وإنفوجرافيك تفاعلي والأسئلة الشائعة.',
      en: 'How family physicians coordinate care, prevent complications, compare with subspecialties, plus interactive infographics & FAQs.',
    },
    cta: {ar: 'اكتشف دليل طب الأسرة', en: 'Open Family Medicine Guide'},
    icon: HeartPulse,
  },
  {
    page: 'knowledge',
    num: '04',
    meta: {ar: '13 تخصصاً صحياً', en: '13 Health Topics'},
    title: {ar: 'مركز المعرفة الطبية والمدونة', en: 'Medical Knowledge Center'},
    summary: {
      ar: 'مقالات علمية موثوقة مع بحث وتصنيف ذكي تغطي السكري، الضغط، القلب، التغذية، صحة الأطفال والمرأة، والتطعيمات.',
      en: 'Evidence-based clinical library with search and categories across diabetes, heart health, nutrition, pediatrics & prevention.',
    },
    cta: {ar: 'دخول مركز المعرفة', en: 'Browse Knowledge Center'},
    icon: BookOpen,
  },
  {
    page: 'assessments',
    num: '05',
    meta: {ar: '6 مقاييس تفاعلية', en: '6 Interactive Tests'},
    title: {ar: 'الاختبارات الصحية التفاعلية', en: 'Health Risk Assessments'},
    summary: {
      ar: 'قيّم خطر السكري، ضغط الدم، نمط الحياة، جودة النوم، اللياقة، ومؤشر كتلة الجسم واحصل على تقرير وتوصيات فورية.',
      en: 'Assess diabetes risk, blood pressure, lifestyle, sleep quality, fitness, and BMI with instant structured guidance.',
    },
    cta: {ar: 'ابدأ الاختبارات الصحية', en: 'Start Health Assessments'},
    icon: ClipboardCheck,
  },
  {
    page: 'reviews',
    num: '06',
    meta: {ar: 'تجارب موثقة', en: 'Verified Feedback'},
    title: {ar: 'آراء وتجارب المرضى', en: 'Patient Reviews & Stories'},
    summary: {
      ar: 'اطلع على تقييمات المراجعين في السعودية والأردن ومعايير جودة الاستشارة الطبية أونلاين أو شارك تجربتك العلاجية.',
      en: 'Read verified patient reviews across Saudi Arabia & Jordan, care quality standards, or submit your own feedback.',
    },
    cta: {ar: 'استعرض آراء المرضى', en: 'View Patient Reviews'},
    icon: Star,
  },
];

export function HomePage({
  lang,
  onToggleLang,
  onNavigate,
  onStartBooking,
  onOpenAiAssistant,
}: HomePageProps) {
  const t = UI_COPY[lang];
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div>
      {/* 1. Concise Hero Overview & Primary Actions */}
      <HeroSection
        lang={lang}
        onToggleLang={onToggleLang}
        onNavigate={onNavigate}
        onStartBooking={(m) => onStartBooking(m)}
      />

      {/* 2. Organized Multi-Page Platform Directory */}
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold text-[#0369A1]">
                {lang === 'ar' ? 'خريطة أقسام الموقع الطبي' : 'Platform Directory'}
              </div>
              <h2 className="font-display mt-1.5 text-2xl font-bold text-slate-900 sm:text-3xl">
                {lang === 'ar'
                  ? 'أقسام المنصة الطبية — اختر القسم للانتقال'
                  : 'Explore Platform Sections & Clinical Tools'}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                {lang === 'ar'
                  ? 'نظمنا كل قسم في صفحة مستقلة لتصفح سريع وواضح دون إطالة؛ انتقل مباشرة إلى القسم الذي تحتاجه.'
                  : 'Every clinical module lives on its own dedicated page for clean, focused navigation—select a section below to open it.'}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PLATFORM_SECTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => onNavigate(item.page)}
                  className="group flex cursor-pointer flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-6 text-start transition-colors hover:border-[#0B3C5D] hover:bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-mono-num tabular-nums font-bold text-[#0369A1]">
                        {item.num} · {item.meta[lang]}
                      </span>
                      <Icon className="h-4 w-4 text-[#0B3C5D]" />
                    </div>
                    <h3 className="font-display mt-3 text-lg font-bold text-slate-900 group-hover:text-[#0B3C5D]">
                      {item.title[lang]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.summary[lang]}</p>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-1.5 border-t border-slate-200/80 pt-3.5 text-sm font-semibold text-[#0B3C5D]">
                    <span>{item.cta[lang]}</span>
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dedicated Conversion Bar: Online Booking & Smart Medical Assistant */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#0B3C5D]/20 bg-[#0B3C5D] p-6 text-white sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-200">
                  <CalendarCheck className="h-4 w-4" />
                  <span>{lang === 'ar' ? 'حجز مباشر بدون تسجيل دخول' : 'Direct Booking · No Login Required'}</span>
                </div>
                <h3 className="font-display mt-1.5 text-lg font-bold">
                  {lang === 'ar' ? 'احجز استشارتك الطبية أونلاين' : 'Book Your Online Consultation'}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-sky-100">
                  {lang === 'ar'
                    ? 'اختر الموعد المناسب وأرسل بياناتك مباشرة إلى الطبيب عبر الإيميل والواتساب.'
                    : 'Choose your preferred slot and route booking details directly to Dr. Motasem.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onStartBooking('online')}
                className="cursor-pointer whitespace-nowrap shrink-0 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#0B3C5D] hover:bg-sky-50"
              >
                {lang === 'ar' ? 'صفحة الحجز' : 'Go to Booking'}
              </button>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0F766E]">
                  <Stethoscope className="h-4 w-4" />
                  <span>{lang === 'ar' ? 'إرشاد طبي ذكي وتوجيه فوري' : 'Smart Clinical Navigation'}</span>
                </div>
                <h3 className="font-display mt-1.5 text-lg font-bold text-slate-900">
                  {lang === 'ar' ? 'المساعد الطبي الذكي' : 'AI Medical Assistant'}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {lang === 'ar'
                    ? 'اطرح استفسارك حول قراءة الفحوصات، الحجوزات أونلاين، أو احصل على توجيه للقسم المناسب.'
                    : 'Ask about lab result reading, online consultations, or get guided to the right clinical section.'}
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenAiAssistant}
                className="cursor-pointer whitespace-nowrap shrink-0 rounded-lg border border-[#0B3C5D] bg-white px-5 py-2.5 text-sm font-bold text-[#0B3C5D] hover:bg-slate-100"
              >
                {lang === 'ar' ? 'افتح المساعد' : 'Open Assistant'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Concise Online Consultations & Official Direct Channels */}
      <section className="bg-slate-50/70 py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3">
                <img
                  src={DOCTOR_PORTRAIT_PATH}
                  alt={lang === 'ar' ? 'د. معتصم النسور' : 'Dr. Motasem Alnsour'}
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 shrink-0 rounded-xl border border-slate-200 object-cover object-top"
                />
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F766E]">
                    <Video className="h-4 w-4" />
                    <span>{t.appointmentModes.online.meta}</span>
                  </div>
                  <h2 className="font-display mt-0.5 text-xl font-bold text-slate-900">
                    {t.appointmentModes.channelsTitle}
                  </h2>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.appointmentModes.subheading}</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:col-span-6">
              <a
                href={CLINIC_KSA_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-100/70"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-emerald-700" />
                  <span>{lang === 'ar' ? 'واتساب السعودية' : 'Saudi WhatsApp'}</span>
                </span>
                <span dir="ltr" className="font-mono-num tabular-nums text-xs text-emerald-800">
                  +966570117358
                </span>
              </a>

              <a
                href={CLINIC_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-emerald-50/50"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-emerald-700" />
                  <span>{lang === 'ar' ? 'واتساب الأردن' : 'Jordan WhatsApp'}</span>
                </span>
                <span dir="ltr" className="font-mono-num tabular-nums text-xs text-slate-600">
                  +962785483349
                </span>
              </a>

              <a
                href={DOCTOR_YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50/50 px-4 py-3 text-sm font-semibold text-rose-900 transition-colors hover:bg-rose-100/60"
              >
                <span className="inline-flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-rose-600" />
                  <span>{lang === 'ar' ? 'قناة اليوتيوب الطبية' : 'YouTube Channel'}</span>
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-rose-600" />
              </a>

              <a
                href={DOCTOR_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-pink-200 bg-pink-50/50 px-4 py-3 text-sm font-semibold text-pink-900 transition-colors hover:bg-pink-100/60"
              >
                <span className="inline-flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-700" />
                  <span>{lang === 'ar' ? 'حساب إنستغرام الطبي' : 'Instagram Account'}</span>
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-pink-700" />
              </a>

              <a
                href={DOCTOR_TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                <span className="inline-flex items-center gap-2">
                  <TikTokIcon className="h-4 w-4 text-slate-800" />
                  <span>{lang === 'ar' ? 'حساب تيك توك الطبي' : 'TikTok Account'}</span>
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-600" />
              </a>

              <a
                href={DOCTOR_BUSINESS_CARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-sky-200 bg-sky-50/60 px-4 py-3 text-sm font-semibold text-[#0B3C5D] transition-colors hover:bg-sky-100/70"
              >
                <span className="inline-flex items-center gap-2">
                  <IdCard className="h-4 w-4 text-[#0369A1]" />
                  <span>{lang === 'ar' ? 'البطاقة الرقمية (HiHello)' : 'Business Card'}</span>
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-[#0369A1]" />
              </a>

              <div className="sm:col-span-2 flex items-start gap-2 rounded-xl border border-amber-200/90 bg-amber-50/70 px-4 py-2.5 text-xs leading-relaxed text-amber-950">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                <span>{WHATSAPP_ONLY_CONTACT_NOTE[lang]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
