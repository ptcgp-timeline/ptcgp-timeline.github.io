import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getFromLocalStorage, STORAGE_KEYS } from '../utils/localStorage';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    getFromLocalStorage(STORAGE_KEYS.LANGUAGE_PREFERENCE, 'en')
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useLanguage } from './useLanguage'; 