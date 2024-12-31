import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { deviceStorage } from '@/src/lib/storage';
import { Platform } from 'react-native';
import {
  localStorageDefaults,
  TLocalStorageSchema,
} from '@/src/lib/storage/schema';

interface ILanguageStore {
  appLanguage: TLocalStorageSchema['appLanguage'];
  setAppLanguage: (lang: TLocalStorageSchema['appLanguage']) => void;
}

export const useLanguageStore = create<ILanguageStore>()(
  devtools(
    (set) => ({
      appLanguage:
        Platform.OS === 'web'
          ? localStorageDefaults['appLanguage']
          : deviceStorage.get(['appLanguage']) ||
            localStorageDefaults['appLanguage'],

      setAppLanguage: (by) => set(() => ({ appLanguage: by })),
    }),
    {
      name: 'language-store',
    },
  ),
);
