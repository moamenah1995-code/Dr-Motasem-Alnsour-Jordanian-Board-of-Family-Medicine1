import {
  AlertTriangle,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  IdCard,
  Info,
  Instagram,
  Loader2,
  MessageCircle,
  Phone,
  Send,
  Stethoscope,
  X,
  Youtube,
} from 'lucide-react';
import {useState, type FormEvent} from 'react';
import {
  CLINIC_DIRECT_PHONE,
  CLINIC_KSA_WHATSAPP_URL,
  CLINIC_WHATSAPP_URL,
  DOCTOR_BUSINESS_CARD_URL,
  DOCTOR_CHAT_FAQ_ANSWERS,
  DOCTOR_DIRECT_CONTACT_NOTE,
  DOCTOR_INSTAGRAM_URL,
  DOCTOR_TIKTOK_URL,
  DOCTOR_YOUTUBE_URL,
  WHATSAPP_ONLY_CONTACT_NOTE,
} from '../data/doctorChatKnowledge';
import {MEDICAL_ARTICLES} from '../data/knowledgeData';
import {MEDICAL_SERVICES} from '../data/servicesData';
import {UI_COPY} from '../data/translations';
import type {AiAssistantResponse, ConsultationMode, Lang} from '../types/medical';
import {TikTokIcon} from './SocialIcons';

interface AiAssistantDrawerProps {
  lang: Lang;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenService: (serviceId: string) => void;
  onOpenArticle: (articleId: string) => void;
  onBookService: (serviceId: string, mode?: ConsultationMode) => void;
}

interface ChatEntry {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  structured?: AiAssistantResponse;
}

