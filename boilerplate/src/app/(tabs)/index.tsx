import { Button, Text, View } from 'react-native';

import { useTheme } from '@/src/theme';
import {
  useAppLanguageStore,
  useSetAppLanguageStore,
} from '@/src/locale/state';
import { deviceStorage } from '@/src/lib/storage';
import { AppLanguage } from '@/src/locale/languages';
import { useLingui } from '@lingui/react/macro';

export default function HomeScreen() {
  const { t } = useLingui();
  const { setAppLanguage } = useSetAppLanguageStore();
  const { appLanguage } = useAppLanguageStore();
  const theme = useTheme();

  return (
    <View
      style={{
        height: 300,
        width: 400,
        backgroundColor: theme.atoms.bg.backgroundColor,
        marginTop: 50,
      }}
    >
      <Button
        title="press me"
        onPress={async () => {
          setAppLanguage(appLanguage === 'en' ? 'de' : 'en');
          deviceStorage.set(
            ['appLanguage'],
            appLanguage === 'en' ? AppLanguage.de : AppLanguage.en,
          );
        }}
      />
      <Text>{t`HELLO EVERYONE`}</Text>
    </View>
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/partial-react-logo.png')}
    //       style={styles.reactLogo}
    //     />
    //   }
    // >
    //   <Button
    //     title="press me"
    //     onPress={async () => {
    //       setAppLanguage(appLanguage === 'en' ? 'de' : 'en');
    //       deviceStorage.set(
    //         ['appLanguage'],
    //         appLanguage === 'en' ? AppLanguage.de : AppLanguage.en,
    //       );
    //     }}
    //   />
    //   <View
    //     style={[
    //       { width: 200, height: 200, backgroundColor: theme.palette.primary },
    //     ]}
    //   />
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">{t`HELLO EVERYONE`}</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit{' '}
    //       <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{' '}
    //       to see changes. Press{' '}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({
    //           ios: 'cmd + d',
    //           android: 'cmd + m',
    //           web: 'F12',
    //         })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       Tap the Explore tab to learn more about what's included in this
    //       starter app.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       When you're ready, run{' '}
    //       <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{' '}
    //       to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{' '}
    //       directory. This will move the current{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>
  );
}
