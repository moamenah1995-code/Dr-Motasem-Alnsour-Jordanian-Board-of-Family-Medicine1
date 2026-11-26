import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  RotateCcw,
} from 'lucide-react';
import {useMemo, useState} from 'react';
import {
  evaluateBmiAssessment,
  evaluateStandardAssessment,
  HEALTH_ASSESSMENTS,
  type AssessmentReport,
} from '../data/assessmentsData';
import {MEDICAL_ARTICLES} from '../data/knowledgeData';
import type {AssessmentDefinition, AssessmentId, Lang} from '../types/medical';

interface HealthAssessmentsPageProps {
  lang: Lang;
  initialAssessmentId?: AssessmentId | null;
  onOpenArticle: (articleId: string) => void;
  onBookService: (serviceId: string) => void;
}

export function HealthAssessmentsPage({
  lang,
  initialAssessmentId,
  onOpenArticle,
  onBookService,
}: HealthAssessmentsPageProps) {
  const [activeId, setActiveId] = useState<AssessmentId>(initialAssessmentId ?? 'diabetes-risk');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [bmiInputs, setBmiInputs] = useState({
    weightKg: '78',
    heightCm: '174',
    waistCm: '90',
    gender: 'male' as 'male' | 'female',
  });
  const [report, setReport] = useState<AssessmentReport | null>(null);
  const [validationError, setValidationError] = useState<string>('');

  const activeAssessment: AssessmentDefinition = useMemo(
    () => HEALTH_ASSESSMENTS.find((a) => a.id === activeId) ?? HEALTH_ASSESSMENTS[0],
    [activeId]
  );

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const handleSelectAssessment = (id: AssessmentId) => {
    setActiveId(id);
    setAnswers({});
    setReport(null);
    setValidationError('');
  };

  const handleSubmitStandard = () => {
    const unanswered = activeAssessment.questions.some((q) => answers[q.id] === undefined);
    if (unanswered) {
      setValidationError(
        lang === 'ar' ? 'يرجى الإجابة عن جميع الأسئلة لعرض التقرير الصحي.' : 'Please answer all questions to generate your report.'
      );
      return;
    }
    setValidationError('');
    const totalScore = activeAssessment.questions.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
    const maxScore = activeAssessment.questions.reduce(
      (acc, q) => acc + Math.max(...q.options.map((o) => o.points)),
      0
    );
    setReport(evaluateStandardAssessment(activeAssessment.id, totalScore, maxScore));
  };

  const handleSubmitBmi = () => {
    const w = Number(bmiInputs.weightKg);
    const h = Number(bmiInputs.heightCm);
    const waist = Number(bmiInputs.waistCm);

    if (!Number.isFinite(w) || w < 25 || w > 300 || !Number.isFinite(h) || h < 100 || h > 240) {
      setValidationError(
        lang === 'ar'
          ? 'يرجى إدخال قيم صحيحة للوزن (كجم) والطول (سم).'
          : 'Please enter valid weight (kg) and height (cm) values.'
      );
      return;
    }
    setValidationError('');
    setReport(evaluateBmiAssessment(w, h, Number.isFinite(waist) ? waist : 85, bmiInputs.gender));
  };

  const relatedArticles = useMemo(
    () =>
      activeAssessment.relatedArticleIds
        .map((id) => MEDICAL_ARTICLES.find((a) => a.id === id))
        .filter((a): a is NonNullable<typeof a> => Boolean(a)),
    [activeAssessment]
  );

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <div className="max-w-3xl border-b border-slate-200 pb-6">
        <div className="text-xs font-semibold text-[#0369A1]">
          {lang === 'ar' ? 'التقييم الصحي التفاعلي · 6 اختبارات طبية' : 'Interactive Health Screening · 6 Clinical Assessments'}
        </div>
        <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {lang === 'ar' ? 'اختبارات صحية تفاعلية مع تقرير وتوصيات' : 'Interactive Health Assessments & Clinical Reports'}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {lang === 'ar'
            ? 'اختر أي اختبار لتقييم مؤشراتك الصحية خلال دقيقتين والحصول على تحليل مبسط وتوصيات طبية ومقالات مرتبطة بنتيجتك.'
            : 'Complete any 2-minute screening to receive a simplified clinical summary, actionable recommendations, and tailored next steps.'}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Navigation List of 6 Assessments */}
        <div className="space-y-2.5 lg:col-span-4">
          {HEALTH_ASSESSMENTS.map((item, idx) => {
            const isSelected = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectAssessment(item.id)}
                className={`w-full cursor-pointer rounded-xl border p-4 text-start transition-colors ${
                  isSelected
                    ? 'border-[#0B3C5D] bg-[#0B3C5D] text-white'
                    : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`font-mono-num text-xs ${isSelected ? 'text-sky-200' : 'text-slate-500'}`}>
                  0{idx + 1} · {item.estimatedMinutes} {lang === 'ar' ? 'دقيقة' : 'min'}
                </div>
                <div className="font-display mt-1 text-base font-bold">{item.title[lang]}</div>
                <p className={`mt-1 text-xs leading-relaxed ${isSelected ? 'text-sky-100' : 'text-slate-600'}`}>
                  {item.shortDesc[lang]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Interactive Assessment Form & Clinical Report */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900">{activeAssessment.title[lang]}</h2>
                <p className="mt-1 text-sm text-slate-600">{activeAssessment.shortDesc[lang]}</p>
              </div>
              {report && (
                <button
                  type="button"
                  onClick={() => {
                    setReport(null);
                    setAnswers({});
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>{lang === 'ar' ? 'إعادة الاختبار' : 'Retake Test'}</span>
                </button>
              )}
            </div>

            {!report ? (
              <div className="mt-6 space-y-6">
                {activeAssessment.isBmiCalculator ? (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-slate-800">
                        {lang === 'ar' ? 'الوزن (كجم)' : 'Weight (kg)'}
                      </label>
                      <input
                        type="number"
                        min={25}
                        max={300}
                        value={bmiInputs.weightKg}
                        onChange={(e) => setBmiInputs((prev) => ({...prev, weightKg: e.target.value}))}
                        className="font-mono-num mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#0369A1] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-800">
                        {lang === 'ar' ? 'الطول (سم)' : 'Height (cm)'}
                      </label>
                      <input
                        type="number"
                        min={100}
                        max={240}
                        value={bmiInputs.heightCm}
                        onChange={(e) => setBmiInputs((prev) => ({...prev, heightCm: e.target.value}))}
                        className="font-mono-num mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#0369A1] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-800">
                        {lang === 'ar' ? 'محيط الخصر (سم)' : 'Waist Circumference (cm)'}
                      </label>
                      <input
                        type="number"
                        min={45}
                        max={200}
                        value={bmiInputs.waistCm}
                        onChange={(e) => setBmiInputs((prev) => ({...prev, waistCm: e.target.value}))}
                        className="font-mono-num mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#0369A1] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-800">
                        {lang === 'ar' ? 'الجنس' : 'Sex'}
                      </label>
                      <div className="mt-1.5 grid grid-cols-2 gap-2">
                        {(['male', 'female'] as const).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setBmiInputs((prev) => ({...prev, gender: g}))}
                            className={`cursor-pointer rounded-lg border py-2.5 text-sm font-semibold ${
                              bmiInputs.gender === g
                                ? 'border-[#0B3C5D] bg-[#0B3C5D] text-white'
                                : 'border-slate-300 bg-white text-slate-700'
                            }`}
                          >
                            {g === 'male' ? (lang === 'ar' ? 'ذكر' : 'Male') : lang === 'ar' ? 'أنثى' : 'Female'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  activeAssessment.questions.map((q, qIdx) => (
                    <fieldset key={q.id} className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
                      <legend className="text-sm font-bold text-slate-900">
                        <span className="font-mono-num text-[#0369A1] me-2">0{qIdx + 1}.</span>
                        {q.prompt[lang]}
                      </legend>
                      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {q.options.map((opt) => {
                          const selected = answers[q.id] === opt.points;
                          return (
                            <button
                              key={opt.label.en}
                              type="button"
                              onClick={() => setAnswers((prev) => ({...prev, [q.id]: opt.points}))}
                              className={`cursor-pointer rounded-lg border px-3.5 py-2.5 text-start text-sm transition-colors ${
                                selected
                                  ? 'border-[#0B3C5D] bg-[#0B3C5D] font-semibold text-white'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              {opt.label[lang]}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  ))
                )}

                {validationError && (
                  <div className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="flex items-center justify-end border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={activeAssessment.isBmiCalculator ? handleSubmitBmi : handleSubmitStandard}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#0B3C5D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#082c44]"
                  >
                    <ClipboardCheck className="h-4 w-4" />
                    <span>{lang === 'ar' ? 'عرض التقرير والتوصيات' : 'Generate Clinical Report'}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Structured Clinical Report View */
              <div className="mt-6 space-y-6">
                <div
                  className={`rounded-xl border p-6 ${
                    report.level === 'low'
                      ? 'border-emerald-200 bg-emerald-50/70'
                      : report.level === 'moderate'
                        ? 'border-amber-200 bg-amber-50/70'
                        : 'border-rose-200 bg-rose-50/70'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      {report.level === 'low' ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                      ) : report.level === 'moderate' ? (
                        <Activity className="h-5 w-5 text-amber-700" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-rose-700" />
                      )}
                      <span>{report.tierLabel[lang]}</span>
                    </div>
                    <div className="font-mono-num text-lg font-bold text-slate-900">{report.scoreDisplay}</div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{report.summary[lang]}</p>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {lang === 'ar' ? 'التوصيات الطبية المقترحة' : 'Clinical Recommendations'}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {report.recommendations.map((rec) => (
                      <li
                        key={rec.en}
                        className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0B3C5D]" />
                        <span>{rec[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 font-display text-base font-bold text-slate-900">
                      <BookOpen className="h-4 w-4 text-[#0369A1]" />
                      <span>{lang === 'ar' ? 'مقالات طبية مرتبطة بنتيجتك' : 'Related Medical Articles'}</span>
                    </h3>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {relatedArticles.map((art) => (
                        <button
                          key={art.id}
                          type="button"
                          onClick={() => onOpenArticle(art.id)}
                          className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-start hover:border-[#0369A1]"
                        >
                          <span className="text-sm font-semibold text-slate-900">{art.title[lang]}</span>
                          <ArrowIcon className="h-4 w-4 shrink-0 text-[#0369A1]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Consultation CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <div>
                    <div className="font-display text-base font-bold text-slate-900">
                      {lang === 'ar'
                        ? 'هل ترغب بمناقشة نتيجتك مع د. معتصم النسور؟'
                        : 'Discuss Your Assessment With Dr. Motasem Alnsour'}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-600">
                      {lang === 'ar'
                        ? 'متاح حجز استشارة أونلاين أو حضورياً في الرياض والأردن'
                        : 'Available online or in-clinic in Riyadh and Jordan'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onBookService(activeAssessment.recommendedServiceId)}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#0B3C5D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082c44]"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>{lang === 'ar' ? 'احجز استشارة الآن' : 'Book Consultation'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
