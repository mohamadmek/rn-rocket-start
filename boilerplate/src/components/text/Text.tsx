import { isNative } from '@/src/platform/detection';
import {
  Alf,
  applyFonts,
  atoms as a,
  flatten,
  useAlf,
  useTheme,
} from '@/src/theme';
import {
  StyleProp,
  TextStyle,
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';

export function normalizeTextStyles(
  styles: StyleProp<TextStyle>,
  {
    fontScale,
    fontFamily,
  }: {
    fontScale: number;
    fontFamily: Alf['fonts']['family'];
  } & Pick<Alf, 'flags'>,
) {
  const s = flatten(styles);
  // should always be defined on these components
  s.fontSize = (s.fontSize || a.text_md.fontSize) * fontScale;

  if (s?.lineHeight) {
    if (s.lineHeight !== 0 && s.lineHeight <= 2) {
      s.lineHeight = Math.round(s.fontSize * s.lineHeight);
    }
  } else if (!isNative) {
    s.lineHeight = s.fontSize;
  }

  applyFonts(s, fontFamily);

  return s;
}

const sizes = {
  text_2xs: a.text_2xs,
  text_xs: a.text_xs,
  text_sm: a.text_sm,
  text_md: a.text_md,
  text_lg: a.text_lg,
  text_xl: a.text_xl,
  text_2xl: a.text_2xl,
  text_3xl: a.text_3xl,
  text_4xl: a.text_4xl,
  text_5xl: a.text_5xl,
} as const;
type TSizes = keyof typeof sizes;

type TTextType = 'error';

export interface ITextProps extends RNTextProps {
  bold?: boolean;
  semiBold?: boolean;
  size?: TSizes;
  type?: TTextType;
  center?: boolean;
}

export const Text = ({
  style,
  children,
  bold,
  semiBold,
  size = 'text_sm',
  type,
  center,
  ...rest
}: ITextProps) => {
  const { fonts, flags } = useAlf();
  const t = useTheme();

  const textStyles: TextStyle[] = [sizes[size], t.atoms.text, flatten(style)];
  if (bold) {
    textStyles.push(a.font_bold);
  }
  if (semiBold) {
    textStyles.push(a.font_semiBold);
  }
  if (type === 'error') {
    textStyles.push({ color: t.palette.error });
  }

  if (center) {
    textStyles.push(a.text_center);
  }

  const s = normalizeTextStyles(textStyles, {
    fontScale: fonts.scaleMultiplier,
    fontFamily: fonts.family,
    flags,
  });

  const shared = {
    style: s,
    dataSet: Object.assign({ tooltip: '' }, {}),
    ...rest,
  };

  return <RNText {...shared}>{children}</RNText>;
};
