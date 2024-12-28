// Don't remove -force from these because detection is VERY slow on low-end Android.
// https://github.com/formatjs/formatjs/issues/4463#issuecomment-2176070577
import '@formatjs/intl-locale/polyfill-force';
import '@formatjs/intl-pluralrules/polyfill-force';
import '@formatjs/intl-numberformat/polyfill-force';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-numberformat/locale-data/en';

import { useEffect } from 'react';
import { i18n } from '@lingui/core';

import { AppLanguage } from '@/src/locale/languages';
import { messages as messagesDe } from './locales/de/messages';
import { messages as messagesEn } from './locales/en/messages';
import { sanitizeAppLanguageSetting } from './helpers';
import { useLanguageStore } from './state';

/**
 * We do a dynamic import of just the catalog that we need
 */
export async function dynamicActivate(locale: AppLanguage) {
  switch (locale) {
    case AppLanguage.de: {
      i18n.loadAndActivate({ locale, messages: messagesDe });
      await Promise.all([
        import('@formatjs/intl-pluralrules/locale-data/de'),
        import('@formatjs/intl-numberformat/locale-data/de'),
      ]);
      break;
    }
    default: {
      i18n.loadAndActivate({ locale, messages: messagesEn });
      break;
    }
  }
}

export function useLocaleLanguage() {
  const { appLanguage } = useLanguageStore();
  useEffect(() => {
    dynamicActivate(sanitizeAppLanguageSetting(appLanguage));
  }, [appLanguage]);
}
