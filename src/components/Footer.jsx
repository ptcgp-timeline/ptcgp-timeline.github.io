import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/useLanguage';
import { gameConfig } from '../data/timeline';
import { FaDiscord, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      href: "https://github.com/ptcgp-timeline/ptcgp-timeline.github.io",
      label: "GitHub"
    },
    {
      icon: <FaDiscord className="w-5 h-5" />,
      href: "https://discord.gg/K2vK9Hxwq7",
      label: "Discord"
    }
  ];

  return (
    <footer className="mt-auto py-4 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-xs leading-relaxed">
              {t('common.footer.disclaimer', {
                siteName: gameConfig.name[language] || gameConfig.name['en'],
                company: gameConfig.company
              })}
            </p>
            <p className="text-gray-500 text-xs leading-relaxed mt-1">
              {t('common.footer.copyright', {
                company: gameConfig.company,
                copyrightHolders: gameConfig.copyrightHolders
              })}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 