export function AiAssistantDrawer({
  lang,
  isOpen,
  onOpen,
  onClose,
  onOpenService,
  onOpenArticle,
  onBookService,
}: AiAssistantDrawerProps) {
  const t = UI_COPY[lang].aiAssistant;
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [openFaqId, setOpenFaqId] = useState<string | null>(DOCTOR_CHAT_FAQ_ANSWERS[0]?.id ?? null);
  const [showVerifiedPanel, setShowVerifiedPanel] = useState(true);

  const sendQuestion = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatEntry = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setShowVerifiedPanel(false);
    setInput('');
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          message: trimmed,
          lang,
          history: nextHistory.slice(-6).map((m) => ({role: m.role, text: m.text})),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || (lang === 'ar' ? 'تعذر الاتصال بالمساعد الطبي.' : 'Unable to reach AI assistant.'));
        return;
      }

      const structured = data as AiAssistantResponse;
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: structured.reply,
          structured,
        },
      ]);
    } catch {
      setErrorMsg(lang === 'ar' ? 'حدث خطأ في الشبكة.' : 'Network error connecting to AI assistant.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  return (
    <>
      {/* Compact Floating Launcher */}
      {!isOpen && (
        <button
          type="button"
          onClick={onOpen}
          className="fixed bottom-4 end-4 z-40 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#0B3C5D]/20 bg-[#0B3C5D] px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-colors hover:bg-[#082c44] sm:bottom-6 sm:end-6 sm:text-sm"
        >
          <Stethoscope className="h-4 w-4 text-sky-200" />
          <span>{t.title}</span>
        </button>
      )}

      {/* Slide-Over Clinical Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/35 backdrop-blur-[1px]">
          <div
            role="dialog"
            aria-label={t.title}
            className="flex h-full w-full max-w-lg flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-[#0B3C5D] px-5 py-4 text-white">
              <div className="flex items-center gap-2.5">
                <Stethoscope className="h-5 w-5 text-sky-200" />
                <div>
                  <h2 className="font-display text-base font-bold">{t.title}</h2>
                  <p className="text-xs text-sky-100">{t.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowVerifiedPanel((prev) => !prev)}
                    className="cursor-pointer rounded-lg border border-white/25 px-2.5 py-1 text-[11px] font-semibold text-sky-100 hover:bg-white/10 hover:text-white"
                  >
                    {showVerifiedPanel
                      ? lang === 'ar'
                        ? 'العودة للمحادثة'
                        : 'Back to Chat'
                      : t.backToGuide}
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close AI Assistant"
                  className="cursor-pointer rounded-lg p-1.5 text-sky-100 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-2.5 text-xs leading-relaxed text-slate-600">
              {t.disclaimer}
            </div>

            {/* Chat Body & Verified Doctor Answers */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {(messages.length === 0 || showVerifiedPanel) && (
                <div className="space-y-4">
                  {/* Verified Doctor Answers */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0B3C5D]">
                      <CheckCircle2 className="h-4 w-4 text-[#0F766E]" />
                      <span>{t.verifiedAnswersTitle}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">{t.verifiedAnswersHint}</p>

                    <div className="mt-3 space-y-2">
                      {DOCTOR_CHAT_FAQ_ANSWERS.map((item) => {
                        const isExpanded = openFaqId === item.id;
                        return (
                          <div
                            key={item.id}
                            className="overflow-hidden rounded-lg border border-slate-200 bg-white"
                          >
                            <button
                              type="button"
                              onClick={() => setOpenFaqId(isExpanded ? null : item.id)}
                              className="flex w-full cursor-pointer items-center justify-between gap-3 px-3.5 py-2.5 text-start hover:bg-slate-50"
                            >
                              <div>
                                <div className="text-[11px] font-semibold text-[#0369A1]">
                                  {item.topic[lang]}
                                </div>
                                <div className="text-xs font-bold text-slate-900">{item.question[lang]}</div>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 shrink-0 text-slate-500" />
                              ) : (
                                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="space-y-3 border-t border-slate-100 bg-slate-50/40 px-3.5 py-3">
                                <p className="text-xs leading-relaxed text-slate-700">{item.answer[lang]}</p>
                                <div className="rounded-md border border-[#0F766E]/25 bg-teal-50/60 px-3 py-2 text-[11px] leading-relaxed text-[#0F766E]">
                                  {DOCTOR_DIRECT_CONTACT_NOTE[lang]}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      onBookService(item.recommendedServiceId, 'online');
                                      onClose();
                                    }}
                                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0B3C5D] px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-[#082c44]"
                                  >
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{t.bookNow}</span>
                                  </button>
                                  <a
                                    href={CLINIC_KSA_WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#0F766E]/30 bg-white px-3 py-1.5 text-[11px] font-semibold text-[#0F766E] hover:bg-teal-50"
                                  >
                                    <MessageCircle className="h-3.5 w-3.5" />
                                    <span>{t.whatsappKsaDirect}</span>
                                  </a>
                                  <a
                                    href={CLINIC_WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#0F766E]/30 bg-white px-3 py-1.5 text-[11px] font-semibold text-[#0F766E] hover:bg-teal-50"
                                  >
                                    <MessageCircle className="h-3.5 w-3.5" />
                                    <span>{t.whatsappJoDirect}</span>
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Official YouTube, Instagram, TikTok & HiHello Digital Business Card Links */}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <a
                        href={DOCTOR_YOUTUBE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-2 text-[11px] font-semibold text-rose-700 hover:bg-rose-50"
                      >
                        <Youtube className="h-3.5 w-3.5" />
                        <span>{lang === 'ar' ? 'قناة اليوتيوب' : 'YouTube Channel'}</span>
                      </a>
                      <a
                        href={DOCTOR_INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-pink-200 bg-white px-3 py-2 text-[11px] font-semibold text-pink-700 hover:bg-pink-50"
                      >
                        <Instagram className="h-3.5 w-3.5" />
                        <span>{lang === 'ar' ? 'إنستغرام' : 'Instagram'}</span>
                      </a>
                      <a
                        href={DOCTOR_TIKTOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-800 hover:bg-slate-100"
                      >
                        <TikTokIcon className="h-3.5 w-3.5" />
                        <span>{lang === 'ar' ? 'تيك توك' : 'TikTok'}</span>
                      </a>
                      <a
                        href={DOCTOR_BUSINESS_CARD_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-sky-200 bg-white px-3 py-2 text-[11px] font-semibold text-[#0B3C5D] hover:bg-sky-50"
                      >
                        <IdCard className="h-3.5 w-3.5" />
                        <span>{lang === 'ar' ? 'البطاقة الرقمية' : 'Business Card'}</span>
                      </a>
                    </div>
                  </div>

                  {/* Quick Chat Prompts */}
                  {messages.length === 0 && (
                    <div>
                      <div className="text-xs font-semibold text-slate-500">
                        {lang === 'ar' ? 'أو اسأل المساعد الطبي مباشرة:' : 'Or ask the Smart Assistant directly:'}
                      </div>
                      <div className="mt-2 flex flex-col gap-2">
                        {t.quickPrompts.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => sendQuestion(prompt)}
                            className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-start text-xs font-medium text-slate-800 hover:border-[#0369A1] hover:bg-slate-50"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Live Chat Thread */}
              {!showVerifiedPanel &&
                messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`max-w-[92%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#0B3C5D] text-white'
                          : 'border border-slate-200 bg-slate-50 text-slate-800'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>

                    {msg.structured && (
                      <div className="mt-2.5 w-full space-y-2.5">
                        {msg.structured.urgencyLevel === 'urgent' && (
                          <div className="flex items-start gap-2 rounded-lg border border-rose-300 bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-900">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
                            <span>{t.urgentNotice}</span>
                          </div>
                        )}

                        {/* Mandatory Clinical Contact Guidance Box */}
                        <div className="rounded-xl border border-[#0F766E]/30 bg-teal-50/70 p-3.5">
                          <div className="text-xs font-bold text-[#0F766E]">{t.doctorGuidanceTitle}</div>
                          <p className="mt-1 text-xs leading-relaxed text-slate-700">
                            {msg.structured.doctorAdviceNote || t.doctorGuidanceDefault}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                onBookService(
                                  msg.structured?.suggestedServiceIds[0] ?? MEDICAL_SERVICES[0].id,
                                  'online'
                                );
                                onClose();
                              }}
                              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0B3C5D] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#082c44]"
                            >
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{t.bookNow}</span>
                            </button>
                            <a
                              href={CLINIC_KSA_WHATSAPP_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#0F766E]/35 bg-white px-3 py-1.5 text-xs font-semibold text-[#0F766E] hover:bg-teal-50"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span>{t.whatsappKsaDirect}</span>
                            </a>
                            <a
                              href={CLINIC_WHATSAPP_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#0F766E]/35 bg-white px-3 py-1.5 text-xs font-semibold text-[#0F766E] hover:bg-teal-50"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span>{t.whatsappJoDirect}</span>
                            </a>
                            <a
                              href={`tel:${CLINIC_DIRECT_PHONE}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                            >
                              <Phone className="h-3.5 w-3.5" />
                              <span>{t.callDirect}</span>
                            </a>
                          </div>
                          <div className="mt-2.5 flex items-start gap-1.5 rounded-lg border border-amber-200/90 bg-amber-50/70 px-2.5 py-2 text-[11px] leading-relaxed text-amber-950">
                            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700" />
                            <span>{WHATSAPP_ONLY_CONTACT_NOTE[lang]}</span>
                          </div>
                        </div>

                        {msg.structured.suggestedServiceIds.length > 0 && (
                          <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                            <div className="text-xs font-bold text-[#0B3C5D]">{t.suggestedServices}</div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {msg.structured.suggestedServiceIds.map((sid) => {
                                const srv = MEDICAL_SERVICES.find((s) => s.id === sid);
                                if (!srv) return null;
                                return (
                                  <button
                                    key={sid}
                                    type="button"
                                    onClick={() => {
                                      onOpenService(sid);
                                      onClose();
                                    }}
                                    className="cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:border-[#0369A1]"
                                  >
                                    {srv.title[lang]}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {msg.structured.suggestedArticleIds.length > 0 && (
                          <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                              <BookOpen className="h-3.5 w-3.5 text-[#0369A1]" />
                              <span>{t.suggestedArticles}</span>
                            </div>
                            <div className="mt-2 space-y-1.5">
                              {msg.structured.suggestedArticleIds.map((aid) => {
                                const art = MEDICAL_ARTICLES.find((a) => a.id === aid);
                                if (!art) return null;
                                return (
                                  <button
                                    key={aid}
                                    type="button"
                                    onClick={() => {
                                      onOpenArticle(aid);
                                      onClose();
                                    }}
                                    className="block w-full cursor-pointer text-start text-xs font-medium text-[#0369A1] hover:underline"
                                  >
                                    {art.title[lang]}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin text-[#0B3C5D]" />
                  <span>{t.thinking}</span>
                </div>
              )}

              {errorMsg && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs text-rose-800">
                  {errorMsg}
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#0369A1] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0B3C5D] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#082c44] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{t.send}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
