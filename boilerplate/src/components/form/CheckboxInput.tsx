import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import Checkbox from 'expo-checkbox';
import { FlexStart } from '../layouts';
import { Text } from '../text/Text';
import { useTheme } from '@/src/theme';

interface ICheckboxInput {
  name: string;
  label: string;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
}

export const CheckboxInput = ({
  name,
  label,
  containerStyles,
  textStyles,
}: ICheckboxInput) => {
  const { palette } = useTheme();
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FlexStart style={containerStyles}>
          <Checkbox
            value={value}
            onValueChange={() => onChange(!value)}
            color={value ? palette.primary : undefined}
          />
          <Text semiBold style={textStyles}>
            {label}
          </Text>
        </FlexStart>
      )}
    />
  );
};
