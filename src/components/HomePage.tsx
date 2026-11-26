import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CalendarCheck,
  ClipboardCheck,
  HeartPulse,
  Star,
  Stethoscope,
} from 'lucide-react';
import type {ConsultationMode, Lang, PageId} from '../types/medical';
import {HeroSection} from './HeroSection';

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
    meta: {ar: 'السيرة والاعتمادات', en: 'Credentials'},
    title: {ar: 'عن الدكتور معتصم النسور', en: 'About Dr. Motasem Alnsour'},
    summary: {
      ar: 'السيرة الذاتية، البورد الأردني، وتصنيف الهيئة السعودية (SCFHS).',
      en: 'Biography, Jordanian Board, and SCFHS certification.',
    },
    cta: {ar: 'افتح القسم', en: 'Open Section'},
    icon: Award,
  },
  {
    page: 'services',
    num: '02',
    meta: {ar: '15 خدمة طبية', en: '15 Services'},
    title: {ar: 'الخدمات الطبية', en: 'Medical Services'},
    summary: {
      ar: 'الاستشارات العامة، الأمراض المزمنة، التحاليل، ورعاية العائلة.',
      en: 'General consultations, chronic care, lab review, and family care.',
    },
    cta: {ar: 'استعرض الخدمات', en: 'View Services'},
    icon: Stethoscope,
  },
  {
    page: 'family-medicine',
    num: '03',
    meta: {ar: 'دليل المريض', en: 'Patient Guide'},
    title: {ar: 'ما هو طب الأسرة؟', en: 'What Is Family Medicine?'},
    summary: {
      ar: 'توضيح دور طبيب الأسرة والفرق عن التخصصات مع إنفوجرافيك مبسط.',
      en: 'Role of family physicians vs. subspecialties with visual guides.',
    },
    cta: {ar: 'اكتشف الدليل', en: 'Open Guide'},
    icon: HeartPulse,
  },
  {
    page: 'knowledge',
    num: '04',
    meta: {ar: 'مقالات واستطلاع', en: 'Articles & Poll'},
    title: {ar: 'مركز المعرفة والمدونة', en: 'Knowledge Center'},
    summary: {
      ar: 'مقالات طبية موثقة عبر 13 تخصصاً وتصويت لاختيار المقال القادم.',
      en: 'Evidence-based articles across 13 topics plus a reader topic poll.',
    },
    cta: {ar: 'اقرأ المقالات', en: 'Browse Articles'},
    icon: BookOpen,
  },
  {
    page: 'assessments',
    num: '05',
    meta: {ar: '6 مقاييس تفاعلية', en: '6 Quick Tests'},
    title: {ar: 'الاختبارات الصحية', en: 'Health Assessments'},
    summary: {
      ar: 'تقييم سريع للسكري، الضغط، النوم، نمط الحياة، ومؤشر الكتلة.',
      en: 'Quick checks for diabetes risk, blood pressure, sleep, and BMI.',
    },
    cta: {ar: 'ابدأ التقييم', en: 'Start Tests'},
    icon: ClipboardCheck,
  },
  {
    page: 'reviews',
    num: '06',
    meta: {ar: 'تجارب موثقة', en: 'Patient Reviews'},
    title: {ar: 'آراء وتجارب المرضى', en: 'Patient Reviews'},
    summary: {
      ar: 'تقييمات المراجعين في السعودية والأردن ونموذج مشاركة التجربة.',
      en: 'Verified patient feedback from KSA & Jordan plus review submission.',
    },
    cta: {ar: 'عرض الآراء', en: 'View Reviews'},
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
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div>
      {/* 1. Concise Illustrative Hero Overview */}
      <HeroSection
        lang={lang}
        onToggleLang={onToggleLang}
        onNavigate={onNavigate}
        onStartBooking={(m) => onStartBooking(m)}
      />

      {/* 2. Concise Illustrative Directory of Platform Sections */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-[#0369A1]">
              {lang === 'ar' ? 'دليل أقسام المنصة' : 'Platform Overview'}
            </div>
            <h2 className="font-display mt-1 text-2xl font-bold text-slate-900">
              {lang === 'ar'
                ? 'تصفح الأقسام — كل التفاصيل داخل كل قسم'
                : 'Explore Sections — Full Details Inside Each Page'}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              {lang === 'ar'
                ? 'صفحة رئيسية موجزة توضح أقسام الموقع؛ اختر القسم المطلوب للاطلاع على كامل التفاصيل.'
                : 'A concise overview of the platform; select any section below to view its full details.'}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {PLATFORM_SECTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => onNavigate(item.page)}
                  className="group flex cursor-pointer flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/40 p-5 text-start transition-colors hover:border-[#0B3C5D] hover:bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-mono-num tabular-nums font-semibold text-[#0369A1]">
                        {item.num} · {item.meta[lang]}
                      </span>
                      <Icon className="h-4 w-4 text-[#0B3C5D]" />
                    </div>
                    <h3 className="font-display mt-2.5 text-base font-bold text-slate-900 group-hover:text-[#0B3C5D]">
                      {item.title[lang]}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.summary[lang]}</p>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B3C5D]">
                    <span>{item.cta[lang]}</span>
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Compact Action Strip */}
          <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-5 sm:flex-row sm:items-center">
            <div>
              <div className="font-display text-base font-bold text-slate-900">
                {lang === 'ar'
                  ? 'هل تفضل الحجز المباشر أو التوجيه الذكي؟'
                  : 'Ready to book directly or need quick guidance?'}
              </div>
              <p className="mt-0.5 text-xs text-slate-600">
                {lang === 'ar'
                  ? 'احجز استشارتك أونلاين بدون تسجيل دخول أو اسأل المساعد الطبي للوصول للقسم المناسب.'
                  : 'Book an online consultation with no login required, or ask the AI assistant.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => onStartBooking('online')}
                className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-[#0B3C5D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#082c44]"
              >
                <CalendarCheck className="h-4 w-4" />
                <span>{lang === 'ar' ? 'احجز استشارة أونلاين' : 'Book Online'}</span>
              </button>
              <button
                type="button"
                onClick={onOpenAiAssistant}
                className="cursor-pointer whitespace-nowrap shrink-0 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100"
              >
                {lang === 'ar' ? 'المساعد الطبي الذكي' : 'AI Medical Assistant'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
