import {CheckCircle2, ClipboardList, MessageSquarePlus, ShieldCheck, Star} from 'lucide-react';
import {useEffect, useMemo, useState, type FormEvent} from 'react';
import {REVIEW_CRITERIA} from '../data/reviewsData';
import {MEDICAL_SERVICES} from '../data/servicesData';
import type {ConsultationMode, Lang, PatientReview, ReviewCriteriaRatings} from '../types/medical';

interface ReviewsPageProps {
  lang: Lang;
  onStartBooking: () => void;
}

export function ReviewsPage({lang, onStartBooking}: ReviewsPageProps) {
  const [reviews, setReviews] = useState<PatientReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState<'all' | ConsultationMode>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [patientName, setPatientName] = useState('');
  const [location, setLocation] = useState('');
  const [consultationType, setConsultationType] = useState<ConsultationMode>('online');
  const [serviceId, setServiceId] = useState(MEDICAL_SERVICES[0].id);
  const [visitDate, setVisitDate] = useState(new Date().toISOString().slice(0, 10));
  const [bookingRef, setBookingRef] = useState('');
  const [ratings, setRatings] = useState<ReviewCriteriaRatings>({
    listening: 5,
    clarity: 5,
    followUp: 5,
    punctuality: 5,
  });
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data: {reviews?: PatientReview[]}) => {
        if (Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {
        setReviews([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const matchesMode = filterMode === 'all' || r.consultationType === filterMode;
      const matchesVerified = !verifiedOnly || r.verified;
      return matchesMode && matchesVerified;
    });
  }, [reviews, filterMode, verifiedOnly]);

  const criteriaAverages = useMemo(() => {
    if (reviews.length === 0) return null;
    const sum = reviews.reduce(
      (acc, r) => ({
        listening: acc.listening + (r.ratings?.listening ?? r.rating),
        clarity: acc.clarity + (r.ratings?.clarity ?? r.rating),
        followUp: acc.followUp + (r.ratings?.followUp ?? r.rating),
        punctuality: acc.punctuality + (r.ratings?.punctuality ?? r.rating),
      }),
      {listening: 0, clarity: 0, followUp: 0, punctuality: 0}
    );
    const n = reviews.length;
    return {
      listening: (sum.listening / n).toFixed(1),
      clarity: (sum.clarity / n).toFixed(1),
      followUp: (sum.followUp / n).toFixed(1),
      punctuality: (sum.punctuality / n).toFixed(1),
      overall: (
        (sum.listening + sum.clarity + sum.followUp + sum.punctuality) /
        (n * 4)
      ).toFixed(1),
    };
  }, [reviews]);

  const modeLabel = (m: ConsultationMode) => {
    if (m === 'riyadh') return lang === 'ar' ? 'عيادة الرياض' : 'Riyadh Clinic';
    if (m === 'jordan') return lang === 'ar' ? 'عيادة الأردن' : 'Jordan Clinic';
    return lang === 'ar' ? 'استشارة أونلاين' : 'Online Telehealth';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          patientName,
          location,
          consultationType,
          serviceId,
          visitDate,
          bookingRef,
          ratings,
          comment,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(
          data.error ||
            (lang === 'ar'
              ? 'يرجى التحقق من تعبئة كافة الحقول المطلوبة بدقة.'
              : 'Please verify all required fields.')
        );
        return;
      }
      if (data.review) {
        setReviews((prev) => [data.review as PatientReview, ...prev]);
        setPatientName('');
        setLocation('');
        setBookingRef('');
        setComment('');
        setShowForm(false);
        setSubmitMessage(
          lang === 'ar'
            ? 'شكراً لمشاركتك الدقيقة. تم حفظ تقييمك وعرضه ضمن تجارب المراجعين.'
            : 'Thank you. Your structured patient feedback has been recorded.'
        );
      }
    } catch {
      setErrorMessage(lang === 'ar' ? 'حدث خطأ في الاتصال بالخادم.' : 'Connection error submitting review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-[#0369A1]">
            {lang === 'ar'
              ? 'تقييم جودة الرعاية الطبية · مؤشرات محددة وموثقة'
              : 'Structured Patient Experience & Clinical Quality Metrics'}
          </div>
          <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {lang === 'ar' ? 'تجارب المراجعين ومعايير التقييم السريري' : 'Patient Feedback & Clinical Care Standards'}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {lang === 'ar'
              ? 'نعتمد في عرض آراء المراجعين على التقييم المحدد بالخدمة وتاريخ الزيارة وأربعة معايير سريرية واضحة، مع إمكانية التوثيق عبر الرقم المرجعي للموعد.'
              : 'Every published patient review records the exact medical service, consultation location, visit date, and four specific clinical quality criteria—verifiable via booking reference code.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            <MessageSquarePlus className="h-4 w-4 text-[#0B3C5D]" />
            <span>{lang === 'ar' ? 'إضافة تقييم مريض محدد' : 'Submit Structured Feedback'}</span>
          </button>
          <button
            type="button"
            onClick={onStartBooking}
            className="cursor-pointer rounded-lg bg-[#0B3C5D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082c44]"
          >
            {lang === 'ar' ? 'احجز موعدك' : 'Book Appointment'}
          </button>
        </div>
      </div>

      {/* 4 Specific Clinical Evaluation Criteria Summary */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-[#0B3C5D]" />
            <h2 className="font-display text-base font-bold text-slate-900">
              {lang === 'ar'
                ? 'المعايير الأربعة لتقييم تجربة المريض في العيادة'
                : 'Four Clinical Criteria Evaluated by Patients'}
            </h2>
          </div>
          {criteriaAverages && (
            <div className="font-mono-num text-sm font-bold text-[#0B3C5D]">
              {lang === 'ar' ? 'المتوسط العام:' : 'Overall Average:'} {criteriaAverages.overall} / 5.0 ({reviews.length})
            </div>
          )}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEW_CRITERIA.map((crit) => {
            const avg = criteriaAverages ? criteriaAverages[crit.key] : null;
            return (
              <div key={crit.key} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#0B3C5D]">{crit.label[lang]}</span>
                  {avg && <span className="font-mono-num text-sm font-bold text-slate-900">{avg}</span>}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{crit.description[lang]}</p>
              </div>
            );
          })}
        </div>
      </section>

      {submitMessage && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 text-sm font-medium text-emerald-900">
          {submitMessage}
        </div>
      )}

      {/* Structured Review Submission Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="font-display text-lg font-bold text-slate-900">
            {lang === 'ar' ? 'نموذج تقييم تجربة المريض بدقة' : 'Structured Patient Experience Form'}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {lang === 'ar'
              ? 'يرجى تحديد الخدمة الطبية وتاريخ الزيارة وتقييم كل معيار سريري على حدة.'
              : 'Please specify the consultation location, exact service, visit date, and rate each clinical dimension.'}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                {lang === 'ar' ? 'اسم المريض *' : 'Patient Name *'}
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                {lang === 'ar' ? 'موقع / نوع الاستشارة *' : 'Consultation Location / Mode *'}
              </label>
              <select
                value={consultationType}
                onChange={(e) => setConsultationType(e.target.value as ConsultationMode)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              >
                <option value="online">{lang === 'ar' ? 'استشارة طبية عن بعد (أونلاين)' : 'Online Telehealth Consultation'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                {lang === 'ar' ? 'المدينة (اختياري)' : 'City (Optional)'}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={lang === 'ar' ? 'مثال: الرياض / عمّان / إربد' : 'e.g., Riyadh / Amman'}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                {lang === 'ar' ? 'الخدمة الطبية المقدمة *' : 'Exact Service Received *'}
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              >
                {MEDICAL_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.number}. {s.title[lang]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                {lang === 'ar' ? 'تاريخ الزيارة *' : 'Visit Date *'}
              </label>
              <input
                type="date"
                required
                value={visitDate}
                max={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setVisitDate(e.target.value)}
                className="font-mono-num mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                {lang === 'ar' ? 'الرقم المرجعي للحجز (اختياري للتوثيق)' : 'Booking Ref Code (Optional for Verification)'}
              </label>
              <input
                type="text"
                dir="ltr"
                value={bookingRef}
                onChange={(e) => setBookingRef(e.target.value)}
                placeholder="MA-2026-XXXX"
                className="font-mono-num mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
              />
            </div>
          </div>

          {/* 4 Criteria Star Selectors */}
          <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
            {REVIEW_CRITERIA.map((crit) => (
              <div key={crit.key} className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-800">{crit.label[lang]}</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatings((prev) => ({...prev, [crit.key]: star}))}
                      aria-label={`${crit.label.en} ${star} stars`}
                      className="cursor-pointer"
                    >
                      <Star
                        className={`h-4 w-4 ${
                          star <= ratings[crit.key] ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-700">
              {lang === 'ar'
                ? 'تفاصيل الاستشارة والفائدة السريرية المحققة * (15 حرفاً على الأقل)'
                : 'Specific Consultation Experience & Clinical Outcome * (min 15 chars)'}
            </label>
            <textarea
              rows={3}
              required
              minLength={15}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'اذكر سبب المراجعة، وضوح التشخيص، ونتيجة الخطة العلاجية أو المتابعة...'
                  : 'Describe your reason for visit, diagnostic clarity, and follow-up outcome...'
              }
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
            />
          </div>

          {errorMessage && (
            <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs text-rose-800">
              {errorMessage}
            </div>
          )}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="cursor-pointer rounded-lg bg-[#0B3C5D] px-5 py-2 text-sm font-semibold text-white hover:bg-[#082c44]"
            >
              {submitting
                ? lang === 'ar'
                  ? 'جاري الحفظ...'
                  : 'Submitting...'
                : lang === 'ar'
                  ? 'حفظ ونشر التقييم'
                  : 'Publish Structured Review'}
            </button>
          </div>
        </form>
      )}

      {/* Filter Controls */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1.5 w-fit">
          {(['all', 'riyadh', 'jordan', 'online'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setFilterMode(m)}
              className={`cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                filterMode === m ? 'bg-white text-[#0B3C5D] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {m === 'all' ? (lang === 'ar' ? 'الكل' : 'All') : modeLabel(m)}
            </button>
          ))}
        </div>

        <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#0B3C5D]"
          />
          <span>{lang === 'ar' ? 'عرض التقييمات الموثقة برقم حجز فقط' : 'Verified booking references only'}</span>
        </label>
      </div>

      {/* Reviews List or Authentic Empty State */}
      {loading ? (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          {lang === 'ar' ? 'جاري تحميل سجل التقييمات...' : 'Loading patient reviews...'}
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <ShieldCheck className="mx-auto h-8 w-8 text-[#0B3C5D]" />
          <h3 className="font-display mt-3 text-lg font-bold text-slate-900">
            {lang === 'ar'
              ? 'لا توجد تقييمات منشورة في هذا التصنيف حتى الآن'
              : 'No Published Patient Reviews in This Filter Yet'}
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-600">
            {lang === 'ar'
              ? 'نلتزم بعدم نشر أي آراء افتراضية أو عشوائية. تعرض هذه الصفحة فقط التقييمات الحقيقية المحددة بالخدمة وتاريخ الزيارة والمعايير السريرية الأربعة.'
              : 'We never publish synthetic or placeholder reviews. Only authentic patient experiences tied to a specific visit date, service, and our four clinical criteria appear here.'}
          </p>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#0B3C5D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082c44]"
          >
            <MessageSquarePlus className="h-4 w-4" />
            <span>{lang === 'ar' ? 'كن أول مراجع يشارك تجربته' : 'Share Your Visit Experience'}</span>
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredReviews.map((rev) => (
            <article key={rev.id} className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-mono-num text-sm font-bold text-slate-900">{rev.rating.toFixed(1)} / 5.0</span>
                  </div>
                  <span className="font-mono-num text-xs text-slate-500">
                    {lang === 'ar' ? 'تاريخ الزيارة:' : 'Visit:'} {rev.visitDate || rev.date}
                  </span>
                </div>

                <div className="mt-2.5 text-xs font-semibold text-[#0369A1]">
                  {rev.serviceName[lang]} · {modeLabel(rev.consultationType)}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-700">“{rev.comment[lang]}”</p>

                {rev.ratings && (
                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs">
                    {REVIEW_CRITERIA.map((c) => (
                      <div key={c.key} className="flex items-center justify-between gap-2">
                        <span className="truncate text-slate-600">{c.label[lang]}</span>
                        <span className="font-mono-num font-bold text-slate-900">{rev.ratings[c.key]}/5</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
                <div>
                  <div className="font-bold text-slate-900">{rev.patientName[lang]}</div>
                  <div className="text-slate-500">{rev.location[lang]}</div>
                </div>
                {rev.verified ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{lang === 'ar' ? 'موثق برقم حجز' : 'Verified Booking'}</span>
                  </span>
                ) : (
                  <span className="text-slate-500">
                    {lang === 'ar' ? 'تقييم مسجل' : 'Submitted Experience'}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
