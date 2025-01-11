import PropTypes from 'prop-types';
import { FaTimes, FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const AboutPopup = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-background-secondary p-6 rounded-xl max-w-lg w-full mx-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-bold text-xl font-display">{t('about.title')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label={t('common.close')}>
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <section>
            <h3 className="text-primary font-semibold mb-2">{t('about.sections.what.title')}</h3>
            <p className="text-gray-300 leading-relaxed">{t('about.sections.what.content')}</p>
          </section>

          <section>
            <h3 className="text-primary font-semibold mb-2">{t('about.sections.features.title')}</h3>
            <ul className="text-gray-300 list-disc list-inside space-y-1">
              {t('about.sections.features.list', { returnObjects: true }).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-primary font-semibold mb-2">{t('about.sections.contribute.title')}</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/ptcgp-timeline/ptcgp-timeline.github.io"
                 className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                 target="_blank"
                 rel="noopener noreferrer">
                <FaGithub className="text-xl" />
                <span>{t('about.sections.contribute.github')}</span>
              </a>
            </div>
          </section>

          <div className="text-gray-400 text-sm mt-6 pt-4 border-t border-gray-700">
            <p>{t('about.footer')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

AboutPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AboutPopup; 