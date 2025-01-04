import { createContext, useContext, useState } from 'react';
import { STORAGE_KEYS, getFromLocalStorage } from '../utils/localStorage';
import { getBrowserLanguage } from '../utils/browserUtils';
import PropTypes from 'prop-types';

// Export the context itself
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = getFromLocalStorage(STORAGE_KEYS.LANGUAGE_PREFERENCE);
    return savedLang || getBrowserLanguage();
  });

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
