import React from 'react';
import { deviceStorage } from '../../lib/storage';
import {
  localStorageDefaults,
  TLocalStorageSchema,
} from '../../lib/storage/schema';

type StateContext = {
  colorMode: TLocalStorageSchema['colorMode'];
  darkTheme: TLocalStorageSchema['darkTheme'];
};
type SetContext = {
  setColorMode: (v: TLocalStorageSchema['colorMode']) => void;
  setDarkTheme: (v: TLocalStorageSchema['darkTheme']) => void;
};

const stateContext = React.createContext<StateContext>({
  colorMode: 'system',
  darkTheme: 'dark',
});
const setContext = React.createContext<SetContext>({} as SetContext);

export function Provider({ children }: React.PropsWithChildren<object>) {
  const [colorMode, setColorMode] = React.useState<StateContext['colorMode']>(
    deviceStorage.get(['colorMode']) || localStorageDefaults['colorMode'],
  );
  const [darkTheme, setDarkTheme] = React.useState(
    deviceStorage.get(['darkTheme']),
  );

  const stateContextValue = React.useMemo(
    () => ({
      colorMode,
      darkTheme,
    }),
    [colorMode, darkTheme],
  );

  const setContextValue = React.useMemo(
    () => ({
      setColorMode: (_colorMode: TLocalStorageSchema['colorMode']) => {
        setColorMode(_colorMode);
        deviceStorage.set(['colorMode'], _colorMode);
      },
      setDarkTheme: (_darkTheme: TLocalStorageSchema['darkTheme']) => {
        setDarkTheme(_darkTheme);
        deviceStorage.set(['darkTheme'], _darkTheme);
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

export function useThemePrefs() {
  return React.useContext(stateContext);
}

export function useSetThemePrefs() {
  return React.useContext(setContext);
}
