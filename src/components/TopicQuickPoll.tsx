import {BarChart3, CheckCircle2, RefreshCw, Vote} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import {KNOWLEDGE_CATEGORIES} from '../data/knowledgeData';
import {
  INITIAL_TOPIC_POLL,
  TOPIC_POLL_STATE_FALLBACK_KEY,
  TOPIC_POLL_STORAGE_KEY,
} from '../data/pollData';
import type {KnowledgeCategoryId, Lang, TopicPollState} from '../types/medical';

interface TopicQuickPollProps {
  lang: Lang;
}

function readStoredVote(pollId: string): string | null {
  try {
    const raw = window.localStorage.getItem(TOPIC_POLL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {pollId?: string; optionId?: string};
    if (parsed.pollId === pollId && typeof parsed.optionId === 'string') {
      return parsed.optionId;
    }
  } catch {
    // Ignore storage read failures
  }
  return null;
}

function writeStoredVote(pollId: string, optionId: string) {
  try {
    window.localStorage.setItem(TOPIC_POLL_STORAGE_KEY, JSON.stringify({pollId, optionId}));
  } catch {
    // Ignore storage write failures
  }
}

function readLocalFallbackPoll(): TopicPollState {
  try {
    const raw = window.localStorage.getItem(TOPIC_POLL_STATE_FALLBACK_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TopicPollState;
      if (parsed && parsed.pollId === INITIAL_TOPIC_POLL.pollId && Array.isArray(parsed.options)) {
        return parsed;
      }
    }
  } catch {
    // Ignore storage read failures
  }
  return INITIAL_TOPIC_POLL;
}

function writeLocalFallbackPoll(state: TopicPollState) {
  try {
    window.localStorage.setItem(TOPIC_POLL_STATE_FALLBACK_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage write failures
  }
}

export function TopicQuickPoll({lang}: TopicQuickPollProps) {
  const [poll, setPoll] = useState<TopicPollState>(INITIAL_TOPIC_POLL);
  const [votedOptionId, setVotedOptionId] = useState<string | null>(() =>
    typeof window !== 'undefined' ? readStoredVote(INITIAL_TOPIC_POLL.pollId) : null
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(votedOptionId);
  const [isEditingVote, setIsEditingVote] = useState<boolean>(false);
  const [showResultsPreview, setShowResultsPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [justVoted, setJustVoted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadPoll() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/poll');
        if (!res.ok) throw new Error('Poll fetch failed');
        const data = (await res.json()) as TopicPollState;
        if (!cancelled && data && Array.isArray(data.options)) {
          setPoll(data);
          writeLocalFallbackPoll(data);
        }
      } catch {
        if (!cancelled) {
          setPoll(readLocalFallbackPoll());
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }
    loadPoll();
    return () => {
      cancelled = true;
    };
  }, []);

  const getCategoryName = (catId: KnowledgeCategoryId) =>
    KNOWLEDGE_CATEGORIES.find((c) => c.id === catId)?.name[lang] ?? '';

  const maxVotes = useMemo(() => {
    return poll.options.reduce((max, opt) => (opt.votes > max ? opt.votes : max), 0);
  }, [poll.options]);

  const showingResults = (Boolean(votedOptionId) && !isEditingVote) || showResultsPreview;

  const formatVotesLabel = (count: number) => {
    if (lang === 'ar') {
      if (count === 0) return '0 أصوات';
      if (count === 1) return 'صوت واحد';
      if (count === 2) return 'صوتان';
      if (count <= 10) return `${count} أصوات`;
      return `${count} صوتاً`;
    }
    return count === 1 ? '1 vote' : `${count} votes`;
  };

  const handleSubmitVote = async () => {
    if (!selectedOptionId || isSubmitting) return;
    if (votedOptionId && selectedOptionId === votedOptionId) {
      setIsEditingVote(false);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/poll/vote', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          optionId: selectedOptionId,
          previousOptionId: votedOptionId ?? undefined,
        }),
      });

      if (!res.ok) {
        const errPayload = (await res.json().catch(() => ({}))) as {error?: string};
        throw new Error(errPayload.error || 'Failed to record vote');
      }

      const updated = (await res.json()) as TopicPollState;
      setPoll(updated);
      writeLocalFallbackPoll(updated);
      writeStoredVote(updated.pollId, selectedOptionId);
      setVotedOptionId(selectedOptionId);
      setIsEditingVote(false);
      setShowResultsPreview(false);
      setJustVoted(true);
    } catch {
      // Static hosting fallback (e.g. GitHub Pages without Express API)
      const updatedOptions = poll.options.map((opt) => {
        if (opt.id === selectedOptionId) {
          return {...opt, votes: opt.votes + 1};
        }
        if (votedOptionId && opt.id === votedOptionId && opt.votes > 0) {
          return {...opt, votes: opt.votes - 1};
        }
        return opt;
      });
      const nextState: TopicPollState = {
        ...poll,
        options: updatedOptions,
        totalVotes: updatedOptions.reduce((sum, opt) => sum + opt.votes, 0),
        updatedAt: new Date().toISOString(),
      };
      setPoll(nextState);
      writeLocalFallbackPoll(nextState);
      writeStoredVote(nextState.pollId, selectedOptionId);
      setVotedOptionId(selectedOptionId);
      setIsEditingVote(false);
      setShowResultsPreview(false);
      setJustVoted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartChangeVote = () => {
    setSelectedOptionId(votedOptionId);
    setIsEditingVote(true);
    setJustVoted(false);
    setErrorMessage(null);
  };

  return (
    <section
      aria-labelledby="knowledge-quick-poll-heading"
      className="mt-10 border-y border-slate-200 py-10"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Editorial Prompt & Context */}
        <div className="lg:col-span-5">
          <div className="text-xs font-semibold text-[#0369A1]">
            {lang === 'ar'
              ? 'استطلاع القراء · اختيار المقال الطبي القادم'
              : 'Patient Quick Poll · Next Blog Article'}
          </div>
          <h2
            id="knowledge-quick-poll-heading"
            className="font-display mt-2 text-2xl font-bold leading-snug text-slate-900"
          >
            {poll.question[lang]}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {lang === 'ar'
              ? 'صوتك يساعد د. معتصم النسور على تحديد الأولويات الصحية الأكثر أهمية للأسرة وإعداد دليل طبي مبسط وموثق حولها.'
              : 'Your vote helps Dr. Motasem Alnsour prioritize the most relevant clinical questions for upcoming evidence-based family guides.'}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="font-mono-num font-semibold text-slate-700">
              {isLoading
                ? lang === 'ar'
                  ? 'جاري التحميل...'
                  : 'Loading...'
                : formatVotesLabel(poll.totalVotes)}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {lang === 'ar' ? '5 موضوعات طبية مقترحة' : '5 clinical topics'}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {votedOptionId && !isEditingVote ? (
              <button
                type="button"
                onClick={handleStartChangeVote}
                className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1] whitespace-nowrap shrink-0"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>{lang === 'ar' ? 'تغيير تصويتي' : 'Change my vote'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setShowResultsPreview((prev) => !prev);
                  if (isEditingVote) {
                    setIsEditingVote(false);
                  }
                }}
                className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1] whitespace-nowrap shrink-0"
              >
                <BarChart3 className="h-3.5 w-3.5" />
                <span>
                  {showingResults
                    ? lang === 'ar'
                      ? 'العودة للتصويت'
                      : 'Back to voting'
                    : lang === 'ar'
                      ? 'عرض النتائج الحالية'
                      : 'View current results'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Poll Options / Results */}
        <div className="lg:col-span-7">
          {showingResults ? (
            <div className="space-y-3" aria-live="polite">
              {poll.options.map((opt) => {
                const pct =
                  poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
                const isUserChoice = opt.id === votedOptionId;
                const isLeading = maxVotes > 0 && opt.votes === maxVotes;

                return (
                  <div
                    key={opt.id}
                    className={`rounded-xl border p-4 transition-colors ${
                      isUserChoice
                        ? 'border-[#0B3C5D] bg-sky-50/50'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-[#0369A1]">
                            {getCategoryName(opt.categoryId)}
                          </span>
                          {isLeading && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="font-semibold text-emerald-700">
                                {lang === 'ar' ? 'الأعلى تصويتاً' : 'Leading topic'}
                              </span>
                            </>
                          )}
                          {isUserChoice && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="inline-flex items-center gap-1 font-semibold text-[#0B3C5D]">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>{lang === 'ar' ? 'اختيارك' : 'Your vote'}</span>
                              </span>
                            </>
                          )}
                        </div>
                        <div className="font-display mt-1 text-sm font-bold leading-snug text-slate-900 sm:text-base">
                          {opt.title[lang]}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-baseline gap-2 sm:text-end">
                        <span className="font-mono-num text-base font-bold text-slate-900">
                          {pct}%
                        </span>
                        <span className="font-mono-num text-xs text-slate-500">
                          ({formatVotesLabel(opt.votes)})
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 overflow-hidden rounded-full bg-slate-100">
                      <svg
                        viewBox="0 0 100 6"
                        preserveAspectRatio="none"
                        className="block h-2 w-full"
                        aria-hidden="true"
                      >
                        <rect
                          x={lang === 'ar' ? 100 - pct : 0}
                          y={0}
                          width={pct}
                          height={6}
                          rx={3}
                          className={
                            isUserChoice
                              ? 'fill-[#0B3C5D]'
                              : isLeading
                                ? 'fill-[#0369A1]'
                                : 'fill-slate-400'
                          }
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}

              {justVoted && (
                <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-sm text-emerald-900">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  <span>
                    {lang === 'ar'
                      ? 'تم تسجيل صوتك بنجاح. شكراً لمشاركتك في تحديد المقال الطبي القادم.'
                      : 'Your vote has been recorded. Thank you for helping shape our next clinical article.'}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div
                role="radiogroup"
                aria-label={poll.question[lang]}
                className="space-y-3"
              >
                {poll.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setSelectedOptionId(opt.id);
                        setErrorMessage(null);
                      }}
                      className={`flex w-full cursor-pointer items-start gap-3.5 rounded-xl border p-4 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1] ${
                        isSelected
                          ? 'border-[#0B3C5D] bg-sky-50/50'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isSelected
                            ? 'border-[#0B3C5D] bg-[#0B3C5D]'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-[#0369A1]">
                          {getCategoryName(opt.categoryId)}
                        </span>
                        <span className="font-display mt-0.5 block text-sm font-bold leading-snug text-slate-900 sm:text-base">
                          {opt.title[lang]}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-slate-600 sm:text-sm">
                          {opt.description[lang]}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {errorMessage && (
                <p className="mt-3 text-sm text-rose-700" role="alert">
                  {errorMessage}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={!selectedOptionId || isSubmitting}
                  onClick={handleSubmitVote}
                  aria-busy={isSubmitting}
                  className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0B3C5D] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#082c44] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1] whitespace-nowrap shrink-0"
                >
                  <Vote className="h-4 w-4" />
                  <span>
                    {isSubmitting
                      ? lang === 'ar'
                        ? 'جاري تسجيل التصويت...'
                        : 'Submitting vote...'
                      : isEditingVote
                        ? lang === 'ar'
                          ? 'تحديث تصويتي'
                          : 'Update Vote'
                        : lang === 'ar'
                          ? 'تصويت للموضوع'
                          : 'Submit Vote'}
                  </span>
                </button>

                {isEditingVote && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingVote(false);
                      setSelectedOptionId(votedOptionId);
                    }}
                    className="min-h-[40px] cursor-pointer px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 whitespace-nowrap shrink-0"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
