import { Controller, useFormContext } from 'react-hook-form';
import type { TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { Text } from '../text/Text';
import { FlexColumn, FlexStart } from '../layouts';

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
    paddingLeft: iconLeft ? 0 : 10,
    paddingRight: iconRight ? 0 : 10,
    textAlignVertical: multiline ? 'center' : 'top',
    minHeight: 45,
    width: '100%',
    ...textStyle,
  };

  const inputBoxStyles: ViewStyle = {
    borderWidth: 1,
    borderRadius: 5,
    minHeight: 45,
    justifyContent: 'space-between',
    display: hidden ? 'none' : 'flex',
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <View>
          {label && !hidden && (
            <Text>
              {label} {required && <Text>*</Text>}
            </Text>
          )}
          <FlexColumn gap={3}>
            <FlexStart style={inputBoxStyles}>
              {iconLeft && (
                <View style={[styles.iconBox, iconLeftStyle]}>{iconLeft}</View>
              )}
              <TextInput
                ref={ref}
                onBlur={onBlur}
                style={[textInputStyle]}
                onChangeText={(text) => {
                  onChange(text);
                  callBack && callBack(text);
                }}
                value={value as string}
                testID={`input-${name}`}
                placeholderTextColor={'grey'}
                {...rest}
              />
              {iconRight && (
                <View style={[styles.iconBox, iconRightStyle]}>
                  {iconRight}
                </View>
              )}
            </FlexStart>
            {!hideError &&
              errors[name] &&
              typeof errors[name].message === 'string' && (
                <Text
                  style={{
                    color: '#FF3B30',
                    fontSize: 12,
                  }}
                >
                  {errors[name].message}
                </Text>
              )}
          </FlexColumn>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  iconBox: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
});
