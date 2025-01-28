import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/useLanguage';
import { FaChevronDown, FaChevronUp, FaInfoCircle, FaGithub, FaTimes, FaExclamationCircle, FaDiscord, FaSearch, FaBars, FaShareAlt } from 'react-icons/fa';
import AboutPopup from './AboutPopup';
import { saveToLocalStorage, STORAGE_KEYS } from '../utils/localStorage';
import { gameConfig } from '../data/timeline';
import logoLong from '@/assets/images/logo-long.svg'
import SharePopup from './SharePopup';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { redirectToLanguage } from '../utils/browserUtils';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { getLanguageFromUrl } from '../utils/urlUtils';
import SearchBar from './SearchBar';
import PropTypes from 'prop-types';

dayjs.extend(utc);

const Header = ({ events = [], onEventSelect, showLocalTime }) => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
      <header className="bg-background-secondary w-full fixed top-0 z-50 border-b border-gray-700">
        <div className="container mx-auto py-2 md:py-4">
          <div className="flex items-center justify-between px-4">
            <a 
              href="https://ptcgp-timeline.github.io"
              className="hover:opacity-90 transition-opacity"
            >
              <img src={logoLong} alt="Logo" className="h-5 md:h-6" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Language Selector */}
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
                <ul className="flex items-center space-x-6 text-gray-200">
                  <li>
                    <a 
                      href="https://github.com/ptcgp-timeline/ptcgp-timeline.github.io"
                      className="hover:text-white flex items-center space-x-2 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="text-xl" />
                      <span className="hidden lg:inline">{t('common.contribute')}</span>
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
                      <span className="hidden lg:inline">{t('common.issues')}</span>
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowAbout(true)}
                      className="hover:text-white flex items-center space-x-2 transition-colors"
                    >
                      <FaInfoCircle className="text-xl" />
                      <span className="hidden lg:inline">{t('common.about')}</span>
                    </button>
                  </li>
                </ul>
              </nav>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors relative group"
                aria-label={t('common.search')}
              >
                <FaSearch className="text-xl" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {t('common.search')}
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                aria-label={t('common.search')}
              >
                <FaSearch className="text-xl" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-200 hover:text-white transition-colors"
              >
                <FaBars className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Popup */}
      {isSearchOpen && (
        <div className="fixed inset-x-0 top-[57px] md:top-[73px] px-4 z-40">
          <div className="container mx-auto">
            <div className="relative">
              <SearchBar
                events={events}
                onEventSelect={(event) => {
                  onEventSelect(event);
                  setIsSearchOpen(false);
                }}
                showLocalTime={showLocalTime}
                isMobile={window.innerWidth < 768}
                isSearchOpen={isSearchOpen}
              />
            </div>
          </div>
        </div>
      )}

      {/* Share Button (Floating) */}
      <button
        onClick={() => setIsShareOpen(true)}
        className="fixed bottom-4 right-4 z-40 p-3 rounded-lg bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors"
        aria-label={t('common.share')}
      >
        <FaShareAlt className="text-xl" />
      </button>

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
                  <FaShareAlt className="text-2xl" />
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

Header.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.objectOf(PropTypes.string).isRequired,
      start: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      end: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      noEnd: PropTypes.bool,
      startOnly: PropTypes.bool,
    })
  ),
  onEventSelect: PropTypes.func.isRequired,
  showLocalTime: PropTypes.bool.isRequired,
};

export default Header; 