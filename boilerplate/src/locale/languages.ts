interface Language {
  code3: string;
  code2: string;
  name: string;
}

export enum AppLanguage {
  en = "en",
  de = "de",
}

interface AppLanguageConfig {
  code2: AppLanguage;
  name: string;
}

export const APP_LANGUAGES: AppLanguageConfig[] = [
  { code2: AppLanguage.en, name: "English" },
];

export const LANGUAGES: Language[] = [
  { code3: "eng", code2: "en", name: "English" },
  { code3: "ger", code2: "de", name: "German" },
];

export const LANGUAGES_MAP_CODE2 = Object.fromEntries(
  LANGUAGES.map((lang) => [lang.code2, lang])
);

export const LANGUAGES_MAP_CODE3 = Object.fromEntries(
  LANGUAGES.map((lang) => [lang.code3, lang])
);
