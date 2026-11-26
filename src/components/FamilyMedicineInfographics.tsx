import {Activity, ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, HeartHandshake, ShieldCheck, Stethoscope, Users} from 'lucide-react';
import {useState} from 'react';
import {COMMON_MEDICAL_FAQS} from '../data/faqData';
import {UI_COPY} from '../data/translations';
import type {Lang, PageId} from '../types/medical';

interface LifecycleStage {
  id: string;
  age: {ar: string; en: string};
  title: {ar: string; en: string};
  focus: {ar: string; en: string};
  screenings: {ar: string[]; en: string[]};
}

const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: 'pediatric',
    age: {ar: '0 – 17 عاماً', en: 'Ages 0 – 17'},
    title: {ar: 'صحة الطفل والمراهق', en: 'Child & Adolescent Health'},
    focus: {
      ar: 'مراقبة النمو البدني والتطور، استكمال التطعيمات، ترشيد المضادات الحيوية، والتغذية السليمة.',
      en: 'Growth percentile tracking, national immunizations, antibiotic stewardship, and healthy nutrition.',
    },
    screenings: {
      ar: ['منحنيات الطول والوزن', 'جدول التطعيمات الأساسية', 'متابعة الربو والحساسية والفقر الغذائي'],
      en: ['Growth & BMI curves', 'Routine vaccination schedule', 'Asthma, allergy & anemia screening'],
    },
  },
  {
    id: 'adult',
    age: {ar: '18 – 39 عاماً', en: 'Ages 18 – 39'},
    title: {ar: 'صحة الشباب والموظفين', en: 'Young Adult & Employee Health'},
    focus: {
      ar: 'الوقاية المبكرة من السمنة ومقاومة الإنسولين، فحوصات اللياقة المهنية، وإدارة ضغوط العمل والنوم.',
      en: 'Early metabolic risk screening, occupational fitness checkups, stress resilience, and sleep hygiene.',
    },
    screenings: {
      ar: ['ضغط الدم والسكر الصائم', 'فيتامين د، الحديد، والغدة الدرقية', 'الوقاية من التدخين والإجهاد المهني'],
      en: ['Baseline BP & fasting glucose', 'Vitamin D, ferritin & thyroid panel', 'Smoking cessation & workplace ergonomics'],
    },
  },
  {
    id: 'midlife',
    age: {ar: '40 – 59 عاماً', en: 'Ages 40 – 59'},
    title: {ar: 'الوقاية المتقدمة وضبط المزمنات', en: 'Midlife Screening & Chronic Control'},
    focus: {
      ar: 'الكشف المبكر عن السكري والضغط والكوليسترول وأورام القولون والثدي وعنق الرحم قبل ظهور أي أعراض.',
      en: 'Proactive detection of diabetes, hypertension, dyslipidemia, and guideline cancer screenings.',
    },
    screenings: {
      ar: ['تقييم الخطورة القلبية خلال 10 سنوات', 'فحص القولون والثدي وعنق الرحم حسب العمر', 'ضبط السكر التراكمي والدهون'],
      en: ['10-year cardiovascular risk score', 'Age-indicated colon, breast & cervical screening', 'HbA1c & lipid optimization'],
    },
  },
  {
    id: 'senior',
    age: {ar: '60+ عاماً', en: 'Ages 60+'},
    title: {ar: 'رعاية كبار السن وجودة الحياة', en: 'Senior Care & Longevity'},
    focus: {
      ar: 'حماية الاستقلالية الحركية، مراجعة تعدد الأدوية لمنع التداخلات، هشاشة العظام، والذاكرة والتطعيمات.',
      en: 'Preserving mobility and independence, polypharmacy review, osteoporosis protection, and senior vaccines.',
    },
    screenings: {
      ar: ['مراجعة سلامة الأدوية المتعددة', 'فحص كثافة العظام والوقاية من السقوط', 'تطعيمات الإنفلونزا والمكورات الرئوية'],
      en: ['Comprehensive medication audit', 'Bone density & fall-risk prevention', 'Influenza, pneumococcal & shingles vaccines'],
    },
  },
];

