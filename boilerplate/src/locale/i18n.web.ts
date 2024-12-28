import { useEffect } from 'react';
import { i18n } from '@lingui/core';
import { AppLanguage } from './languages';
import { useLanguageStore } from './state';
import { sanitizeAppLanguageSetting } from './helpers';

/**
 * We do a dynamic import of just the catalog that we need
 */
export async function dynamicActivate(locale: AppLanguage) {
  let mod: any;

  switch (locale) {
    case AppLanguage.de: {
      mod = await import(`./locales/de/messages`);
      break;
    }
    default: {
      mod = await import(`./locales/en/messages`);
      break;
    }
  }

  i18n.load(locale, mod.messages);
  i18n.activate(locale);
}

export async function useLocaleLanguage() {
  const { appLanguage } = useLanguageStore();
  useEffect(() => {
    const sanitizedLanguage = sanitizeAppLanguageSetting(appLanguage);

    document.documentElement.lang = sanitizedLanguage;
    dynamicActivate(sanitizedLanguage);
  }, [appLanguage]);
}
