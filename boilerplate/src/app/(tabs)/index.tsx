import { Button, View } from 'react-native';

import { useTheme } from '@/src/theme';
import {
  useAppLanguageStore,
  useSetAppLanguageStore,
} from '@/src/locale/state';
import { deviceStorage } from '@/src/lib/storage';
import { AppLanguage } from '@/src/locale/languages';
import { useLingui } from '@lingui/react/macro';
import { H3, Text } from '@/src/components';

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
      <H3>hello thessssre</H3>
    </View>
  );
}
