import {
  Calendar,
  Globe,
  Info,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import {useEffect, useState} from 'react';
import {
  CLINIC_KSA_WHATSAPP_URL,
  CLINIC_WHATSAPP_URL,
  DOCTOR_PORTRAIT_PATH,
  WHATSAPP_ONLY_CONTACT_NOTE,
} from '../data/doctorChatKnowledge';
import {UI_COPY} from '../data/translations';
import type {ConsultationMode, Lang, PageId} from '../types/medical';

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
    const totalFrames = 24;
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
      <div className="mx-auto max-w-[1200px] px-4 py-7 sm:px-6 lg:py-9">
        {/* Clean Institutional Utility Strip with Language Switch */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-3 text-xs text-slate-600">
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
            <div className="text-xs font-semibold text-[#0369A1]">
              {lang === 'ar'
                ? 'د. معتصم النسور · أخصائي أول طب الأسرة'
                : 'Dr. Motasem Alnsour · Senior Specialist in Family Medicine'}
            </div>

            <h1 className="font-display mt-2 text-3xl font-bold leading-tight tracking-tight text-slate-900 text-balance sm:text-4xl lg:text-[2.75rem]">
              {t.hero.headline}
            </h1>

            <p className="mt-3.5 max-w-2xl text-base leading-relaxed text-slate-600">
              {t.hero.subheadline}
            </p>

            {/* Primary CTA + Saudi & Jordan WhatsApp */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onStartBooking('online')}
                className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-[#0B3C5D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#082c44] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
              >
                <Calendar className="h-4 w-4" />
                <span>{t.hero.primaryCta}</span>
              </button>

              <a
                href={CLINIC_KSA_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-lg border border-emerald-700/30 bg-emerald-50/70 px-4 py-3 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-100/70"
              >
                <MessageCircle className="h-4 w-4 text-emerald-700" />
                <span>{t.hero.whatsappKsaCta}</span>
              </a>

              <a
                href={CLINIC_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-lg border border-emerald-700/30 bg-white px-4 py-3 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50/70"
              >
                <MessageCircle className="h-4 w-4 text-emerald-700" />
                <span>{t.hero.whatsappJoCta}</span>
              </a>
            </div>

            <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700" />
              <span>{WHATSAPP_ONLY_CONTACT_NOTE[lang]}</span>
            </p>
          </div>

          {/* Right Column: Clean Doctor Portrait Card */}
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
                  className="max-h-[340px] w-full object-cover object-top"
                />
              ) : (
                <div className="flex aspect-[4/3] flex-col items-center justify-center bg-slate-100 p-6 text-center">
                  <div className="font-display text-2xl font-bold text-[#0B3C5D]">{t.hero.doctorCaptionTitle}</div>
                  <p className="mt-2 text-sm text-slate-600">{t.hero.doctorCaptionSub}</p>
                </div>
              )}

              <div className="border-t border-slate-200 bg-slate-50/90 px-5 py-3.5">
                <div className="font-display text-base font-bold text-slate-900">{t.hero.doctorCaptionTitle}</div>
                <div className="mt-0.5 text-xs text-slate-600">{t.hero.doctorCaptionSub}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Clinical Overview Strip */}
        <div className="mt-7 grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5 md:grid-cols-4 md:gap-6">
          {t.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col justify-between border-slate-100 md:border-e md:pe-4 md:last:border-e-0"
            >
              <div className="text-2xl font-bold text-[#0B3C5D]">
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
