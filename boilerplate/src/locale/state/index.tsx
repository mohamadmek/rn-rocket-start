import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PreferenceDefaults, TPreferenceSchema } from './schema';

interface ILanguageStore {
  appLanguage: TPreferenceSchema['languagePrefs']['appLanguage'];
  setAppLanguage: (
    lang: TPreferenceSchema['languagePrefs']['appLanguage'],
  ) => void;
}

export const useLanguageStore = create<ILanguageStore>()(
  devtools(
    (set) => ({
      appLanguage: PreferenceDefaults['languagePrefs']['appLanguage'],
      setAppLanguage: (by) => set(() => ({ appLanguage: by })),
    }),
    {
      name: 'language-store',
    },
  ),
);
