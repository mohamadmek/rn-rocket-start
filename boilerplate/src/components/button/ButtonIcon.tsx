import React from 'react';
import { useSharedButtonTextStyles } from './ButtonText';
import { View } from 'react-native';
import { atoms as a } from '@/src/theme';
import { useButtonContext } from './ButtonContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export function ButtonIcon({
  name,
  position,
  size,
  color,
}: {
  name: keyof typeof MaterialIcons.glyphMap;
  position?: 'left' | 'right';
  size?: 'large' | 'small' | 'tiny';
  color?: string;
}) {
  const { size: buttonSize, disabled } = useButtonContext();
  const textStyles = useSharedButtonTextStyles();
  const { iconSize, iconContainerSize } = React.useMemo(() => {
    /**
     * Pre-set icon sizes for different button sizes
     */
    const iconSizeShorthand = {
      large: 'lg',
      small: 'sm',
      tiny: 'xs',
    }[size || 'small'];

    /*
     * Copied here from icons/common.tsx so we can tweak if we need to, but
     * also so that we can calculate transforms.
     */
    const iconSize = {
      xs: 12,
      sm: 16,
      lg: 24,
    }[iconSizeShorthand];

    /*
     * Goal here is to match rendered text size so that different size icons
     * don't increase button size
     */
    const iconContainerSize = {
      large: 18,
      small: 16,
      tiny: 13,
    }[buttonSize || 'small'];

    return {
      iconSize,
      iconContainerSize,
    };
  }, [buttonSize, size]);

  return (
    <View
      style={[
        a.z_20,
        {
          width: iconContainerSize,
          height: iconContainerSize,
          opacity: disabled ? 0.7 : 1,
          marginLeft: position === 'left' ? -4 : 0,
          marginRight: position === 'right' ? -4 : 0,
        },
      ]}
    >
      <View
        style={[
          a.absolute,
          {
            width: iconSize,
            height: iconSize,
            top: '50%',
            left: '50%',
            transform: [
              {
                translateX: ((iconSize ?? 0) / 2) * -1,
              },
              {
                translateY: ((iconSize ?? 0) / 2) * -1,
              },
            ],
          },
        ]}
      >
        <MaterialIcons
          name={name}
          size={iconSize}
          color={color || textStyles.color}
        />
      </View>
    </View>
  );
}
