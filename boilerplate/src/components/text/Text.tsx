import { isNative } from '@/src/platform/detection';
import {
  Alf,
  applyFonts,
  atoms,
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
  s.fontSize = (s.fontSize || atoms.text_md.fontSize) * fontScale;

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

export const Text = ({ style, children, ...rest }: RNTextProps) => {
  const { fonts, flags } = useAlf();
  const t = useTheme();
  const s = normalizeTextStyles([atoms.text_sm, t.atoms.text, flatten(style)], {
    fontScale: fonts.scaleMultiplier,
    fontFamily: fonts.family,
    flags,
  });

  const shared = {
    style: s,
    dataSet: Object.assign({ tooltip: 'mohamad' }, {}),
    ...rest,
  };

  return <RNText {...shared}>{children}</RNText>;
};

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
      style={[atoms.text_md, atoms.leading_normal, flatten(style)]}
    />
  );
}
