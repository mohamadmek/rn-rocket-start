import 'react-native-url-polyfill/auto';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import I18nProvider from '../locale/i18nProvider';
import { deviceStorage } from '../lib/storage';
import { useLanguageStore } from '../locale/state';
import { ThemeProvider as Alf } from '../theme';
import { useColorModeTheme } from '../theme/useColorModeTheme';
import { ThemeProvider } from '../lib/ThemeContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useColorModeTheme();
  const { setAppLanguage } = useLanguageStore();
  const [isReady, setReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const initLocalLanguage = async () => {
    try {
      const lang = await deviceStorage.get(['appLanguage']);
      if (lang) {
        setAppLanguage(lang);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Promise.all([initLocalLanguage()]).then(() => {
      setReady(true);
      if (loaded) {
        SplashScreen.hideAsync();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  if (!loaded || !isReady) {
    return null;
  }

  return (
    <I18nProvider>
      <Alf theme={theme}>
        <ThemeProvider theme={theme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </Alf>
    </I18nProvider>
  );
}
