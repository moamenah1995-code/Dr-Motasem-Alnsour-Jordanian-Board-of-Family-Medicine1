import {ArrowLeft, ArrowRight, Calendar, CheckCircle2, ChevronDown, Clock, Search, X} from 'lucide-react';
import {useMemo, useState} from 'react';
import {MEDICAL_SERVICES} from '../data/servicesData';
import type {ConsultationMode, Lang, MedicalService, ServiceCategory} from '../types/medical';

interface ServicesPageProps {
  lang: Lang;
  selectedServiceId: string | null;
  onSelectService: (id: string | null) => void;
  onBookService: (serviceId: string, mode?: ConsultationMode) => void;
}

const CATEGORIES: {id: 'all' | ServiceCategory; label: {ar: string; en: string}}[] = [
  {id: 'all', label: {ar: 'جميع الخدمات (15)', en: 'All Services (15)'}},
  {id: 'primary', label: {ar: 'صحة الأسرة والطفل والمرأة', en: 'Family, Child & Women'}},
  {id: 'chronic', label: {ar: 'الأمراض المزمنة وكبار السن', en: 'Chronic & Senior Care'}},
  {id: 'preventive', label: {ar: 'الفحوصات الوقائية والمختبر', en: 'Preventive & Lab Diagnostics'}},
  {id: 'urgent', label: {ar: 'العيادة العاجلة والموظفين', en: 'Urgent & Employee Health'}},
  {id: 'telehealth-aesthetics', label: {ar: 'الاستشارات عن بعد والتجميل', en: 'Telehealth & Aesthetics'}},
];

export function ServicesPage({lang, selectedServiceId, onSelectService, onBookService}: ServicesPageProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MEDICAL_SERVICES.filter((service) => {
      const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        service.title.ar.toLowerCase().includes(q) ||
        service.title.en.toLowerCase().includes(q) ||
        service.shortDesc.ar.toLowerCase().includes(q) ||
        service.shortDesc.en.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  const activeService: MedicalService | undefined = useMemo(
    () => MEDICAL_SERVICES.find((s) => s.id === selectedServiceId),
    [selectedServiceId]
  );

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const formatModeName = (m: ConsultationMode) => {
    if (m === 'online') return lang === 'ar' ? 'استشارة أونلاين' : 'Online Consultation';
    if (m === 'riyadh') return lang === 'ar' ? 'الرياض' : 'Riyadh';
    return lang === 'ar' ? 'الأردن' : 'Jordan';
  };

  if (activeService) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
        <button
          type="button"
          onClick={() => onSelectService(null)}
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#0B3C5D] hover:underline"
        >
          {lang === 'ar' ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
          <span>{lang === 'ar' ? 'العودة إلى جميع الخدمات (15)' : 'Back to All 15 Services'}</span>
        </button>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Clinical Explanation */}
          <div className="lg:col-span-8 space-y-8">
            <div className="border-b border-slate-200 pb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-mono-num font-semibold text-[#0369A1]">{activeService.number}</span>
                <span aria-hidden="true">·</span>
                <span>{activeService.subtitle[lang]}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num">
                  {activeService.durationMinutes} {lang === 'ar' ? 'دقيقة' : 'min'}
                </span>
              </div>
              <h1 className="font-display mt-2 text-3xl font-bold text-slate-900">{activeService.title[lang]}</h1>
              <p className="mt-4 text-base leading-relaxed text-slate-700">{activeService.detailedDesc[lang]}</p>
            </div>

            {/* Key Clinical Features */}
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                {lang === 'ar' ? 'المميزات السريرية للخدمة' : 'Key Clinical Features'}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {activeService.features.map((feat) => (
                  <li key={feat.en} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <span>{feat[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suitable Cases */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="font-display text-lg font-bold text-slate-900">
                {lang === 'ar' ? 'الحالات المناسبة لهذه الخدمة' : 'Suitable Cases & Indications'}
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {activeService.suitableCases.map((item) => (
                  <li key={item.en} className="rounded-lg border border-slate-200 bg-white p-3.5 text-sm text-slate-700">
                    {item[lang]}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps to Benefit */}
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                {lang === 'ar' ? 'خطوات الاستفادة من الخدمة' : 'How the Consultation Works'}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {activeService.steps.map((step, i) => (
                  <div key={step.en} className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="font-mono-num text-xs font-bold text-[#0369A1]">0{i + 1}</div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{step[lang]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service FAQs */}
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                {lang === 'ar' ? 'الأسئلة الشائعة حول الخدمة' : 'Frequently Asked Questions'}
              </h2>
              <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
                {activeService.faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={faq.question.en}>
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-start text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        <span>{faq.question[lang]}</span>
                        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600">{faq.answer[lang]}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Booking Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-xs font-semibold text-[#0369A1]">
                {lang === 'ar' ? 'حجز الموعد لهذه الخدمة' : 'Schedule This Service'}
              </div>
              <h3 className="font-display mt-1.5 text-xl font-bold text-slate-900">{activeService.title[lang]}</h3>

              <div className="mt-4 space-y-2 border-y border-slate-200 py-4 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{lang === 'ar' ? 'المدة التقديرية' : 'Estimated Duration'}</span>
                  <span className="font-mono-num flex items-center gap-1.5 font-semibold">
                    <Clock className="h-4 w-4 text-[#0B3C5D]" />
                    {activeService.durationMinutes} {lang === 'ar' ? 'دقيقة' : 'min'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{lang === 'ar' ? 'طريقة التقديم' : 'Consultation Mode'}</span>
                  <span className="font-semibold text-emerald-700">
                    {lang === 'ar' ? 'استشارة أونلاين فقط' : 'Online Only'}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={() => onBookService(activeService.id, 'online')}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0B3C5D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#082c44]"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{lang === 'ar' ? 'احجز استشارة أونلاين الآن' : 'Book Online Consultation'}</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-[#0369A1]">
            {lang === 'ar' ? 'دليل الخدمات السريرية · 15 خدمة طبية متخصصة' : 'Clinical Directory · 15 Specialized Services'}
          </div>
          <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {lang === 'ar' ? 'الخدمات الطبية والرعاية الأسرية' : 'Medical & Family Care Services'}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {lang === 'ar'
              ? 'اختر أي خدمة للاطلاع على الشرح الطبي المفصل، المميزات، الحالات المناسبة، خطوات الاستفادة، والأسئلة الشائعة.'
              : 'Select any service to explore detailed clinical scope, key features, indications, care steps, FAQs, and instant booking.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث في الخدمات...' : 'Search services...'}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 ps-9 pe-8 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0369A1] focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="mt-6 flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1.5">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`cursor-pointer rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                isActive ? 'bg-white text-[#0B3C5D] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label[lang]}
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-600">
          {lang === 'ar' ? 'لا توجد خدمات مطابقة لبحثك. جرّب كلمة أخرى.' : 'No services match your search. Try another term.'}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono-num font-bold text-[#0369A1]">{service.number}</span>
                  <span>{service.modes.map(formatModeName).join(' · ')}</span>
                </div>
                <h2 className="font-display mt-3 text-lg font-bold text-slate-900">{service.title[lang]}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.shortDesc[lang]}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => onSelectService(service.id)}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#0B3C5D] hover:text-[#0369A1]"
                >
                  <span>{lang === 'ar' ? 'التفاصيل والشرح' : 'View Full Details'}</span>
                  <ArrowIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onBookService(service.id, 'online')}
                  className="cursor-pointer whitespace-nowrap shrink-0 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  {lang === 'ar' ? 'احجز أونلاين' : 'Book Online'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
