export const getBrowserLanguage = () => {
  const browserLang = navigator.language.split("-")[0];
  const supportedLangs = ["en", "zh", "ja", "ko", "fr", "de", "es", "it", "pt"];
  return supportedLangs.includes(browserLang) ? browserLang : "en";
};
