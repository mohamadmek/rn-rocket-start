import { MMKV } from 'react-native-mmkv';

export type StorageKey =
  | 'fontScale'
  | 'fontFamily'
  | 'appLanguage'
  | 'colorMode'
  | 'darkTheme'
  | 'refreshToken';

export type StorageSchema = {
  fontScale: '-2' | '-1' | '0' | '1' | '2';
  fontFamily: 'system' | 'theme';
  appLanguage: string;
  colorMode: 'system' | 'light' | 'dark';
  darkTheme: 'dim' | 'dark' | undefined;
  refreshToken: string | null;
};

// Create a single MMKV instance for the app
export const storageInstance = new MMKV({
  id: 'rocket_app_storage',
});

/**
 * Save a value to storage with the given key
 */
export function saveToStorage<K extends StorageKey>(
  key: K,
  value: StorageSchema[K],
): void {
  storageInstance.set(key, JSON.stringify(value));
}

/**
 * Retrieve a value from storage by key
 */
export function getFromStorage<K extends StorageKey>(
  key: K,
): StorageSchema[K] | undefined {
  const value = storageInstance.getString(key);
  if (!value) return undefined;
  return JSON.parse(value) as StorageSchema[K];
}

/**
 * Remove a value from storage by key
 */
export function removeFromStorage(key: StorageKey): void {
  storageInstance.delete(key);
}

/**
 * Remove multiple values from storage by keys
 */
export function removeMultipleFromStorage(keys: StorageKey[]): void {
  keys.forEach((key) => storageInstance.delete(key));
}

/**
 * Clear all values from storage
 */
export function clearStorage(): void {
  storageInstance.clearAll();
}

/**
 * Check if a key exists in storage
 */
export function hasKey(key: StorageKey): boolean {
  return storageInstance.contains(key);
}

/**
 * Get all keys in storage
 */
export function getAllKeys(): string[] {
  return storageInstance.getAllKeys();
}

// Create namespace objects for more organized API
export const appStorage = {
  getFontScale: () => getFromStorage('fontScale'),
  setFontScale: (value: StorageSchema['fontScale']) =>
    saveToStorage('fontScale', value),
  getFontFamily: () => getFromStorage('fontFamily'),
  setFontFamily: (value: StorageSchema['fontFamily']) =>
    saveToStorage('fontFamily', value),
  getAppLanguage: () => getFromStorage('appLanguage'),
  setAppLanguage: (value: StorageSchema['appLanguage']) =>
    saveToStorage('appLanguage', value),
  getColorMode: () => getFromStorage('colorMode'),
  setColorMode: (value: StorageSchema['colorMode']) =>
    saveToStorage('colorMode', value),
  getDarkTheme: () => getFromStorage('darkTheme'),
  setDarkTheme: (value: StorageSchema['darkTheme']) =>
    saveToStorage('darkTheme', value),
  getRefreshToken: () => getFromStorage('refreshToken'),
  setRefreshToken: (value: StorageSchema['refreshToken']) =>
    saveToStorage('refreshToken', value),
};
