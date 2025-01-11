import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import i18n from '../utils/i18n/i18n';
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from '../utils/localStorage';
import { getLanguageFromUrl } from '../utils/urlUtils';
import { redirectToLanguage } from '../utils/browserUtils';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check URL first and save to localStorage if found
    const urlLang = getLanguageFromUrl();
    if (urlLang) {
      saveToLocalStorage(STORAGE_KEYS.LANGUAGE_PREFERENCE, urlLang);
      return urlLang;
    }

    // Then check localStorage
    const storedLang = getFromLocalStorage(STORAGE_KEYS.LANGUAGE_PREFERENCE);
    if (storedLang) {
      // Redirect to stored language if at root
      if (window.location.pathname === '/') {
        redirectToLanguage(storedLang);
      }
      return storedLang;
    }

    // Finally use browser language
    const browserLang = navigator.language.split('-')[0];
    const supportedLang = ['en', 'zh', 'ja', 'ko', 'fr', 'de', 'es', 'it', 'pt'].includes(browserLang) 
      ? browserLang 
      : 'en';
    
    // Save and redirect if at root
    saveToLocalStorage(STORAGE_KEYS.LANGUAGE_PREFERENCE, supportedLang);
    if (window.location.pathname === '/') {
      redirectToLanguage(supportedLang);
    }
    return supportedLang;
  });

  // Listen for URL changes
  useEffect(() => {
    const handleUrlChange = () => {
      const urlLang = getLanguageFromUrl();
      if (urlLang && urlLang !== language) {
        setLanguage(urlLang);
        saveToLocalStorage(STORAGE_KEYS.LANGUAGE_PREFERENCE, urlLang);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [language]);

  // Sync i18n with context
  useEffect(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
