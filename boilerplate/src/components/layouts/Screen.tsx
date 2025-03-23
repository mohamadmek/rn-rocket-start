import { isWeb } from '@/src/platform/detection';
import { atoms as a, useBreakpoints, useTheme } from '@/src/theme';
import React, { useContext, useMemo } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollbarOffsetContext } from './context';

export type ScreenProps = React.ComponentProps<typeof View> & {
  style?: StyleProp<ViewStyle>;
  noInsetTop?: boolean;
};

export const Screen = React.memo(function Screen({
  style,
  noInsetTop,
  children,
  ...props
}: ScreenProps) {
  const { top } = useSafeAreaInsets();
  const { palette } = useTheme();
  return (
    <View
      style={[
        a.util_screen_outer,
        {
          paddingTop: noInsetTop ? 0 : top,
          backgroundColor: palette.background,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
});

export type ContentProps = ScrollViewProps & {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

/**
 * Default scroll view for simple pages
 */
export const Content = React.memo(function Content({
  children,
  style,
  contentContainerStyle,
  ...props
}: ContentProps) {
  const t = useTheme();

  return (
    <ScrollView
      id="content"
      automaticallyAdjustsScrollIndicatorInsets={false}
      indicatorStyle={t.scheme === 'dark' ? 'white' : 'black'}
      style={[a.w_full, a.px_md, style]}
      contentContainerStyle={[
        scrollViewStyles.contentContainer,
        contentContainerStyle,
      ]}
      {...props}
    >
      {isWeb ? (
        // @ts-ignore web only -esb
        <Center>{children}</Center>
      ) : (
        children
      )}
    </ScrollView>
  );
});

export type KeyboardAwareContentProps = KeyboardAwareScrollViewProps & {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  noInsetTop?: boolean;
};

export const KeyboardAwareContent = React.memo(function LayoutScrollView({
  children,
  style,
  contentContainerStyle,
  noInsetTop,
  ...props
}: KeyboardAwareContentProps) {
  return (
    <KeyboardAwareScrollView
      style={[a.w_full, a.px_md, style]}
      contentContainerStyle={[
        scrollViewStyles.contentContainer,
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  );
});

const scrollViewStyles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 100,
  },
});

export const Center = React.memo(function LayoutContent({
  children,
  style,
  ...props
}: ViewProps) {
  const { isWithinOffsetView } = useContext(ScrollbarOffsetContext);
  const { gtMobile } = useBreakpoints();
  const ctx = useMemo(() => ({ isWithinOffsetView: true }), []);
  return (
    <View
      style={[
        a.w_full,
        a.mx_auto,
        gtMobile && {
          maxWidth: 600,
        },
        style,
        !isWithinOffsetView && a.scrollbar_offset,
      ]}
      {...props}
    >
      <ScrollbarOffsetContext.Provider value={ctx}>
        {children}
      </ScrollbarOffsetContext.Provider>
    </View>
  );
});
