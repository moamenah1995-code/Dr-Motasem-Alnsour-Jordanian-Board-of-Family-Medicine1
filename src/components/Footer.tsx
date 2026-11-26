import {IdCard, Info, Instagram, Mail, MapPin, MessageCircle, Phone, Youtube} from 'lucide-react';
import {
  CLINIC_DIRECT_PHONE,
  CLINIC_EMAIL,
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

interface FooterProps {
  lang: Lang;
  onNavigate: (page: PageId) => void;
  onToggleLang: () => void;
}

export function Footer({lang, onNavigate, onToggleLang}: FooterProps) {
  const t = UI_COPY[lang];

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-700">
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3.5">
              <img
                src={DOCTOR_PORTRAIT_PATH}
                alt={t.brandName}
                referrerPolicy="no-referrer"
                className="h-14 w-14 shrink-0 rounded-xl border border-slate-200 object-cover object-top"
              />
              <div>
                <div className="font-display text-xl font-bold text-[#0B3C5D]">{t.brandName}</div>
                <div className="mt-0.5 text-xs text-slate-500">
                  {lang === 'ar' ? 'أخصائي أول طب الأسرة · البورد الأردني' : 'Senior Specialist in Family Medicine · Jordanian Board'}
                </div>
              </div>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">{t.footer.aboutLine}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span>{lang === 'ar' ? 'البورد الأردني في طب الأسرة' : 'Jordanian Board of Family Medicine'}</span>
              <span aria-hidden="true">·</span>
              <span>{lang === 'ar' ? 'معتمد لدى SCFHS' : 'SCFHS Certified'}</span>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={onToggleLang}
                className="cursor-pointer font-semibold text-[#0B3C5D] hover:underline"
              >
                {t.nav.langSwitch}
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-slate-900">{t.footer.quickLinksTitle}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button type="button" onClick={() => onNavigate('about')} className="cursor-pointer hover:text-[#0B3C5D]">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('family-medicine')} className="cursor-pointer hover:text-[#0B3C5D]">
                  {t.nav.familyMedicine}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('services')} className="cursor-pointer hover:text-[#0B3C5D]">
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('knowledge')} className="cursor-pointer hover:text-[#0B3C5D]">
                  {t.nav.knowledge}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('assessments')} className="cursor-pointer hover:text-[#0B3C5D]">
                  {t.nav.assessments}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('reviews')} className="cursor-pointer hover:text-[#0B3C5D]">
                  {t.nav.reviews}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-slate-900">{t.footer.contactTitle}</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-emerald-700" />
                <a
                  href={CLINIC_KSA_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B3C5D]"
                >
                  {lang === 'ar' ? 'واتساب السعودية' : 'Saudi WhatsApp'}{' '}
                  <span dir="ltr" className="font-mono-num text-xs text-slate-500">
                    (+966570117358)
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-emerald-700" />
                <a
                  href={CLINIC_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B3C5D]"
                >
                  {lang === 'ar' ? 'واتساب الأردن' : 'Jordan WhatsApp'}{' '}
                  <span dir="ltr" className="font-mono-num text-xs text-slate-500">
                    (+962785483349)
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#0B3C5D]" />
                <a href={`tel:${CLINIC_DIRECT_PHONE}`} dir="ltr" className="font-mono-num hover:text-[#0B3C5D]">
                  +966 57 011 7358
                </a>
              </li>
              <li className="flex items-start gap-2 rounded-lg border border-amber-200/90 bg-amber-50/80 px-3 py-2 text-[11px] leading-relaxed text-amber-950">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700" />
                <span>{WHATSAPP_ONLY_CONTACT_NOTE[lang]}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#0B3C5D]" />
                <a href={`mailto:${CLINIC_EMAIL}`} className="break-all hover:text-[#0B3C5D]">
                  {CLINIC_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Youtube className="h-4 w-4 shrink-0 text-rose-600" />
                <a
                  href={DOCTOR_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-rose-700 hover:underline"
                >
                  {lang === 'ar' ? 'قناة اليوتيوب الطبية' : 'Official YouTube Channel'}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 shrink-0 text-pink-700" />
                <a
                  href={DOCTOR_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-pink-700 hover:underline"
                >
                  {lang === 'ar' ? 'حساب إنستغرام الطبي' : 'Official Instagram'}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <TikTokIcon className="h-4 w-4 shrink-0 text-slate-800" />
                <a
                  href={DOCTOR_TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-800 hover:underline"
                >
                  {lang === 'ar' ? 'حساب تيك توك الطبي' : 'Official TikTok'}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <IdCard className="h-4 w-4 shrink-0 text-[#0369A1]" />
                <a
                  href={DOCTOR_BUSINESS_CARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#0B3C5D] hover:underline"
                >
                  {lang === 'ar' ? 'بطاقة الطبيب الرقمية (HiHello)' : 'Digital Business Card (HiHello)'}
                </a>
              </li>
            </ul>

            <h4 className="mt-5 text-xs font-semibold text-slate-900">{t.footer.locationsTitle}</h4>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
              {t.footer.locations.map((loc) => (
                <li key={loc} className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <span>{loc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <p>{t.footer.legalNote}</p>
        </div>
      </div>
    </footer>
  );
}
