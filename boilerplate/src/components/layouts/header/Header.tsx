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
import { createContext, useContext } from 'react';
import { View } from 'react-native';
import { Text } from '../../text/Text';

const HEADER_SLOT_SIZE = 34;

export function HeaderOuter({
  children,
  noBottomBorder,
  headerRef,
  sticky = true,
}: {
  children: React.ReactNode;
  noBottomBorder?: boolean;
  headerRef?: React.MutableRefObject<View | null>;
  sticky?: boolean;
}) {
  const t = useTheme();
  const gutters = useGutters([0, 'base']);
  const { gtMobile } = useBreakpoints();

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
          native: [{ minHeight: 48 }],
          web: [a.py_xs, { minHeight: 52 }],
        }),
        gtMobile && [a.mx_auto, { maxWidth: 600 }],
        { backgroundColor: t.palette.background },
      ]}
    >
      {children}
    </View>
  );
}

const AlignmentContext = createContext<'platform' | 'left' | 'center'>(
  'platform',
);

export function HeaderContent({
  children,
  align = 'platform',
}: {
  children?: React.ReactNode;
  align?: 'platform' | 'left' | 'center';
}) {
  return (
    <View
      style={[
        a.flex_1,
        a.justify_center,
        ((isIOS && align === 'platform') || align === 'center') &&
          a.align_center,

        { minHeight: HEADER_SLOT_SIZE },
      ]}
    >
      <AlignmentContext.Provider value={align}>
        {children}
      </AlignmentContext.Provider>
    </View>
  );
}

export function HeaderSlot({ children }: { children?: React.ReactNode }) {
  return <View style={[a.z_50, { width: HEADER_SLOT_SIZE }]}>{children}</View>;
}

export function HeaderTitleText({
  children,
  style,
}: { children: React.ReactNode } & TextStyleProp) {
  const { gtMobile } = useBreakpoints();
  const align = useContext(AlignmentContext);
  return (
    <Text
      style={[
        a.text_lg,
        a.font_heavy,
        a.leading_tight,
        isIOS && align === 'platform' && a.text_center,
        gtMobile && a.text_xl,
        style,
      ]}
      numberOfLines={2}
    >
      {children}
    </Text>
  );
}

export function SubtitleText({ children }: { children: React.ReactNode }) {
  const align = useContext(AlignmentContext);
  return (
    <Text
      style={[
        a.text_sm,
        a.leading_snug,
        isIOS && align === 'platform' && a.text_center,
      ]}
      numberOfLines={2}
    >
      {children}
    </Text>
  );
}
