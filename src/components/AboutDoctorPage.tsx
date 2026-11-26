import {
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  GraduationCap,
  IdCard,
  Info,
  Instagram,
  MessageCircle,
  ShieldCheck,
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
import type {Lang, PageId} from '../types/medical';
import {TikTokIcon} from './SocialIcons';

interface AboutDoctorPageProps {
  lang: Lang;
  onNavigate: (page: PageId) => void;
}

export function AboutDoctorPage({lang, onNavigate}: AboutDoctorPageProps) {
  const t = UI_COPY[lang].about;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      {/* Top Biography Split */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <div className="text-xs font-semibold text-[#0369A1]">{t.kicker}</div>
          <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" style={{textWrap: 'balance'}}>
            {t.title}
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
            {t.bioParagraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('booking')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#0B3C5D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#082c44]"
            >
              <Calendar className="h-4 w-4" />
              <span>{lang === 'ar' ? 'احجز استشارة أونلاين' : 'Book Online Consultation'}</span>
            </button>
            <a
              href={CLINIC_KSA_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-700/30 bg-emerald-50/70 px-4 py-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-100/70"
            >
              <MessageCircle className="h-4 w-4 text-emerald-700" />
              <span>{lang === 'ar' ? 'واتساب السعودية (+966570117358)' : 'KSA WhatsApp (+966570117358)'}</span>
            </a>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="cursor-pointer rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              {lang === 'ar' ? 'عرض الخدمات الطبية' : 'Explore Medical Services'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img
              src={DOCTOR_PORTRAIT_PATH}
              alt={lang === 'ar' ? 'د. معتصم النسور' : 'Dr. Motasem Alnsour'}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover object-top"
            />
            <div className="border-t border-slate-100 bg-slate-50 p-5">
              <div className="font-display text-base font-bold text-slate-900">
                {lang === 'ar' ? 'د. معتصم النسور' : 'Dr. Motasem Alnsour'}
              </div>
              <div className="mt-1 text-xs text-slate-600">
                {lang === 'ar'
                  ? 'أخصائي أول طب الأسرة · البورد الأردني · معتمد SCFHS'
                  : 'Senior Specialist in Family Medicine · Jordanian Board · SCFHS Certified'}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2 border-t border-slate-200 pt-4 sm:grid-cols-2">
                <a
                  href={DOCTOR_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50"
                >
                  <Youtube className="h-4 w-4" />
                  <span>{lang === 'ar' ? 'قناة اليوتيوب' : 'YouTube Channel'}</span>
                </a>
                <a
                  href={DOCTOR_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-pink-200 bg-white px-3 py-2 text-xs font-semibold text-pink-700 hover:bg-pink-50"
                >
                  <Instagram className="h-4 w-4" />
                  <span>{lang === 'ar' ? 'إنستغرام' : 'Instagram'}</span>
                </a>
                <a
                  href={DOCTOR_TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  <TikTokIcon className="h-4 w-4" />
                  <span>{lang === 'ar' ? 'تيك توك' : 'TikTok'}</span>
                </a>
                <a
                  href={DOCTOR_BUSINESS_CARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-sky-200 bg-white px-3 py-2 text-xs font-semibold text-[#0B3C5D] hover:bg-sky-50"
                >
                  <IdCard className="h-4 w-4" />
                  <span>{lang === 'ar' ? 'بطاقة الطبيب الرقمية' : 'Digital Business Card'}</span>
                </a>
                <a
                  href={CLINIC_KSA_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span dir="ltr">+966570117358</span>
                </a>
                <a
                  href={CLINIC_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span dir="ltr">+962785483349</span>
                </a>
              </div>
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200/90 bg-amber-50/70 px-3 py-2 text-[11px] leading-relaxed text-amber-950">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700" />
                <span>{WHATSAPP_ONLY_CONTACT_NOTE[lang]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Qualifications & Accreditations */}
      <section className="mt-14 border-t border-slate-200 pt-12">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="h-5 w-5 text-[#0B3C5D]" />
          <h2 className="font-display text-2xl font-bold text-slate-900">{t.qualificationsTitle}</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.qualifications.map((q) => (
            <div key={q.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold">
                <span>{q.year}</span>
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="font-display mt-3 text-lg font-bold text-slate-900">{q.title}</h3>
              <div className="mt-1 text-xs font-medium text-[#0369A1]">{q.org}</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{q.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Clinical Experience & Institutions */}
      <section className="mt-14 border-t border-slate-200 pt-12">
        <div className="flex items-center gap-2.5">
          <Building2 className="h-5 w-5 text-[#0B3C5D]" />
          <h2 className="font-display text-2xl font-bold text-slate-900">{t.experienceTitle}</h2>
        </div>

        <div className="mt-6 space-y-4">
          {t.experiences.map((exp, idx) => (
            <div
              key={exp.institution}
              className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-6 md:grid-cols-12"
            >
              <div className="md:col-span-4">
                <div className="font-mono-num text-xs font-semibold text-[#0369A1]">
                  0{idx + 1} · {exp.period}
                </div>
                <h3 className="font-display mt-1.5 text-lg font-bold text-slate-900">{exp.role}</h3>
                <div className="mt-1 text-sm font-medium text-slate-700">{exp.institution}</div>
              </div>
              <div className="flex items-center md:col-span-8">
                <p className="text-sm leading-relaxed text-slate-600">{exp.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements & Practice Pillars */}
      <section className="mt-14 border-t border-slate-200 pt-12">
        <div className="flex items-center gap-2.5">
          <Award className="h-5 w-5 text-[#0B3C5D]" />
          <h2 className="font-display text-2xl font-bold text-slate-900">{t.achievementsTitle}</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.achievements.map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="font-mono-num text-3xl font-bold text-[#0B3C5D]">{item.metric}</div>
              <div className="font-display mt-2 text-base font-bold text-slate-900">{item.title}</div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.desc}</p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{lang === 'ar' ? 'ممارسة سريرية موثقة' : 'Verified Clinical Practice'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
