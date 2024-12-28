import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PreferenceDefaults, TPreferenceSchema } from './schema';
import { deviceStorage } from '@/src/lib/storage';
import { Platform } from 'react-native';

interface ILanguageStore {
  appLanguage: TPreferenceSchema['languagePrefs']['appLanguage'];
  setAppLanguage: (
    lang: TPreferenceSchema['languagePrefs']['appLanguage'],
  ) => void;
}

export const useLanguageStore = create<ILanguageStore>()(
  devtools(
    (set) => ({
      appLanguage:
        Platform.OS === 'web'
          ? PreferenceDefaults['languagePrefs']['appLanguage']
          : deviceStorage.get(['appLanguage']) ||
            PreferenceDefaults['languagePrefs']['appLanguage'],

      setAppLanguage: (by) => set(() => ({ appLanguage: by })),
    }),
    {
      name: 'language-store',
    },
  ),
);
