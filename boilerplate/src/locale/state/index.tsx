import { appStorage } from '@/src/lib/storage';
import { Platform } from 'react-native';
import {
  localStorageDefaults,
  TLocalStorageSchema,
} from '@/src/lib/storage/schema';
import React from 'react';
import { AppLanguage } from '../languages';

type TStateContext = {
  appLanguage: TLocalStorageSchema['appLanguage'];
};
type TSetContext = {
  setAppLanguage: (lang: TLocalStorageSchema['appLanguage']) => void;
};

const stateContext = React.createContext<TStateContext>({
  appLanguage: AppLanguage.en,
});
const setContext = React.createContext<TSetContext>({
  setAppLanguage: () => {
    throw new Error(
      'setAppLanguage must be used within a <AppLanguageProvider>',
    );
  },
} as TSetContext);

export function AppLanguageProvider({
  children,
}: React.PropsWithChildren<object>) {
  const [language, setLanguage] = React.useState<TStateContext['appLanguage']>(
    Platform.OS === 'web'
      ? localStorageDefaults['appLanguage']
      : appStorage.getAppLanguage() || localStorageDefaults['appLanguage'],
  );

  const stateContextValue: TStateContext = React.useMemo(
    () => ({
      appLanguage: language,
    }),
    [language],
  );

  const setContextValue: TSetContext = React.useMemo(
    () => ({
      setAppLanguage: (appLanguage: TLocalStorageSchema['appLanguage']) => {
        setLanguage(appLanguage);
        appStorage.setAppLanguage(appLanguage);
      },
    }),
    [],
  );

  return (
    <stateContext.Provider value={stateContextValue}>
      <setContext.Provider value={setContextValue}>
        {children}
      </setContext.Provider>
    </stateContext.Provider>
  );
}

export function useAppLanguageStore() {
  return React.useContext(stateContext);
}

export function useSetAppLanguageStore() {
  return React.useContext(setContext);
}
