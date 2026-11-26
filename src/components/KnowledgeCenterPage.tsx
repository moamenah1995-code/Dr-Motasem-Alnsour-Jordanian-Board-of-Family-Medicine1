import {ArrowLeft, ArrowRight, BookOpen, Calendar, CheckCircle2, Search, X} from 'lucide-react';
import {useMemo, useState} from 'react';
import {KNOWLEDGE_CATEGORIES, MEDICAL_ARTICLES} from '../data/knowledgeData';
import {MEDICAL_SERVICES} from '../data/servicesData';
import type {KnowledgeCategoryId, Lang, MedicalArticle} from '../types/medical';

interface KnowledgeCenterPageProps {
  lang: Lang;
  selectedArticleId: string | null;
  onSelectArticle: (id: string | null) => void;
  onBookService: (serviceId: string) => void;
  onOpenService: (serviceId: string) => void;
}

export function KnowledgeCenterPage({
  lang,
  selectedArticleId,
  onSelectArticle,
  onBookService,
  onOpenService,
}: KnowledgeCenterPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | KnowledgeCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MEDICAL_ARTICLES.filter((article) => {
      const catMatch = selectedCategory === 'all' || article.categoryId === selectedCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        article.title.ar.toLowerCase().includes(q) ||
        article.title.en.toLowerCase().includes(q) ||
        article.summary.ar.toLowerCase().includes(q) ||
        article.summary.en.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticles = useMemo(() => MEDICAL_ARTICLES.filter((a) => a.featured), []);

  const activeArticle: MedicalArticle | undefined = useMemo(
    () => MEDICAL_ARTICLES.find((a) => a.id === selectedArticleId),
    [selectedArticleId]
  );

  const getCategoryName = (catId: KnowledgeCategoryId) =>
    KNOWLEDGE_CATEGORIES.find((c) => c.id === catId)?.name[lang] ?? '';

  if (activeArticle) {
    const relatedArticles = activeArticle.relatedArticleIds
      .map((id) => MEDICAL_ARTICLES.find((a) => a.id === id))
      .filter((a): a is MedicalArticle => Boolean(a));

    const sameCategoryArticles = MEDICAL_ARTICLES.filter(
      (a) => a.categoryId === activeArticle.categoryId && a.id !== activeArticle.id
    );

    const readAlsoPool = [...relatedArticles, ...sameCategoryArticles].filter(
      (item, index, self) => self.findIndex((x) => x.id === item.id) === index
    );

    const recommendedService = MEDICAL_SERVICES.find((s) => s.id === activeArticle.recommendedServiceId);

    return (
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
        <button
          type="button"
          onClick={() => onSelectArticle(null)}
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#0B3C5D] hover:underline"
        >
          {lang === 'ar' ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
          <span>{lang === 'ar' ? 'العودة إلى مركز المعرفة الطبية' : 'Back to Medical Knowledge Center'}</span>
        </button>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Article Body */}
          <article className="lg:col-span-8">
            <div className="border-b border-slate-200 pb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-[#0369A1]">{getCategoryName(activeArticle.categoryId)}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num">{activeArticle.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num">
                  {activeArticle.readTimeMinutes} {lang === 'ar' ? 'دقائق للقراءة' : 'min read'}
                </span>
              </div>
              <h1 className="font-display mt-3 text-2xl font-bold leading-snug text-slate-900 sm:text-4xl">
                {activeArticle.title[lang]}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{activeArticle.summary[lang]}</p>
              <div className="mt-4 text-xs text-slate-500">
                {lang === 'ar'
                  ? 'مراجعة طبية: د. معتصم النسور · أخصائي أول طب الأسرة'
                  : 'Medically reviewed by Dr. Motasem Alnsour · Senior Specialist in Family Medicine'}
              </div>
            </div>

            {/* Article Sections */}
            <div className="mt-8 space-y-7 max-w-prose">
              {activeArticle.sections.map((sec) => (
                <section key={sec.heading.en}>
                  <h2 className="font-display text-xl font-bold text-slate-900">{sec.heading[lang]}</h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-700">{sec.body[lang]}</p>
                </section>
              ))}
            </div>

            {/* Key Medical Takeaways */}
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-display text-base font-bold text-slate-900">
                {lang === 'ar' ? 'الخلاصة الطبية العملية' : 'Key Clinical Takeaways'}
              </h3>
              <ul className="mt-3 space-y-2">
                {activeArticle.keyTakeaways.map((tip) => (
                  <li key={tip.en} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <span>{tip[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Read Also / Similar Content */}
            {readAlsoPool.length > 0 && (
              <div className="mt-10 border-t border-slate-200 pt-8">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {lang === 'ar' ? 'اقرأ أيضاً — محتوى طبي مشابه' : 'Read Also — Related Medical Articles'}
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {readAlsoPool.slice(0, 4).map((rel) => (
                    <button
                      key={rel.id}
                      type="button"
                      onClick={() => onSelectArticle(rel.id)}
                      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 text-start transition-colors hover:border-[#0369A1]"
                    >
                      <div className="text-xs text-slate-500">
                        {getCategoryName(rel.categoryId)} · {rel.readTimeMinutes} {lang === 'ar' ? 'د' : 'min'}
                      </div>
                      <div className="font-display mt-1.5 text-sm font-bold text-slate-900">{rel.title[lang]}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Margin Sidebar: Recommended Service & Suggested Reads */}
          <aside className="lg:col-span-4 space-y-6">
            {recommendedService && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-xs font-semibold text-[#0369A1]">
                  {lang === 'ar' ? 'الخدمة الطبية المرتبطة' : 'Recommended Clinical Service'}
                </div>
                <h3 className="font-display mt-1.5 text-lg font-bold text-slate-900">
                  {recommendedService.title[lang]}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{recommendedService.shortDesc[lang]}</p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => onBookService(recommendedService.id)}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0B3C5D] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#082c44]"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>{lang === 'ar' ? 'احجز استشارة الآن' : 'Book Consultation'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenService(recommendedService.id)}
                    className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100"
                  >
                    {lang === 'ar' ? 'تفاصيل الخدمة' : 'View Service Scope'}
                  </button>
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-display text-sm font-bold text-slate-900">
                {lang === 'ar' ? 'المقالات المقترحة' : 'Suggested Articles'}
              </h3>
              <ul className="mt-4 divide-y divide-slate-100">
                {featuredArticles.slice(0, 4).map((feat) => (
                  <li key={feat.id} className="py-3 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => onSelectArticle(feat.id)}
                      className="cursor-pointer text-start text-sm font-medium text-slate-800 hover:text-[#0369A1]"
                    >
                      {feat.title[lang]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      {/* Header & Smart Search */}
      <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-[#0369A1]">
            {lang === 'ar'
              ? 'مركز المعرفة الطبية والمدونة الذكية · 13 محوراً طبياً'
              : 'Medical Knowledge Center & Smart Blog · 13 Clinical Disciplines'}
          </div>
          <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {lang === 'ar' ? 'المكتبة الطبية الموثوقة للأسرة' : 'Evidence-Based Family Medical Library'}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {lang === 'ar'
              ? 'مقالات طبية محررة وفق الأدلة السريرية لمساعدتك على فهم الأعراض، الوقاية، التحاليل، والأمراض المزمنة.'
              : 'Clinically reviewed guides on chronic care, preventive checkups, pediatric health, nutrition, and lab literacy.'}
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث في المقالات والموضوعات...' : 'Search medical articles...'}
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

      {/* Featured / Suggested Articles Row (only when showing All and no search query) */}
      {selectedCategory === 'all' && !searchQuery && (
        <section className="mt-8">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <BookOpen className="h-4 w-4 text-[#0B3C5D]" />
            <h2>{lang === 'ar' ? 'المقالات المقترحة والمختارة' : 'Featured Clinical Guides'}</h2>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
            {featuredArticles.slice(0, 3).map((art) => (
              <article
                key={art.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-6"
              >
                <div>
                  <div className="text-xs text-slate-500">
                    {getCategoryName(art.categoryId)} · {art.readTimeMinutes} {lang === 'ar' ? 'دقائق' : 'min'}
                  </div>
                  <h3 className="font-display mt-2 text-lg font-bold text-slate-900">{art.title[lang]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{art.summary[lang]}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectArticle(art.id)}
                  className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#0B3C5D] hover:text-[#0369A1]"
                >
                  <span>{lang === 'ar' ? 'اقرأ المقال كاملاً' : 'Read Full Guide'}</span>
                  <ArrowIcon className="h-4 w-4" />
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 13 Medical Categories Filter Bar */}
      <div className="mt-10">
        <div className="text-xs font-semibold text-slate-500">
          {lang === 'ar' ? 'تصفح حسب التخصص الصحي (13 تصنيفاً)' : 'Browse by Health Topic (13 Categories)'}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === 'all'
                ? 'border-[#0B3C5D] bg-[#0B3C5D] text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {lang === 'ar' ? `الكل (${MEDICAL_ARTICLES.length})` : `All (${MEDICAL_ARTICLES.length})`}
          </button>
          {KNOWLEDGE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'border-[#0B3C5D] bg-[#0B3C5D] text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat.name[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-600">
          {lang === 'ar' ? 'لم يتم العثور على مقالات مطابقة للبحث.' : 'No articles found matching your search.'}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-[#0369A1]">{getCategoryName(article.categoryId)}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num">
                    {article.readTimeMinutes} {lang === 'ar' ? 'د' : 'min'}
                  </span>
                </div>
                <h3 className="font-display mt-2.5 text-base font-bold leading-snug text-slate-900">
                  {article.title[lang]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{article.summary[lang]}</p>
              </div>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => onSelectArticle(article.id)}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#0B3C5D] hover:text-[#0369A1]"
                >
                  <span>{lang === 'ar' ? 'قراءة المقال' : 'Read Article'}</span>
                  <ArrowIcon className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
