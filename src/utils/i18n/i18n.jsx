import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import dayjs from 'dayjs';
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from '../localStorage';
import { redirectToLanguage } from '../browserUtils';

// Import dayjs locales
import 'dayjs/locale/en';
import 'dayjs/locale/zh';
import 'dayjs/locale/ja';
import 'dayjs/locale/ko';
import 'dayjs/locale/fr';
import 'dayjs/locale/de';
import 'dayjs/locale/es';
import 'dayjs/locale/it';
import 'dayjs/locale/pt';

// Import all locale files
import enTranslation from './locales/en/en.json';
import zhTranslation from './locales/zh/zh.json';
import jaTranslation from './locales/ja/ja.json';
import koTranslation from './locales/ko/ko.json';
import frTranslation from './locales/fr/fr.json';
import deTranslation from './locales/de/de.json';
import esTranslation from './locales/es/es.json';
import itTranslation from './locales/it/it.json';
import ptTranslation from './locales/pt/pt.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      zh: { translation: zhTranslation },
      ja: { translation: jaTranslation },
      ko: { translation: koTranslation },
      fr: { translation: frTranslation },
      de: { translation: deTranslation },
      es: { translation: esTranslation },
      it: { translation: itTranslation },
      pt: { translation: ptTranslation },
    },
    fallbackLng: 'en',
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
      cookieMinutes: 10080, // 7 days
    },
    interpolation: {
      escapeValue: false,
    },
  }).then(() => {
    const urlLang = window.location.pathname.split('/')[1];
    const storedLang = getFromLocalStorage(STORAGE_KEYS.LANGUAGE_PREFERENCE);
    
    if (!urlLang && storedLang) {
      redirectToLanguage(storedLang);
    } else if (!urlLang && !storedLang) {
      const browserLang = navigator.language.split('-')[0];
      const supportedLang = ['en', 'zh', 'ja', 'ko', 'fr', 'de', 'es', 'it', 'pt'].includes(browserLang) 
        ? browserLang 
        : 'en';
      redirectToLanguage(supportedLang);
    }
    
    dayjs.locale(i18n.language);
  });

// Language change handler
i18n.on('languageChanged', (lng) => {
  dayjs.locale(lng);
  document.documentElement.lang = lng;
  saveToLocalStorage(STORAGE_KEYS.LANGUAGE_PREFERENCE, lng);
});

export default i18n; 