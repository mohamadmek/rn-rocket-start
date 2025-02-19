import { useMemo, useState } from 'react';
import { Pressable, TextInput, ViewStyle } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import DateTimePickerModal, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import { FlexColumn, FlexStart } from '../layouts';
import { displayDateTime, IDisplateDateTimeOptions } from '@/src/lib/date';
import { Text } from '../text/Text';
import { atoms as a } from '@/src/theme';

interface IDateTimeInputProps extends Partial<DateTimePickerProps> {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRightStyle?: ViewStyle;
  iconLeftStyle?: ViewStyle;
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
  ...rest
}: IDateTimeInputProps) => {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  const hideDatePicker = () => {
    setIsOpen(false);
  };

  const displayType: IDisplateDateTimeOptions['display'] =
    mode === 'date' ? 'DATE' : mode === 'datetime' ? 'DATE_TIME' : 'TIME';

  const placeholderText = useMemo(
    () =>
      mode === 'date'
        ? 'Select Date'
        : mode === 'datetime'
          ? 'Select Date Time'
          : 'Select Time',
    [mode],
  );

  const inputContainerStyles: ViewStyle[] = [
    {
      borderWidth: 1,
      borderColor: 'lightgrey',

      minHeight: 45,
      justifyContent: iconLeft ? 'flex-start' : 'space-between',
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
                {iconLeft && iconLeft}
                <TextInput
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
                {iconRight && iconRight}
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
