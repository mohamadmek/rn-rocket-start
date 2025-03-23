import 'react-native-url-polyfill/auto';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import I18nProvider from '../locale/i18nProvider';
import { ThemeProvider as Alf } from '../theme';
import { useColorModeTheme } from '../theme/utils/useColorModeTheme';
import { AppLanguageProvider } from '../locale/state';
import RootApp from './Root';
import { KeyboardProvider } from 'react-native-keyboard-controller';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useColorModeTheme();

  return (
    <AppLanguageProvider>
      <I18nProvider>
        <Alf theme={theme}>
          <KeyboardProvider>
            <RootApp />
          </KeyboardProvider>
          <StatusBar style="auto" />
        </Alf>
      </I18nProvider>
    </AppLanguageProvider>
  );
}
