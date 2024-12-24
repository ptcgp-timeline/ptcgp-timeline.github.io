const STORAGE_KEYS = {
  TIMEZONE_PREFERENCE: 'timeline_timezone_preference',
  LANGUAGE_PREFERENCE: 'timeline_language_preference'
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export { STORAGE_KEYS, saveToLocalStorage, getFromLocalStorage }; 