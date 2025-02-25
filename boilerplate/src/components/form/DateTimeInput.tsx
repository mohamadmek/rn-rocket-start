import { useMemo, useState } from 'react';
import { Pressable, TextInput, ViewStyle } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import DateTimePickerModal, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import { FlexColumn, FlexStart } from '../layouts';
import { displayDateTime } from '@/src/lib/date';
import { Text } from '../text/Text';
import { atoms as a, useTheme } from '@/src/theme';
import { useLingui } from '@lingui/react/macro';
import Ionicons from '@expo/vector-icons/Ionicons';

interface IDateTimeInputProps extends Partial<DateTimePickerProps> {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRightStyle?: ViewStyle;
  iconLeftStyle?: ViewStyle;
  allowClear?: boolean;
}

export const DateTimeInput = ({
  name,
  label,
  required,
  mode = 'date',
  placeholder,
  iconRight,
  iconRightStyle,
  iconLeft,
  iconLeftStyle,
  allowClear = true,
  ...rest
}: IDateTimeInputProps) => {
  const { atoms, palette } = useTheme();
  const { t } = useLingui();
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  const hideDatePicker = () => {
    setIsOpen(false);
  };

  const displayType = useMemo(() => {
    return mode === 'date'
      ? 'DATE'
      : mode === 'datetime'
        ? 'DATE_TIME'
        : 'TIME';
  }, [mode]);

  const placeholderText = useMemo(() => {
    switch (mode) {
      case 'date':
        return t`Select Date`;
      case 'datetime':
        return t`Select Date Time`;
      case 'time':
      default:
        return t`Select Time`;
    }
  }, [mode, t]);

  const inputContainerStyles: ViewStyle[] = [
    {
      borderWidth: 1,
      borderColor: 'lightgrey',
      minHeight: 45,
      justifyContent: 'space-between',
    },
    a.rounded_sm,
    a.px_sm,
  ];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <>
          {label && (
            <Text semiBold>
              {label} {required && <Text semiBold>*</Text>}
            </Text>
          )}
          <FlexColumn>
            <Pressable onPress={() => setIsOpen(true)}>
              <FlexStart style={inputContainerStyles}>
                <FlexStart>
                  {iconLeft && iconLeft}
                  <TextInput
                    style={{
                      color: atoms.text.color,
                    }}
                    placeholder={placeholder || placeholderText}
                    pointerEvents="none"
                    editable={false}
                    autoCorrect={false}
                    ref={ref}
                    onBlur={onBlur}
                    value={displayDateTime(value, {
                      display: displayType,
                    })}
                    placeholderTextColor={'grey'}
                  />
                </FlexStart>
                {iconRight && !allowClear && iconRight}
                {allowClear && value && (
                  <Ionicons
                    onPress={() => onChange(null)}
                    name="close"
                    size={32}
                    color={palette.primary}
                  />
                )}
              </FlexStart>
            </Pressable>
            <DateTimePickerModal
              isVisible={isOpen}
              onConfirm={(date) => {
                onChange(date);
                hideDatePicker();
              }}
              mode={mode}
              onCancel={hideDatePicker}
              {...rest}
            />
          </FlexColumn>
        </>
      )}
    />
  );
};
