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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProviders, Input } from '@/src/components/form';
import { object, ObjectSchema, string } from 'yup';
import Ionicons from '@expo/vector-icons/Ionicons';

export type TLoginForm = {
  email: string;
};

const schema: ObjectSchema<TLoginForm> = object({
  email: string().label('HELLOZ').required().email().trim(),
}).defined();

export default function HomeScreen() {
  const { t } = useLingui();
  const { setAppLanguage } = useSetAppLanguageStore();
  const { appLanguage } = useAppLanguageStore();
  const theme = useTheme();
  const formMethods = useForm<TLoginForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  return (
    <View
      style={{
        height: 300,
        backgroundColor: theme.atoms.bg.backgroundColor,
        marginTop: 50,
        paddingHorizontal: 10,
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
      <FormProviders<TLoginForm> formMethods={formMethods}>
        <Input
          iconLeft={
            <Ionicons name="checkmark-circle" size={32} color="green" />
          }
          multiline
          name="email"
          label="Email or Phone"
          required
        />
      </FormProviders>
    </View>
  );
}
