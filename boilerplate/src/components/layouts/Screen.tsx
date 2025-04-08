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

// Constants
const LAYOUT_CONSTANTS = {
  MAX_CONTENT_WIDTH: 600,
  CONTENT_BOTTOM_PADDING: 100,
};

// Shared Types
export type BaseLayoutProps = {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  noInsetTop?: boolean;
};

// Custom Hooks
const useScrollbarOffset = () => {
  const { isWithinOffsetView } = useContext(ScrollbarOffsetContext);
  const ctx = useMemo(() => ({ isWithinOffsetView: true }), []);

  return {
    isWithinOffsetView,
    offsetContext: ctx,
  };
};

const useResponsiveStyles = () => {
  const { gtMobile } = useBreakpoints();

  return {
    gtMobile,
    responsiveMaxWidth: gtMobile
      ? { maxWidth: LAYOUT_CONSTANTS.MAX_CONTENT_WIDTH }
      : undefined,
  };
};

// Component Types
export type ScreenProps = React.ComponentProps<typeof View> &
  Pick<BaseLayoutProps, 'style' | 'noInsetTop'>;

export type ContentProps = ScrollViewProps &
  Pick<BaseLayoutProps, 'style' | 'contentContainerStyle'>;

export type KeyboardAwareContentProps = KeyboardAwareScrollViewProps &
  Pick<BaseLayoutProps, 'children' | 'contentContainerStyle' | 'noInsetTop'>;

// Styles
const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: LAYOUT_CONSTANTS.CONTENT_BOTTOM_PADDING,
  },
  fullWidth: {
    width: '100%',
  },
  baseScrollView: {
    width: '100%',
    paddingHorizontal: 16, // Assuming a.px_md is equivalent to 16
  },
});

// Components
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
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
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

export const KeyboardAwareContent = React.memo(function KeyboardAwareContent({
  children,
  style,
  contentContainerStyle,
  ...props
}: KeyboardAwareContentProps) {
  return (
    <KeyboardAwareScrollView
      style={[a.w_full, a.px_md, style]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  );
});

export const Center = React.memo(function Center({
  children,
  style,
  ...props
}: ViewProps) {
  const { isWithinOffsetView, offsetContext } = useScrollbarOffset();
  const { responsiveMaxWidth } = useResponsiveStyles();

  return (
    <View
      style={[
        a.w_full,
        a.mx_auto,
        responsiveMaxWidth,
        style,
        !isWithinOffsetView && a.scrollbar_offset,
      ]}
      {...props}
    >
      <ScrollbarOffsetContext.Provider value={offsetContext}>
        {children}
      </ScrollbarOffsetContext.Provider>
    </View>
  );
});
