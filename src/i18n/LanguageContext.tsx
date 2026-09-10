import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { LanguageCode, LanguageInfo, Translations } from './types';

// Import JSON locales directly from /locales/
import en from '../../locales/en.json';
import fr from '../../locales/fr.json';
import es from '../../locales/es.json';
import pt from '../../locales/pt.json';
import de from '../../locales/de.json';
import it from '../../locales/it.json';
import nl from '../../locales/nl.json';
import ar from '../../locales/ar.json';
import zh from '../../locales/zh.json';
import ja from '../../locales/ja.json';
import ko from '../../locales/ko.json';
import ru from '../../locales/ru.json';
import tr from '../../locales/tr.json';
import hi from '../../locales/hi.json';
import id from '../../locales/id.json';
import bn from '../../locales/bn.json';
import th from '../../locales/th.json';
import pl from '../../locales/pl.json';
import sv from '../../locales/sv.json';
import uk from '../../locales/uk.json';
import vi from '../../locales/vi.json';
import fil from '../../locales/fil.json';
import ms from '../../locales/ms.json';
import no from '../../locales/no.json';
import da from '../../locales/da.json';
import fi from '../../locales/fi.json';
import cs from '../../locales/cs.json';
import ro from '../../locales/ro.json';
import el from '../../locales/el.json';
import hu from '../../locales/hu.json';

export const AVAILABLE_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'pt', name: 'Português', nativeName: 'Português', flag: '🇵🇹', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'it', name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'nl', name: 'Nederlands', nativeName: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
  { code: 'ar', name: 'العربية', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'zh', name: '中文', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', name: '日本語', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ko', name: '한국어', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr' },
  { code: 'ru', name: 'Русский', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'hi', name: 'हिन्दी', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'id', name: 'Bahasa Indonesia', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  { code: 'bn', name: 'বাংলা', nativeName: 'বাংলা', flag: '🇧🇩', dir: 'ltr' },
  { code: 'th', name: 'ภาษาไทย', nativeName: 'ภาษาไทย', flag: '🇹🇭', dir: 'ltr' },
  { code: 'pl', name: 'Polski', nativeName: 'Polski', flag: '🇵🇱', dir: 'ltr' },
  { code: 'sv', name: 'Svenska', nativeName: 'Svenska', flag: '🇸🇪', dir: 'ltr' },
  { code: 'uk', name: 'Українська', nativeName: 'Українська', flag: '🇺🇦', dir: 'ltr' },
  { code: 'vi', name: 'Tiếng Việt', nativeName: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
  { code: 'fil', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭', dir: 'ltr' },
  { code: 'ms', name: 'Bahasa Melayu', nativeName: 'Bahasa Melayu', flag: '🇲🇾', dir: 'ltr' },
  { code: 'no', name: 'Norsk', nativeName: 'Norsk', flag: '🇳🇴', dir: 'ltr' },
  { code: 'da', name: 'Dansk', nativeName: 'Dansk', flag: '🇩🇰', dir: 'ltr' },
  { code: 'fi', name: 'Suomi', nativeName: 'Suomi', flag: '🇫🇮', dir: 'ltr' },
  { code: 'cs', name: 'Čeština', nativeName: 'Čeština', flag: '🇨🇿', dir: 'ltr' },
  { code: 'ro', name: 'Română', nativeName: 'Română', flag: '🇷🇴', dir: 'ltr' },
  { code: 'el', name: 'Ελληνικά', nativeName: 'Ελληνικά', flag: '🇬🇷', dir: 'ltr' },
  { code: 'hu', name: 'Magyar', nativeName: 'Magyar', flag: '🇭🇺', dir: 'ltr' },
];

const TRANSLATION_MAP: Record<LanguageCode, Translations> = {
  en: en as unknown as Translations,
  fr: fr as unknown as Translations,
  es: es as unknown as Translations,
  pt: pt as unknown as Translations,
  de: de as unknown as Translations,
  it: it as unknown as Translations,
  nl: nl as unknown as Translations,
  ar: ar as unknown as Translations,
  zh: zh as unknown as Translations,
  ja: ja as unknown as Translations,
  ko: ko as unknown as Translations,
  ru: ru as unknown as Translations,
  tr: tr as unknown as Translations,
  hi: hi as unknown as Translations,
  id: id as unknown as Translations,
  bn: bn as unknown as Translations,
  th: th as unknown as Translations,
  pl: pl as unknown as Translations,
  sv: sv as unknown as Translations,
  uk: uk as unknown as Translations,
  vi: vi as unknown as Translations,
  fil: fil as unknown as Translations,
  ms: ms as unknown as Translations,
  no: no as unknown as Translations,
  da: da as unknown as Translations,
  fi: fi as unknown as Translations,
  cs: cs as unknown as Translations,
  ro: ro as unknown as Translations,
  el: el as unknown as Translations,
  hu: hu as unknown as Translations,
};

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLanguage: LanguageInfo;
  availableLanguages: LanguageInfo[];
  translations: Translations;
  t: (path: string, fallback?: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'cardcheck_user_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // English is the DEFAULT language for all new visitors
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (saved && AVAILABLE_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en'; // English (EN) = Default SaaS Language
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const currentLanguage = useMemo(() => {
    return AVAILABLE_LANGUAGES.find((l) => l.code === language) || AVAILABLE_LANGUAGES[0];
  }, [language]);

  const isRtl = currentLanguage.dir === 'rtl' || language === 'ar';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    }
  }, [language, isRtl]);

  const activeTranslations = useMemo(() => {
    return TRANSLATION_MAP[language] || TRANSLATION_MAP.en;
  }, [language]);

  // Dot-notation key resolver: t('nav.home'), t('chatbot.triggerTitle'), etc.
  const t = (path: string, fallback?: string): string => {
    const parts = path.split('.');
    let current: any = activeTranslations;

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        // Fallback to English if key is missing in active translation
        let enCurrent: any = TRANSLATION_MAP.en;
        for (const enPart of parts) {
          if (enCurrent && typeof enCurrent === 'object' && enPart in enCurrent) {
            enCurrent = enCurrent[enPart];
          } else {
            return fallback || path;
          }
        }
        return typeof enCurrent === 'string' ? enCurrent : fallback || path;
      }
    }

    return typeof current === 'string' ? current : fallback || path;
  };

  const value: LanguageContextValue = {
    language,
    setLanguage,
    currentLanguage,
    availableLanguages: AVAILABLE_LANGUAGES,
    translations: activeTranslations,
    t,
    isRtl
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};

export const useTranslation = () => {
  const { t, language, setLanguage, translations, currentLanguage, availableLanguages, isRtl } = useLanguage();
  return { t, language, setLanguage, translations, currentLanguage, availableLanguages, isRtl };
};
