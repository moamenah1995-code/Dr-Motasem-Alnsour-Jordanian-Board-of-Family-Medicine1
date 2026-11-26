import {ChevronLeft, ChevronRight, Home} from 'lucide-react';
import {useEffect, useState} from 'react';
import {AboutDoctorPage} from './components/AboutDoctorPage';
import {AiAssistantDrawer} from './components/AiAssistantDrawer';
import {BookingPage} from './components/BookingPage';
import {FamilyMedicinePage} from './components/FamilyMedicineInfographics';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {HealthAssessmentsPage} from './components/HealthAssessmentsPage';
import {HomePage} from './components/HomePage';
import {KnowledgeCenterPage} from './components/KnowledgeCenterPage';
import {ReviewsPage} from './components/ReviewsPage';
import {ServicesPage} from './components/ServicesPage';
import {COMMON_MEDICAL_FAQS} from './data/faqData';
import type {AssessmentId, ConsultationMode, Lang, PageId} from './types/medical';

const VALID_PAGES: PageId[] = [
  'home',
  'about',
  'family-medicine',
  'services',
  'knowledge',
  'assessments',
  'booking',
  'reviews',
];

function parseHashRoute(): {page: PageId; itemId: string | null} {
  if (typeof window === 'undefined') return {page: 'home', itemId: null};
  const raw = window.location.hash.replace(/^#\/?/, '').trim();
  if (!raw) return {page: 'home', itemId: null};
  const [segment, item] = raw.split('/');
  const matched = VALID_PAGES.find((p) => p === segment);
  return {
    page: matched ?? 'home',
    itemId: item ? decodeURIComponent(item) : null,
  };
}

function buildHash(page: PageId, itemId?: string | null): string {
  if (page === 'home') return '#/';
  if (itemId) return `#/${page}/${encodeURIComponent(itemId)}`;
  return `#/${page}`;
}

export default function App() {
  const initialRoute = parseHashRoute();
  const [lang, setLang] = useState<Lang>('ar');
  const [activePage, setActivePage] = useState<PageId>(initialRoute.page);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    initialRoute.page === 'services' ? initialRoute.itemId : null
  );
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    initialRoute.page === 'knowledge' ? initialRoute.itemId : null
  );
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<AssessmentId | null>(
    initialRoute.page === 'assessments' ? (initialRoute.itemId as AssessmentId | null) : null
  );
  const [bookingServiceId, setBookingServiceId] = useState<string | null>(null);
  const [bookingMode, setBookingMode] = useState<ConsultationMode | null>(null);
  const [aiOpen, setAiOpen] = useState(false);

  // Sync browser back/forward hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const next = parseHashRoute();
      setActivePage(next.page);
      setSelectedServiceId(next.page === 'services' ? next.itemId : null);
      setSelectedArticleId(next.page === 'knowledge' ? next.itemId : null);
      setSelectedAssessmentId(next.page === 'assessments' ? (next.itemId as AssessmentId | null) : null);
      window.scrollTo({top: 0, behavior: 'smooth'});
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync document direction, language, and SEO title cleanly
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const pageTitles: Record<PageId, {ar: string; en: string}> = {
      home: {
        ar: 'د. معتصم النسور | أخصائي أول طب الأسرة — الرياض والأردن',
        en: 'Dr. Motasem Alnsour | Senior Specialist in Family Medicine',
      },
      about: {
        ar: 'عن الدكتور معتصم النسور | السيرة الذاتية والمؤهلات',
        en: 'About Dr. Motasem Alnsour | Credentials & Experience',
      },
      'family-medicine': {
        ar: 'ما هو طب الأسرة؟ | دليل العائلة الطبي — د. معتصم النسور',
        en: 'What Is Family Medicine? | Patient Guide — Dr. Motasem Alnsour',
      },
      services: {
        ar: 'الخدمات الطبية (15 خدمة) | د. معتصم النسور',
        en: 'Medical Services (15 Services) | Dr. Motasem Alnsour',
      },
      knowledge: {
        ar: 'مركز المعرفة الطبية والمدونة الذكية | د. معتصم النسور',
        en: 'Medical Knowledge Center & Blog | Dr. Motasem Alnsour',
      },
      assessments: {
        ar: 'اختبارات صحية تفاعلية | د. معتصم النسور',
        en: 'Interactive Health Assessments | Dr. Motasem Alnsour',
      },
      booking: {
        ar: 'حجز استشارة طبية أونلاين | د. معتصم النسور',
        en: 'Book Online Consultation | Dr. Motasem Alnsour',
      },
      reviews: {
        ar: 'آراء المرضى والشهادات | د. معتصم النسور',
        en: 'Patient Reviews & Testimonials | Dr. Motasem Alnsour',
      },
    };
    document.title = pageTitles[activePage][lang];

    // Keep canonical URL synced
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // Keep Schema.org FAQPage JSON-LD synced with active language
    const faqScript = document.getElementById('faq-schema-jsonld');
    if (faqScript) {
      faqScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: COMMON_MEDICAL_FAQS.map((item) => ({
          '@type': 'Question',
          name: item.question[lang],
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer[lang],
          },
        })),
      });
    }
  }, [lang, activePage]);

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    if (page !== 'services') setSelectedServiceId(null);
    if (page !== 'knowledge') setSelectedArticleId(null);
    if (page !== 'assessments') setSelectedAssessmentId(null);
    window.location.hash = buildHash(page);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleOpenService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActivePage('services');
    window.location.hash = buildHash('services', serviceId);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleOpenArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setActivePage('knowledge');
    window.location.hash = buildHash('knowledge', articleId);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleOpenAssessment = (assessmentId: AssessmentId) => {
    setSelectedAssessmentId(assessmentId);
    setActivePage('assessments');
    window.location.hash = buildHash('assessments', assessmentId);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleStartBooking = (_mode?: ConsultationMode, serviceId?: string) => {
    setBookingMode('online');
    setBookingServiceId(serviceId ?? null);
    setActivePage('booking');
    window.location.hash = buildHash('booking');
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const toggleLang = () => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));

  const breadcrumbLabels: Record<PageId, {ar: string; en: string}> = {
    home: {ar: 'الرئيسية', en: 'Home'},
    about: {ar: 'عن الدكتور والمؤهلات', en: 'About Dr. Motasem'},
    'family-medicine': {ar: 'ما هو طب الأسرة؟', en: 'What Is Family Medicine?'},
    services: {ar: 'الخدمات الطبية (15 خدمة)', en: 'Medical Services'},
    knowledge: {ar: 'مركز المعرفة الطبية والمدونة', en: 'Medical Knowledge Center'},
    assessments: {ar: 'الاختبارات الصحية التفاعلية', en: 'Health Assessments'},
    booking: {ar: 'حجز استشارة طبية أونلاين', en: 'Book Online Consultation'},
    reviews: {ar: 'آراء وتجارب المرضى', en: 'Patient Reviews'},
  };

  const BreadcrumbSeparator = lang === 'ar' ? ChevronLeft : ChevronRight;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header lang={lang} activePage={activePage} onNavigate={navigateTo} onToggleLang={toggleLang} />

      {activePage !== 'home' && (
        <div className="border-b border-slate-200 bg-slate-50/70">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-2.5 text-xs sm:px-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-slate-500">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="inline-flex cursor-pointer items-center gap-1.5 font-semibold text-[#0B3C5D] hover:underline"
              >
                <Home className="h-3.5 w-3.5" />
                <span>{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
              </button>
              <BreadcrumbSeparator className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-medium text-slate-800">{breadcrumbLabels[activePage][lang]}</span>
            </nav>
            <button
              type="button"
              onClick={toggleLang}
              className="cursor-pointer font-semibold text-[#0369A1] hover:underline"
            >
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            lang={lang}
            onToggleLang={toggleLang}
            onNavigate={navigateTo}
            onStartBooking={handleStartBooking}
            onOpenAiAssistant={() => setAiOpen(true)}
          />
        )}

        {activePage === 'about' && <AboutDoctorPage lang={lang} onNavigate={navigateTo} />}

        {activePage === 'family-medicine' && <FamilyMedicinePage lang={lang} onNavigate={navigateTo} />}

        {activePage === 'services' && (
          <ServicesPage
            lang={lang}
            selectedServiceId={selectedServiceId}
            onSelectService={(id) => {
              setSelectedServiceId(id);
              window.location.hash = buildHash('services', id);
            }}
            onBookService={(serviceId, mode) => handleStartBooking(mode, serviceId)}
          />
        )}

        {activePage === 'knowledge' && (
          <KnowledgeCenterPage
            lang={lang}
            selectedArticleId={selectedArticleId}
            onSelectArticle={(id) => {
              setSelectedArticleId(id);
              window.location.hash = buildHash('knowledge', id);
            }}
            onBookService={(serviceId) => handleStartBooking(undefined, serviceId)}
            onOpenService={handleOpenService}
          />
        )}

        {activePage === 'assessments' && (
          <HealthAssessmentsPage
            lang={lang}
            initialAssessmentId={selectedAssessmentId}
            onOpenArticle={handleOpenArticle}
            onBookService={(serviceId) => handleStartBooking(undefined, serviceId)}
          />
        )}

        {activePage === 'booking' && (
          <BookingPage lang={lang} initialServiceId={bookingServiceId} initialMode={bookingMode} />
        )}

        {activePage === 'reviews' && (
          <ReviewsPage lang={lang} onStartBooking={() => handleStartBooking()} />
        )}
      </main>

      <Footer lang={lang} onNavigate={navigateTo} onToggleLang={toggleLang} />

      <AiAssistantDrawer
        lang={lang}
        isOpen={aiOpen}
        onOpen={() => setAiOpen(true)}
        onClose={() => setAiOpen(false)}
        onOpenService={handleOpenService}
        onOpenArticle={handleOpenArticle}
        onBookService={(serviceId, mode) => handleStartBooking(mode, serviceId)}
      />
    </div>
  );
}
