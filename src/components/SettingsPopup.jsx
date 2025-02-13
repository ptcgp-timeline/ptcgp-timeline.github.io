import PropTypes from 'prop-types';
import { FaTimes, FaFilter } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Switch from './Switch';
import { useState, useRef } from 'react';
import { saveSettings, loadSettings, SETTINGS_KEYS } from '../utils/settingsManager';
import { countActiveFilters } from '../utils/filterUtils';

const SettingsPopup = ({ onClose, onSettingsChange }) => {
  const { t } = useTranslation();
  const saveButtonRef = useRef(null);
  const savedSettings = useRef(loadSettings());
  const [localSettings, setLocalSettings] = useState(() => {
    return savedSettings.current;
  });
  const activeFilters = countActiveFilters(localSettings);

  // Compare localSettings with saved settings from localStorage
  const hasUnsavedChanges = Object.keys(localSettings).some(
    key => savedSettings.current[key] !== localSettings[key]
  );

  const toggleSetting = (key) => {
    const newSettings = {
      ...localSettings,
      [key]: !localSettings[key]
    };
    setLocalSettings(newSettings);
  };

  const handleClose = (e) => {
    if (hasUnsavedChanges) {
      e.stopPropagation();
      saveButtonRef.current?.classList.add('animate-shake');
      setTimeout(() => {
        saveButtonRef.current?.classList.remove('animate-shake');
      }, 400);
      return;
    }
    onClose();
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    saveSettings(localSettings);
    savedSettings.current = localSettings; // Update the reference to saved settings
    window.location.reload();
  };

  const handleReset = () => {
    const defaultSettings = {
      [SETTINGS_KEYS.HIDE_FINISHED]: false,
      [SETTINGS_KEYS.HIDE_OLD_EVENTS]: false,
      [SETTINGS_KEYS.HIDE_EXPANSIONS]: true
    };
    setLocalSettings(defaultSettings);
  };

  const filterOptions = [
    {
      key: SETTINGS_KEYS.HIDE_FINISHED,
      icon: '🏁',
      title: t('common.settings.hideFinished'),
      description: t('common.settings.description.hideFinished')
    },
    {
      key: SETTINGS_KEYS.HIDE_OLD_EVENTS,
      icon: '📅',
      title: t('common.settings.hideOldEvents'),
      description: t('common.settings.description.hideOldEvents')
    },
    {
      key: SETTINGS_KEYS.HIDE_EXPANSIONS,
      icon: '🎴',
      title: t('common.settings.hideExpansions'),
      description: t('common.settings.description.hideExpansions')
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm" onClick={handleClose}>
      <div className="bg-background-secondary p-6 rounded-xl max-w-lg w-full mx-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-bold text-xl font-display flex items-center gap-2">
            <FaFilter className="text-primary" />
            {t('common.settings.title')} {activeFilters > 0 && (
              <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full ml-2">
                {activeFilters}
              </span>
            )}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors" aria-label={t('common.close')}>
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-primary font-semibold mb-4">{t('common.settings.filters')}</h3>
            <div className="space-y-4">
              {filterOptions.map(({ key, icon, title, description }) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl" role="img" aria-hidden="true">{icon}</span>
                      <span className="text-gray-200 font-medium">{title}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1 ml-8">
                      {description}
                    </p>
                  </div>
                  <Switch
                    checked={localSettings[key]}
                    onChange={() => toggleSetting(key)}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700 flex justify-end space-x-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            {t('common.settings.reset')}
          </button>
          <button
            ref={saveButtonRef}
            onClick={handleSave}
            className={`px-4 py-2 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors ${
              hasUnsavedChanges ? 'ring-2 ring-white ring-opacity-50' : ''
            }`}
          >
            {t('common.settings.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

SettingsPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    [SETTINGS_KEYS.HIDE_FINISHED]: PropTypes.bool.isRequired,
    [SETTINGS_KEYS.HIDE_OLD_EVENTS]: PropTypes.bool.isRequired,
    [SETTINGS_KEYS.HIDE_EXPANSIONS]: PropTypes.bool.isRequired,
    showSearch: PropTypes.bool.isRequired,
  }).isRequired,
  onSettingsChange: PropTypes.func.isRequired,
};

export default SettingsPopup; 