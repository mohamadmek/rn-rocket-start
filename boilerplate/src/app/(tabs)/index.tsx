import {
  useAppLanguageStore,
  useSetAppLanguageStore,
} from '@/src/locale/state';
import { AppLanguage } from '@/src/locale/languages';
import { useLingui } from '@lingui/react/macro';
import { Text } from '@/src/components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CheckboxInput,
  FormProviders,
  Input,
  SwitchInput,
} from '@/src/components/form';
import { boolean, object, ObjectSchema, string } from 'yup';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DateTimeInput } from '@/src/components/form/DateTimeInput';
import { Button } from '@/src/components/button/Button';
import {
  HeaderContent,
  HeaderOuter,
  HeaderSlot,
  HeaderTitleText,
  KeyboardAwareContent,
  Screen,
} from '@/src/components/layouts';
import { ButtonIcon } from '@/src/components/button/ButtonIcon';
import { ButtonText } from '@/src/components/button/ButtonText';
import { View } from 'react-native';
import { appStorage } from '@/src/lib/storage';

export type TLoginForm = {
  email: string;
  date: string;
  verified: boolean;
};

const schema: ObjectSchema<TLoginForm> = object({
  email: string().label('Email').required().email().trim(),
  date: string().required(),
  verified: boolean().required(),
}).defined();

export default function HomeScreen() {
  const { t } = useLingui();
  const { setAppLanguage } = useSetAppLanguageStore();
  const { appLanguage } = useAppLanguageStore();
  const formMethods = useForm<TLoginForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      date: '',
      verified: false,
    },
  });

  return (
    <Screen>
      <HeaderOuter>
        <HeaderSlot />
        <HeaderContent align="center">
          <HeaderTitleText>hello</HeaderTitleText>
        </HeaderContent>
        <Button
          label={'hello'}
          size="small"
          variant="ghost"
          onPress={() => {}}
          hitSlop={30}
        >
          <ButtonIcon size="large" name="menu" color="red" />
        </Button>
      </HeaderOuter>
      <KeyboardAwareContent style={{ paddingTop: 20 }}>
        <Button
          label="change lang"
          onPress={async () => {
            setAppLanguage(appLanguage === 'en' ? 'de' : 'en');
            appStorage.setAppLanguage(
              appLanguage === 'en' ? AppLanguage.de : AppLanguage.en,
            );
          }}
        >
          change lang
        </Button>
        <View style={{ height: 20 }} />
        <Button
          label={'Feedback'}
          variant="solid"
          color="secondary"
          onPress={async () => {
            // const habibi = await openPicker({});
            // console.log(habibi);
          }}
        >
          <ButtonText>FeedBack</ButtonText>
          <ButtonIcon name="air" position="right" />
        </Button>
        <Text>{t`HELLO EVERYONE`}</Text>
        <FormProviders<TLoginForm> formMethods={formMethods}>
          <Input multiline name="email" label="Email or Phone" />
          <DateTimeInput
            label="Date"
            iconLeft={
              <Ionicons name="checkmark-circle" size={32} color="green" />
            }
            mode="date"
            name="date"
          />
          <CheckboxInput name="verified" label="is verfied" />

          <SwitchInput name="hala" upperLabel="Switch" />
        </FormProviders>
      </KeyboardAwareContent>
    </Screen>
  );
}
