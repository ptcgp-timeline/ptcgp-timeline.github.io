import { SETTINGS_KEYS } from "./settingsManager";

export const countActiveFilters = (settings) => {
  const filterKeys = [
    SETTINGS_KEYS.HIDE_FINISHED,
    SETTINGS_KEYS.HIDE_OLD_EVENTS,
    SETTINGS_KEYS.HIDE_EXPANSIONS,
  ];
  return filterKeys.filter((key) => settings[key]).length;
};
