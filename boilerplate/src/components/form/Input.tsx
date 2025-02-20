import { Controller, useFormContext } from 'react-hook-form';
import type { TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { TextInput, View } from 'react-native';
import React from 'react';
import { Text } from '../text/Text';
import { FlexColumn, FlexStart } from '../layouts';
import { atoms as a } from '@/src/theme';

interface IErrorResponse {
  message: string;
}

interface IInputProps extends TextInputProps {
  name: string;
  hidden?: boolean;
  required?: boolean;
  label?: string;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  error?: IErrorResponse | null;
  preserveWhitespace?: boolean;
  hideError?: boolean;
  iconRightStyle?: ViewStyle;
  iconLeftStyle?: ViewStyle;
  textStyle?: TextStyle;
  callBack?: (value: string) => void;
}

export const Input = ({
  name,
  hidden,
  required = false,
  style,
  label,
  textStyle,
  iconRight,
  iconRightStyle,
  iconLeft,
  iconLeftStyle,
  error,
  preserveWhitespace,
  hideError = false,
  multiline,
  onFocus,
  callBack,
  ...rest
}: IInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const textInputStyle: TextStyle = {
    textAlignVertical: multiline ? 'center' : 'top',
    flex: 1,
    ...textStyle,
  };

  const inputBoxStyles: ViewStyle[] = [
    {
      borderWidth: 1,
      borderColor: 'lightgrey',
      minHeight: 45,
      justifyContent: iconLeft ? 'flex-start' : 'space-between',
      display: hidden ? 'none' : 'flex',
    },
    a.rounded_sm,
    a.px_sm,
  ];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <View>
          {label && !hidden && (
            <Text semiBold>
              {label} {required && <Text semiBold>*</Text>}
            </Text>
          )}
          <FlexColumn gap={3}>
            <FlexStart style={inputBoxStyles}>
              {iconLeft && iconLeft}
              <TextInput
                ref={ref}
                onBlur={onBlur}
                style={textInputStyle}
                onChangeText={(text) => {
                  onChange(text);
                  callBack && callBack(text);
                }}
                value={value as string}
                testID={`input-${name}`}
                placeholderTextColor={'grey'}
                {...rest}
              />
              {iconRight && iconRight}
            </FlexStart>
            {!hideError &&
              errors[name] &&
              typeof errors[name].message === 'string' && (
                <Text type="error">{errors[name].message}</Text>
              )}
          </FlexColumn>
        </View>
      )}
    />
  );
};
