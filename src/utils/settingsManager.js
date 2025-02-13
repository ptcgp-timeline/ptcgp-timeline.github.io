import { saveToLocalStorage, getFromLocalStorage } from "./localStorage";

const SETTINGS_STORAGE_KEY = "timeline_settings";

export const SETTINGS_KEYS = {
  HIDE_FINISHED: "hideFinished",
  HIDE_OLD_EVENTS: "hideOldEvents",
  HIDE_EXPANSIONS: "hideFutureExpansions",
};

const defaultSettings = {
  [SETTINGS_KEYS.HIDE_FINISHED]: false,
  [SETTINGS_KEYS.HIDE_OLD_EVENTS]: false,
  [SETTINGS_KEYS.HIDE_EXPANSIONS]: true,
  [SETTINGS_KEYS.SHOW_SEARCH]: true,
};

export const loadSettings = () => {
  const savedSettings = getFromLocalStorage(SETTINGS_STORAGE_KEY, {});
  return {
    ...defaultSettings,
    ...savedSettings,
  };
};

export const saveSettings = (settings) => {
  saveToLocalStorage(SETTINGS_STORAGE_KEY, settings);
};
