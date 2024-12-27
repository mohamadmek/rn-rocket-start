import React from 'react';
import { useLocaleLanguage } from './i18n';
import { i18n } from '@lingui/core';
import { I18nProvider as DefaultI18nProvider } from '@lingui/react';
import { messages as messagesEn } from './locales/en/messages';

i18n.loadAndActivate({ locale: 'en', messages: messagesEn });

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLocaleLanguage();
  return <DefaultI18nProvider i18n={i18n}>{children}</DefaultI18nProvider>;
}
