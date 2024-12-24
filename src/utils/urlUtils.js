export const getDomainAndFavicon = (url) => {
  const domain = new URL(url).hostname.replace('www.', '');
  const favicon = `https://www.google.com/s2/favicons?domain=${domain}`;
  return { domain, favicon };
}; 