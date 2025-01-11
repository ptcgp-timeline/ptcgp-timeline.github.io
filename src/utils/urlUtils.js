import { SUPPORTED_LANGUAGES } from "./constants";

export const getDomainAndFavicon = (url) => {
  const hostname = new URL(url).hostname.replace("www.", "");
  const domainParts = hostname.split(".");
  const tld = domainParts[domainParts.length - 1];
  const domain =
    domainParts.length > 2
      ? `${domainParts[0]}.${domainParts[1]}.${tld}`
      : hostname;
  const favicon = `https://www.google.com/s2/favicons?domain=${hostname}`;
  return { domain, favicon };
};

export const getLanguageFromUrl = () => {
  const pathLang = window.location.pathname.split("/")[1];
  const supportedCodes = SUPPORTED_LANGUAGES.map((lang) => lang.code);
  return supportedCodes.includes(pathLang) ? pathLang : null;
};
