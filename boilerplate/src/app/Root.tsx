import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { useSetAppLanguageStore } from '../locale/state';
import { appStorage } from '../lib/storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootApp() {
  const { setAppLanguage } = useSetAppLanguageStore();
  const [isReady, setReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const initLocalLanguage = async () => {
    try {
      const lang = appStorage.getAppLanguage();
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
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