export function FamilyMedicineLifecycleGraphic({lang}: {lang: Lang}) {
  const [selectedStageId, setSelectedStageId] = useState<string>('midlife');
  const activeStage = LIFECYCLE_STAGES.find((s) => s.id === selectedStageId) ?? LIFECYCLE_STAGES[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#0369A1]">
            {lang === 'ar' ? 'إنفوجرافيك تفاعلي · استمرارية الرعاية الأسرية' : 'Interactive Infographic · Continuum of Care'}
          </div>
          <h3 className="font-display mt-1 text-xl font-bold text-slate-900">
            {lang === 'ar' ? 'طبيب واحد يرافق جميع مراحل العمر' : 'One Family Physician Across Every Life Stage'}
          </h3>
        </div>
        <div className="text-xs text-slate-500">
          {lang === 'ar' ? 'اختر المرحلة العمرية لاستعراض خطة الرعاية' : 'Select a life stage to inspect care focus'}
        </div>
      </div>

      {/* Interactive Timeline Nodes */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {LIFECYCLE_STAGES.map((stage, index) => {
          const isSelected = stage.id === selectedStageId;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setSelectedStageId(stage.id)}
              className={`cursor-pointer rounded-xl border p-4 text-start transition-colors ${
                isSelected
                  ? 'border-[#0B3C5D] bg-[#0B3C5D] text-white'
                  : 'border-slate-200 bg-slate-50/70 text-slate-800 hover:border-slate-300 hover:bg-slate-100/70'
              }`}
            >
              <div className={`font-mono-num text-xs ${isSelected ? 'text-sky-200' : 'text-slate-500'}`}>
                0{index + 1} · {stage.age[lang]}
              </div>
              <div className="font-display mt-1.5 text-sm font-bold">{stage.title[lang]}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Clinical Detail + Clean SVG Continuum */}
      <div className="mt-6 grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-slate-50 p-5 lg:grid-cols-12 lg:p-6">
        <div className="lg:col-span-7">
          <div className="text-xs font-semibold text-emerald-700">{activeStage.age[lang]}</div>
          <h4 className="font-display mt-1 text-lg font-bold text-slate-900">{activeStage.title[lang]}</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{activeStage.focus[lang]}</p>
          <ul className="mt-4 space-y-2">
            {activeStage.screenings[lang].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-800">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Clean SVG Preventive Pyramid Graphic */}
        <div className="flex flex-col justify-center rounded-xl border border-slate-200 bg-white p-4 lg:col-span-5">
          <svg viewBox="0 0 360 190" className="w-full h-auto" role="img" aria-label="Three-tier preventive care model">
            <rect x="10" y="12" width="340" height="46" rx="8" fill="#E0F2FE" stroke="#7DD3FC" />
            <text x="180" y="33" textAnchor="middle" fill="#0B3C5D" fontSize="12" fontWeight="700">
              {lang === 'ar' ? '1. الوقاية الأولية والتطعيمات' : '1. Primary Prevention & Immunizations'}
            </text>
            <text x="180" y="49" textAnchor="middle" fill="#0369A1" fontSize="10">
              {lang === 'ar' ? 'منع حدوث المرض قبل بدايته' : 'Preventing illness before onset'}
            </text>

            <rect x="30" y="72" width="300" height="46" rx="8" fill="#ECFDF5" stroke="#6EE7B7" />
            <text x="180" y="93" textAnchor="middle" fill="#065F46" fontSize="12" fontWeight="700">
              {lang === 'ar' ? '2. الفحوصات المسحية والكشف المبكر' : '2. Early Screening & Detection'}
            </text>
            <text x="180" y="109" textAnchor="middle" fill="#047857" fontSize="10">
              {lang === 'ar' ? 'رصْد عوامل الخطر الصامتة مبكراً' : 'Catching silent risks early'}
            </text>

            <rect x="50" y="132" width="260" height="46" rx="8" fill="#0B3C5D" />
            <text x="180" y="153" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
              {lang === 'ar' ? '3. ضبط المزمنات ومنع المضاعفات' : '3. Chronic Control & Coordination'}
            </text>
            <text x="180" y="169" textAnchor="middle" fill="#BAE6FD" fontSize="10">
              {lang === 'ar' ? 'حماية القلب والكلى وتنسيق التخصصات' : 'Organ protection & specialist triage'}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

interface FamilyMedicinePageProps {
  lang: Lang;
  onNavigate: (page: PageId) => void;
}

export function FamilyMedicinePage({lang, onNavigate}: FamilyMedicinePageProps) {
  const t = UI_COPY[lang].familyMedicinePage;
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;
  const [openFaqId, setOpenFaqId] = useState<string | null>(COMMON_MEDICAL_FAQS[0].id);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <div className="max-w-3xl">
        <div className="text-xs font-semibold text-[#0369A1]">{t.kicker}</div>
        <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{textWrap: 'balance'}}>
          {t.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{t.intro}</p>
      </div>

      {/* 3 Editorial Pillars */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {t.sections.map((sec, idx) => {
          const icons = [HeartHandshake, Stethoscope, ShieldCheck];
          const Icon = icons[idx] ?? Activity;
          return (
            <article key={sec.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="font-mono-num text-xs font-semibold text-[#0369A1]">0{idx + 1}</span>
                <Icon className="h-5 w-5 text-[#0B3C5D]" />
              </div>
              <h2 className="font-display mt-4 text-lg font-bold text-slate-900">{sec.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{sec.content}</p>
            </article>
          );
        })}
      </div>

      {/* Interactive Lifespan Continuum Infographic */}
      <div className="mt-12">
        <FamilyMedicineLifecycleGraphic lang={lang} />
      </div>

      {/* SVG Hub-and-Spoke Coordination Infographic */}
      <div className="mt-12 grid grid-cols-1 items-center gap-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="text-xs font-semibold text-emerald-700">
            {lang === 'ar' ? 'نموذج التنسيق الطبي المركزي' : 'Central Care Coordination Model'}
          </div>
          <h2 className="font-display mt-1.5 text-2xl font-bold text-slate-900">
            {lang === 'ar'
              ? 'كيف يحمي طبيب الأسرة عائلتك من تشتت الرعاية وتعارض الأدوية؟'
              : 'How Your Family Physician Prevents Fragmented Care & Drug Conflicts'}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {lang === 'ar'
              ? 'يعالج طبيب الأسرة أكثر من 85% من المشكلات الصحية مباشرة، وعند الحاجة إلى استشارة قلب أو غدد أو عظام، يقوم بإعداد الفحوصات التمهيدية وتنسيق الأدوية في ملف موحد.'
              : 'Your family physician resolves over 85% of clinical visits directly. Whenever cardiology, endocrinology, or surgical input is needed, baseline tests and prescriptions remain unified in one coordinated record.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#0B3C5D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082c44]"
            >
              <span>{lang === 'ar' ? 'استعرض الخدمات الطبية' : 'Explore Medical Services'}</span>
              <ArrowIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('booking')}
              className="cursor-pointer rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              {lang === 'ar' ? 'احجز استشارة أسرة' : 'Book Family Consultation'}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-6">
          <svg viewBox="0 0 420 240" className="w-full h-auto" role="img" aria-label="Family physician central coordination diagram">
            <line x1="210" y1="120" x2="80" y2="50" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="210" y1="120" x2="340" y2="50" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="210" y1="120" x2="80" y2="190" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="210" y1="120" x2="340" y2="190" stroke="#CBD5E1" strokeWidth="2" />

            <rect x="20" y="25" width="120" height="46" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
            <text x="80" y="52" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="600">
              {lang === 'ar' ? 'المختبر والأشعة' : 'Labs & Imaging'}
            </text>

            <rect x="280" y="25" width="120" height="46" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
            <text x="340" y="52" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="600">
              {lang === 'ar' ? 'التخصصات الدقيقة' : 'Subspecialists'}
            </text>

            <rect x="20" y="168" width="120" height="46" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
            <text x="80" y="195" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="600">
              {lang === 'ar' ? 'الوقاية والتطعيم' : 'Prevention Plan'}
            </text>

            <rect x="280" y="168" width="120" height="46" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
            <text x="340" y="195" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="600">
              {lang === 'ar' ? 'ضبط الأدوية' : 'Medication Safety'}
            </text>

            <rect x="135" y="88" width="150" height="64" rx="12" fill="#0B3C5D" />
            <text x="210" y="116" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
              {lang === 'ar' ? 'طبيب الأسرة' : 'Family Physician'}
            </text>
            <text x="210" y="135" textAnchor="middle" fill="#BAE6FD" fontSize="10">
              {lang === 'ar' ? 'د. معتصم النسور' : 'Dr. Motasem Alnsour'}
            </text>
          </svg>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-slate-900">{t.comparisonTitle}</h2>
          <Users className="h-5 w-5 text-[#0B3C5D]" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-start text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-white text-slate-500">
                <th className="px-6 py-3.5 text-start font-semibold">{lang === 'ar' ? 'وجه المقارنة' : 'Dimension'}</th>
                <th className="px-6 py-3.5 text-start font-semibold text-[#0B3C5D]">
                  {lang === 'ar' ? 'طبيب الأسرة (أخصائي أول)' : 'Family Physician (Senior Specialist)'}
                </th>
                <th className="px-6 py-3.5 text-start font-semibold text-slate-700">
                  {lang === 'ar' ? 'التخصص العضوي الفرعي' : 'Single-Organ Subspecialty'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {t.comparisonRows.map((row) => (
                <tr key={row.aspect} className="hover:bg-slate-50/70">
                  <td className="px-6 py-4 font-semibold text-slate-900">{row.aspect}</td>
                  <td className="px-6 py-4 text-slate-700">{row.family}</td>
                  <td className="px-6 py-4 text-slate-600">{row.specialist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Medical Questions (Synced with Schema.org FAQPage) */}
      <div className="mt-12">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-[#0369A1]">
            {lang === 'ar' ? 'الأسئلة الطبية الشائعة' : 'Common Medical Questions'}
          </div>
          <h2 className="font-display mt-1.5 text-2xl font-bold text-slate-900">
            {lang === 'ar' ? 'إجابات موثوقة حول طب الأسرة والحجز أونلاين' : 'Frequently Asked Questions About Family Medicine & Online Visits'}
          </h2>
        </div>

        <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {COMMON_MEDICAL_FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div key={faq.id}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-start text-sm font-bold text-slate-900 hover:bg-slate-50 sm:text-base"
                >
                  <span>{faq.question[lang]}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{faq.answer[lang]}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
