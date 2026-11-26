import {
  Calendar,
  Globe,
  IdCard,
  Info,
  Instagram,
  MessageCircle,
  Phone,
  ShieldCheck,
  Youtube,
} from 'lucide-react';
import {useEffect, useState} from 'react';
import {
  CLINIC_DIRECT_PHONE,
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
import {TikTokIcon} from './SocialIcons';

interface HeroSectionProps {
  lang: Lang;
  onToggleLang: () => void;
  onNavigate: (page: PageId) => void;
  onStartBooking: (mode?: ConsultationMode) => void;
}

function AnimatedCounter({target, suffix}: {target: number; suffix: string}) {
  const [count, setCount] = useState(target);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    let frame = 0;
    const totalFrames = 28;
    setCount(0);
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (frame >= totalFrames) {
        window.clearInterval(timer);
      }
    }, 24);

    return () => window.clearInterval(timer);
  }, [target]);

  return (
    <span className="font-mono-num tabular-nums">
      {count.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

export function HeroSection({lang, onToggleLang, onNavigate, onStartBooking}: HeroSectionProps) {
  const t = UI_COPY[lang];
  const [imgError, setImgError] = useState(false);

  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:py-10">
        {/* Clean Institutional Utility Strip with Language Switch */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-3.5 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-2">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700" />
            <span>{t.hero.credentialsLine}</span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('reviews')}
              className="cursor-pointer whitespace-nowrap font-medium text-slate-600 hover:text-[#0B3C5D]"
            >
              {t.nav.reviews}
            </button>
            <span aria-hidden="true" className="text-slate-300">
              |
            </span>
            <button
              type="button"
              onClick={onToggleLang}
              className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap font-semibold text-[#0B3C5D] hover:text-[#0369A1]"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{t.nav.langSwitch}</span>
            </button>
          </div>
        </div>

        {/* Balanced 2-Column Split Hero */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-center lg:col-span-7">
            <h1
              className="font-display font-bold tracking-tight text-slate-900"
              style={{
                fontSize: 'clamp(2.1rem, 4vw, 3.35rem)',
                lineHeight: lang === 'ar' ? 1.25 : 1.12,
                textWrap: 'balance',
              }}
            >
              {t.hero.headline}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {t.hero.subheadline}
            </p>

            {/* Primary CTA + Saudi & Jordan WhatsApp + Call */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onStartBooking('online')}
                className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-[#0B3C5D] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#082c44] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
              >
                <Calendar className="h-4 w-4" />
                <span>{t.hero.primaryCta}</span>
              </button>

              <a
                href={CLINIC_KSA_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-lg border border-emerald-700/30 bg-emerald-50/70 px-4 py-3.5 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-100/70"
              >
                <MessageCircle className="h-4 w-4 text-emerald-700" />
                <span>{t.hero.whatsappKsaCta}</span>
              </a>

              <a
                href={CLINIC_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-lg border border-emerald-700/30 bg-white px-4 py-3.5 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50/70"
              >
                <MessageCircle className="h-4 w-4 text-emerald-700" />
                <span>{t.hero.whatsappJoCta}</span>
              </a>

              <a
                href={`tel:${CLINIC_DIRECT_PHONE}`}
                className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                <Phone className="h-4 w-4 text-[#0B3C5D]" />
                <span>{t.hero.callCta}</span>
              </a>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200/90 bg-amber-50/70 px-3.5 py-2.5 text-xs leading-relaxed text-amber-950">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <span>{WHATSAPP_ONLY_CONTACT_NOTE[lang]}</span>
            </div>

            {/* Institutional Proof Strip */}
            <div className="mt-7 grid grid-cols-1 gap-3 border-t border-slate-200 pt-5 text-xs text-slate-600 sm:grid-cols-3">
              <div>
                <div className="font-semibold text-slate-900">
                  {lang === 'ar' ? 'مستشفى د. سليمان الحبيب' : 'Dr. Sulaiman Al Habib Hospital'}
                </div>
                <div className="mt-0.5 text-slate-500">
                  {lang === 'ar' ? 'خبرة سريرية — الرياض' : 'Clinical Experience — Riyadh'}
                </div>
              </div>
              <div>
                <div className="font-semibold text-slate-900">
                  {lang === 'ar' ? 'وزارة الصحة الأردنية' : 'Jordanian Ministry of Health'}
                </div>
                <div className="mt-0.5 text-slate-500">
                  {lang === 'ar' ? 'خبرة سابقة في الرعاية الأولية' : 'Primary & Family Care Background'}
                </div>
              </div>
              <div>
                <div className="font-semibold text-slate-900">
                  {lang === 'ar' ? 'استشارات طبية أونلاين فقط' : 'Online Consultations Only'}
                </div>
                <div className="mt-0.5 text-slate-500">
                  {lang === 'ar' ? 'متاحة يومياً · السعودية والأردن والعالم' : 'Available Daily · KSA, Jordan & Worldwide'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Clear Doctor Portrait Card + Official Links */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {!imgError ? (
                <img
                  src={DOCTOR_PORTRAIT_PATH}
                  alt={
                    lang === 'ar'
                      ? 'د. معتصم النسور — أخصائي أول طب الأسرة والبورد الأردني'
                      : 'Dr. Motasem Alnsour — Jordanian Board of Family Medicine'
                  }
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-auto object-cover object-top"
                />
              ) : (
                <div className="flex aspect-[4/5] flex-col items-center justify-center bg-slate-100 p-8 text-center">
                  <div className="font-display text-2xl font-bold text-[#0B3C5D]">{t.hero.doctorCaptionTitle}</div>
                  <p className="mt-2 text-sm text-slate-600">{t.hero.doctorCaptionSub}</p>
                </div>
              )}

              {/* Direct Doctor Social Channels & Digital Business Card Strip */}
              <div className="grid grid-cols-2 border-t border-slate-200 bg-slate-50/90">
                <a
                  href={DOCTOR_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-b border-e border-slate-200 px-3 py-2.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-50/60"
                >
                  <Youtube className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t.hero.youtubeCta}</span>
                </a>
                <a
                  href={DOCTOR_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-b border-slate-200 px-3 py-2.5 text-xs font-semibold text-pink-700 transition-colors hover:bg-pink-50/60"
                >
                  <Instagram className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t.hero.instagramCta}</span>
                </a>
                <a
                  href={DOCTOR_TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-e border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100/80"
                >
                  <TikTokIcon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t.hero.tiktokCta}</span>
                </a>
                <a
                  href={DOCTOR_BUSINESS_CARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-[#0B3C5D] transition-colors hover:bg-sky-50/70"
                >
                  <IdCard className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t.hero.businessCardCta}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Animated Clinical Statistics Strip */}
        <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-5 md:grid-cols-4 md:gap-6">
          {t.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col justify-between border-slate-100 md:border-e md:pe-4 md:last:border-e-0">
              <div className="text-2xl font-bold text-[#0B3C5D] sm:text-3xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
