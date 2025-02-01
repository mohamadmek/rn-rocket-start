import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';

interface IFlexStart {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  gap?: ViewStyle['gap'];
}

export const FlexStart = ({ gap, children, style, testID }: IFlexStart) => {
  const gapStyle: ViewStyle = { gap: gap ?? 8 };
  return (
    <View testID={testID} style={[styles.main, gapStyle, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
