import {Menu, X} from 'lucide-react';
import {useState} from 'react';
import {UI_COPY} from '../data/translations';
import type {Lang, PageId} from '../types/medical';

interface HeaderProps {
  lang: Lang;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onToggleLang: () => void;
}

export function Header({lang, activePage, onNavigate, onToggleLang}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = UI_COPY[lang];

  const navItems: {id: PageId; label: string}[] = [
    {id: 'about', label: t.nav.about},
    {id: 'family-medicine', label: t.nav.familyMedicine},
    {id: 'services', label: t.nav.services},
    {id: 'knowledge', label: t.nav.knowledge},
    {id: 'assessments', label: t.nav.assessments},
  ];

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
        {/* Zone 1: Clean single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="font-display cursor-pointer text-lg font-bold tracking-tight text-[#0B3C5D] transition-colors hover:text-[#0369A1] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0369A1]"
        >
          {t.brandName}
        </button>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`cursor-pointer border-b-2 py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0369A1] ${
                  isActive
                    ? 'border-[#0B3C5D] text-[#0B3C5D]'
                    : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary CTA Action (plus mobile menu button on small viewports) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('booking')}
            className="cursor-pointer rounded-lg bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#082c44] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
          >
            {t.nav.bookCta}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`rounded-lg px-3 py-2.5 text-start text-sm font-medium ${
                activePage === 'home' ? 'bg-slate-100 text-[#0B3C5D]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`rounded-lg px-3 py-2.5 text-start text-sm font-medium ${
                  activePage === item.id ? 'bg-slate-100 text-[#0B3C5D]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNav('reviews')}
              className={`rounded-lg px-3 py-2.5 text-start text-sm font-medium ${
                activePage === 'reviews' ? 'bg-slate-100 text-[#0B3C5D]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t.nav.reviews}
            </button>
            <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => {
                  onToggleLang();
                  setMobileOpen(false);
                }}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {t.nav.langSwitch}
              </button>
              <button
                type="button"
                onClick={() => handleNav('booking')}
                className="rounded-lg bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white"
              >
                {t.nav.bookCta}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
