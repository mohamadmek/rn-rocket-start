import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import type { ReactNode } from 'react';

interface IFlexColumn {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  gap?: ViewStyle['gap'];
}

export const FlexColumn = ({ style, children, testID, gap }: IFlexColumn) => {
  const gapStyle: ViewStyle = { gap: gap ?? 8 };
  return (
    <View testID={testID} style={[gapStyle, style]}>
      {children}
    </View>
  );
};
