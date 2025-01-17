import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/useLanguage';
import { FaChevronDown, FaChevronUp, FaInfoCircle, FaGithub, FaTimes, FaExclamationCircle, FaDiscord } from 'react-icons/fa';
import AboutPopup from './AboutPopup';
import { saveToLocalStorage, STORAGE_KEYS } from '../utils/localStorage';
import { gameConfig } from '../data/timeline';
import logoLong from '@/assets/images/logo-long.svg'
import { MdShare } from 'react-icons/md';
import SharePopup from './SharePopup';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { redirectToLanguage } from '../utils/browserUtils';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { getLanguageFromUrl } from '../utils/urlUtils';

  
const Header = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen for URL changes and update language
  useEffect(() => {
    const handleUrlChange = () => {
      const urlLang = getLanguageFromUrl();
      if (urlLang && urlLang !== i18n.language) {
        setLanguage(urlLang);
        i18n.changeLanguage(urlLang);
        dayjs.locale(urlLang);
        saveToLocalStorage(STORAGE_KEYS.LANGUAGE_PREFERENCE, urlLang);
      }
    };

    handleUrlChange();

    window.addEventListener('popstate', handleUrlChange);
    
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [i18n, setLanguage]);

  useEffect(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
      dayjs.locale(language);
    }
  }, [language, i18n]);

  const supportedLanguages = SUPPORTED_LANGUAGES.filter(lang => 
    gameConfig.name[lang.code]
  );

  const selectedLang = supportedLanguages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
    redirectToLanguage(langCode);
    setIsDropdownOpen(false);
    setIsMobileLanguageOpen(false);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-background-secondary w-full fixed top-0 z-50 hidden md:block border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a 
              href="https://ptcgp-timeline.github.io"
              className="hover:opacity-90 transition-opacity"
            >
              <img src={logoLong} alt="Logo" className="h-6" />
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-item text-gray-100 pl-8 pr-12 py-2 rounded-lg border border-gray-600 hover:border-gray-500 focus:outline-none focus:border-primary flex items-center space-x-2 min-w-[160px] transition-colors"
              >
                <img src={selectedLang.icon} alt={selectedLang.code} className="w-4 h-4 absolute left-2"/>
                <span>{selectedLang.name}</span>
                <span className="absolute right-2 text-gray-300">
                  {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-item rounded-lg border border-gray-600 overflow-hidden shadow-lg">
                  {supportedLanguages.map(lang => (
                    <button
                      key={lang.code}
                      className={`w-full px-2 py-2 flex items-center space-x-2 hover:bg-gray-700 transition-colors ${
                        lang.code === language ? 'bg-gray-700 text-white' : 'text-gray-200'
                      }`}
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      <img src={lang.icon} alt={lang.code} className="w-4 h-4" />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <nav>
              <ul className="flex space-x-6 text-gray-200">
                <li>
                  <a 
                    href="https://github.com/ptcgp-timeline/ptcgp-timeline.github.io"
                    className="hover:text-white flex items-center space-x-2 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="text-xl" />
                    <span>{t('common.contribute')}</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/ptcgp-timeline/ptcgp-timeline.github.io/issues"
                    className="hover:text-white flex items-center space-x-2 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExclamationCircle className="text-xl" />
                    <span>{t('common.issues')}</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://discord.gg/K2vK9Hxwq7"
                    className="hover:text-white flex items-center space-x-2 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDiscord className="text-xl" />
                    <span>{t('common.discord')}</span>
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => setIsShareOpen(true)}
                    className="hover:text-white flex items-center space-x-2 transition-colors"
                  >
                    <MdShare className="text-xl" />
                    <span>{t('common.share')}</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowAbout(true)}
                    className="hover:text-white flex items-center space-x-2 transition-colors"
                  >
                    <FaInfoCircle className="text-xl" />
                    <span>{t('common.about')}</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="bg-background-secondary w-full fixed top-0 z-50 md:hidden border-b border-gray-700">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a 
              href="https://ptcgp-timeline.github.io"
              className="hover:opacity-90 transition-opacity"
            >
              <img src={logoLong} alt="Logo" className="h-5" />
            </a>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-200 hover:text-white p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Side Panel */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-64 bg-background-secondary p-4 border-l border-gray-700" ref={mobileMenuRef}>
            <div className="flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white p-2 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-6">
              {/* Mobile Language Dropdown */}
              <div className="space-y-2">
                <h2 className="text-gray-300 text-sm font-medium">{t('common.language')}</h2>
                <div className="relative">
                  <button
                    onClick={() => setIsMobileLanguageOpen(!isMobileLanguageOpen)}
                    className="w-full px-4 py-3 flex items-center justify-between rounded-lg bg-item border border-gray-600 hover:border-gray-500 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={selectedLang.icon} alt={selectedLang.code} className="w-6 h-6" />
                      <span className="text-gray-100 text-lg">{selectedLang.name}</span>
                    </div>
                    <span className="text-gray-300">
                      {isMobileLanguageOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>

                  {isMobileLanguageOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-item border border-gray-600 rounded-lg overflow-hidden shadow-lg">
                      {supportedLanguages.map(lang => (
                        <button
                          key={lang.code}
                          className={`w-full px-4 py-3 flex items-center space-x-3 transition-colors ${
                            lang.code === language ? 'bg-gray-700 text-white' : 'text-gray-200 hover:bg-gray-700'
                          }`}
                          onClick={() => handleLanguageChange(lang.code)}
                        >
                          <img src={lang.icon} alt={lang.code} className="w-6 h-6" />
                          <span className="text-lg">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                <h2 className="text-gray-300 text-sm font-medium">{t('common.menu')}</h2>
                <a 
                  href="https://github.com/ptcgp-timeline/ptcgp-timeline.github.io"
                  className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-200 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="text-2xl" />
                  <span className="text-lg">{t('common.contribute')}</span>
                </a>
                <a 
                  href="https://github.com/ptcgp-timeline/ptcgp-timeline.github.io/issues"
                  className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-200 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExclamationCircle className="text-2xl" />
                  <span className="text-lg">{t('common.issues')}</span>
                </a>
                <button 
                  onClick={() => {
                    setIsShareOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-200 hover:text-white"
                >
                  <MdShare className="text-2xl" />
                  <span className="text-lg">{t('common.share')}</span>
                </button>
                <button 
                  onClick={() => {
                    setShowAbout(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-200 hover:text-white"
                >
                  <FaInfoCircle className="text-2xl" />
                  <span className="text-lg">{t('common.about')}</span>
                </button>
                <a 
                  href="https://discord.gg/K2vK9Hxwq7"
                  className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-200 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDiscord className="text-2xl" />
                  <span className="text-lg">{t('common.discord')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Popup */}
      {showAbout && <AboutPopup onClose={() => setShowAbout(false)} />}

      <SharePopup
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={window.location.href}
      />
    </>
  );
};

export default Header; 