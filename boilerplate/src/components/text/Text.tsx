import { isNative } from '@/src/platform/detection';
import {
  Alf,
  applyFonts,
  atoms as a,
  flatten,
  useAlf,
  useTheme,
  web,
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

interface ITextProps extends RNTextProps {
  bold?: boolean;
  semiBold?: boolean;
  size?: TSizes;
  type?: TTextType;
}

export const Text = ({
  style,
  children,
  bold,
  semiBold,
  size = 'text_sm',
  type,
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

/*
 * Not Tested!
 */
function createHeadingElement({ level }: { level: number }) {
  return function HeadingElement({ style, ...rest }: RNTextProps) {
    const attr = web({
      role: 'heading',
      'aria-level': level,
    }) || {
      role: 'heading',
      'aria-level': level,
    };
    return <Text {...attr} {...rest} style={style} />;
  };
}

/*
 * Use semantic components when it's beneficial to the user or to a web scraper
 * Not Tested!
 */
export const H1 = createHeadingElement({ level: 1 });
export const H2 = createHeadingElement({ level: 2 });
export const H3 = createHeadingElement({ level: 3 });
export const H4 = createHeadingElement({ level: 4 });
export const H5 = createHeadingElement({ level: 5 });
export const H6 = createHeadingElement({ level: 6 });
export function P({ style, ...rest }: RNTextProps) {
  const attr =
    web({
      role: 'paragraph',
    }) || {};
  return (
    <Text
      {...attr}
      {...rest}
      style={[a.text_md, a.leading_normal, flatten(style)]}
    />
  );
}
