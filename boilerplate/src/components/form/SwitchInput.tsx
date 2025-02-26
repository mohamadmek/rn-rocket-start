import { Controller, useFormContext } from 'react-hook-form';
import { Switch, ViewStyle } from 'react-native';
import { Text } from '../text/Text';
import { FlexStart } from '../layouts';
import { useTheme } from '@/src/theme';

interface ISwitchInputProps {
  name: string;
  label?: string;
  required?: boolean;
  switchStyle?: ViewStyle;
  upperLabel?: string;
  containerStyle?: ViewStyle;
}

export const SwitchInput = ({
  name,
  label,
  required = false,
  switchStyle,
  upperLabel,
  containerStyle,
}: ISwitchInputProps) => {
  const { palette } = useTheme();
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          {upperLabel && (
            <Text semiBold>
              {upperLabel} {required && <Text semiBold>*</Text>}
            </Text>
          )}
          <FlexStart style={containerStyle}>
            {label && <Text semiBold>{label}</Text>}
            <Switch
              trackColor={{ false: 'lightgrey', true: palette.primary }}
              thumbColor={value ? palette.primary : '#f4f3f4'}
              ios_backgroundColor="lightgrey"
              onValueChange={onChange}
              value={!!value}
              style={switchStyle}
            />
          </FlexStart>
        </>
      )}
    />
  );
};
