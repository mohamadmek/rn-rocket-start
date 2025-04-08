import { isIOS } from '@/src/platform/detection';
import {
  atoms as a,
  platform,
  TextStyleProp,
  useBreakpoints,
  useGutters,
  useTheme,
  web,
} from '@/src/theme';
import React, { createContext, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../text/Text';

// Constants
const LAYOUT_CONSTANTS = {
  HEADER_SLOT_SIZE: 34,
  MAX_CONTENT_WIDTH: 600,
  HEADER_HEIGHT: {
    NATIVE: 48,
    WEB: 52,
  },
  MAX_TITLE_LINES: 2,
};

// Types
type AlignmentType = 'platform' | 'left' | 'center';

type BaseHeaderProps = {
  children?: React.ReactNode;
};

export type HeaderOuterProps = BaseHeaderProps & {
  noBottomBorder?: boolean;
  headerRef?: React.MutableRefObject<View | null>;
  sticky?: boolean;
};

export type HeaderContentProps = BaseHeaderProps & {
  align?: AlignmentType;
};

export type HeaderTitleTextProps = BaseHeaderProps &
  TextStyleProp & {
    children: React.ReactNode;
  };

// Context
const AlignmentContext = createContext<AlignmentType>('platform');

// Custom Hooks
const useAlignment = () => {
  const align = useContext(AlignmentContext);
  const isTextCentered = (isIOS && align === 'platform') || align === 'center';

  return {
    align,
    isTextCentered,
  };
};

const useHeaderResponsiveStyles = () => {
  const { gtMobile } = useBreakpoints();

  return {
    gtMobile,
    responsiveMaxWidth: gtMobile
      ? [a.mx_auto, { maxWidth: LAYOUT_CONSTANTS.MAX_CONTENT_WIDTH }]
      : [],
    responsiveTextSize: gtMobile ? a.text_xl : a.text_lg,
  };
};

// Styles
const styles = StyleSheet.create({
  headerSlot: {
    width: LAYOUT_CONSTANTS.HEADER_SLOT_SIZE,
    zIndex: 50,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    minHeight: LAYOUT_CONSTANTS.HEADER_SLOT_SIZE,
  },
});

// Components
export function HeaderOuter({
  children,
  noBottomBorder,
  headerRef,
  sticky = true,
}: HeaderOuterProps) {
  const t = useTheme();
  const gutters = useGutters([0, 'base']);
  const { responsiveMaxWidth } = useHeaderResponsiveStyles();

  return (
    <View
      ref={headerRef}
      style={[
        a.w_full,
        !noBottomBorder && a.border_b,
        a.flex_row,
        a.align_center,
        a.gap_sm,
        sticky && web([a.sticky, { top: 0 }, a.z_10, t.atoms.bg]),
        gutters,
        platform({
          native: [{ minHeight: LAYOUT_CONSTANTS.HEADER_HEIGHT.NATIVE }],
          web: [a.py_xs, { minHeight: LAYOUT_CONSTANTS.HEADER_HEIGHT.WEB }],
        }),
        ...responsiveMaxWidth,
        { backgroundColor: t.palette.background },
      ]}
    >
      {children}
    </View>
  );
}

export function HeaderContent({
  children,
  align = 'platform',
}: HeaderContentProps) {
  const { isTextCentered } = useAlignment();

  return (
    <View style={[styles.headerContent, isTextCentered && a.align_center]}>
      <AlignmentContext.Provider value={align}>
        {children}
      </AlignmentContext.Provider>
    </View>
  );
}

export function HeaderSlot({ children }: BaseHeaderProps) {
  return <View style={styles.headerSlot}>{children}</View>;
}

export function HeaderTitleText({ children, style }: HeaderTitleTextProps) {
  const { isTextCentered } = useAlignment();
  const { responsiveTextSize } = useHeaderResponsiveStyles();

  return (
    <Text
      style={[
        responsiveTextSize,
        a.font_heavy,
        a.leading_tight,
        isTextCentered && a.text_center,
        style,
      ]}
      numberOfLines={LAYOUT_CONSTANTS.MAX_TITLE_LINES}
    >
      {children}
    </Text>
  );
}

export function SubtitleText({ children }: { children: React.ReactNode }) {
  const { isTextCentered } = useAlignment();

  return (
    <Text
      style={[a.text_sm, a.leading_snug, isTextCentered && a.text_center]}
      numberOfLines={LAYOUT_CONSTANTS.MAX_TITLE_LINES}
    >
      {children}
    </Text>
  );
}
