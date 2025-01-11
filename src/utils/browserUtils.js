import {
  getFromLocalStorage,
  saveToLocalStorage,
  STORAGE_KEYS,
} from "./localStorage";
import { getLanguageFromUrl } from "./urlUtils";
import { SUPPORTED_LANGUAGES } from "./constants";

export const getBrowserLanguage = () => {
  // First check URL
  const urlLang = getLanguageFromUrl();
  if (urlLang) {
    // Save URL language to localStorage
    saveToLocalStorage(STORAGE_KEYS.LANGUAGE_PREFERENCE, urlLang);
    return urlLang;
  }

  // Then check localStorage
  const storedLang = getFromLocalStorage(STORAGE_KEYS.LANGUAGE_PREFERENCE);
  if (storedLang) {
    return storedLang;
  }

  // Finally fallback to browser language
  const browserLang = navigator.language.split("-")[0];
  const supportedCodes = SUPPORTED_LANGUAGES.map((lang) => lang.code);
  return supportedCodes.includes(browserLang) ? browserLang : "en";
};

export const redirectToLanguage = (lang) => {
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);

  // Update first path segment or add it
  if (
    pathParts[0] &&
    ["en", "zh", "ja", "ko", "fr", "de", "es", "it", "pt"].includes(
      pathParts[0]
    )
  ) {
    pathParts[0] = lang;
  } else {
    pathParts.unshift(lang);
  }

  const newPath = `/${pathParts.join("/")}`;
  window.history.pushState({}, "", newPath);

  // Save to localStorage when redirecting
  saveToLocalStorage(STORAGE_KEYS.LANGUAGE_PREFERENCE, lang);
};
