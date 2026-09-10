import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLanguage, useTranslation } from '../i18n';
import { ChevronDown, Check, Search } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'hero' | 'light' | 'dark';
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'light',
  compact = false
}) => {
  const { language, setLanguage, currentLanguage, availableLanguages } = useLanguage();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Focus search input when opened
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearch('');
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const filteredLanguages = useMemo(() => {
    if (!search.trim()) return availableLanguages;
    const s = search.toLowerCase();
    return availableLanguages.filter(
      l => l.name.toLowerCase().includes(s) || l.nativeName.toLowerCase().includes(s) || l.code.toLowerCase().includes(s)
    );
  }, [availableLanguages, search]);

  const isHero = variant === 'hero';
  const isDark = variant === 'dark';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="language-selector-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
          isHero
            ? 'border border-white/20 bg-white/10 hover:bg-white/20 text-white shadow-xs backdrop-blur-xs'
            : isDark
              ? 'border border-slate-700 bg-slate-800/90 hover:bg-slate-700 text-slate-200'
              : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs hover:border-slate-300'
        }`}
      >
        <span className="text-base leading-none" role="img" aria-label={currentLanguage.nativeName}>
          {currentLanguage.flag}
        </span>
        <span className="font-semibold tracking-wide whitespace-nowrap">
          {currentLanguage.nativeName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-blue-500' : isHero ? 'text-slate-300' : 'text-slate-400'
          }`}
        />
      </button>

      {isOpen && (
        <div
          id="language-dropdown-menu"
          role="listbox"
          className="absolute right-0 mt-2 w-60 rounded-2xl bg-white shadow-2xl shadow-slate-900/20 border border-slate-200 py-1.5 z-50 animate-fadeIn focus:outline-none overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-slate-100">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('nav.language', 'Language')}
                className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="py-1 max-h-72 overflow-y-auto divide-y divide-slate-50">
            {filteredLanguages.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-slate-400">
                {t('common.error', 'No languages found')}
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    role="option"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs transition cursor-pointer text-left ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none" role="img" aria-label={lang.nativeName}>
                        {lang.flag}
                      </span>
                      <span className="font-semibold text-slate-800 text-xs">{lang.nativeName}</span>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-600 stroke-[2.5] shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
