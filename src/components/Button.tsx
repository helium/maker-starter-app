/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ActivityIndicator, TextStyle } from 'react-native'
import { BoxProps } from '@shopify/restyle'
import { SvgProps } from 'react-native-svg'
import Text from './Text'
import { Colors, TextVariant, Theme } from '../theme/theme'
import TouchableOpacityBox from './TouchableOpacityBox'
import Box from './Box'
import WithDebounce from './WithDebounce'
import { useColors } from '../theme/themeHooks'

type Props = BoxProps<Theme> & {
  mode?: 'text' | 'contained'
  variant?: ButtonVariant
  onPress?: () => void
  disabled?: boolean
  title?: string
  textStyle?: TextStyle
  textVariant?: TextVariant
  color?: Colors
  backgroundColor?: Colors
  Icon?: React.FC<SvgProps>
  loading?: boolean
}

type ButtonVariant = 'primary' | 'secondary' | 'destructive'

const containedBackground = {
  primary: 'surfaceContrast',
  secondary: 'secondary',
  destructive: 'error',
} as Record<string, Colors>

const Button = ({
  onPress,
  title,
  mode = 'text',
  variant = 'primary',
  color,
  textStyle,
  textVariant,
  disabled,
  height,
  Icon,
  backgroundColor,
  loading,
  ...rest
}: Props) => {
  const colors = useColors()
  const getBackground = (): Colors | undefined => {
    if (backgroundColor) return backgroundColor
    if (mode !== 'contained') return undefined
    return containedBackground[variant]
  }

  const getTextColor = (): Colors => {
    if (color) return color

    if (mode === 'contained') {
      if (variant === 'secondary') {
        return 'secondaryText'
      }
      return 'surfaceContrastText'
    }

    if (variant === 'secondary') {
      return 'secondaryText'
    }

    return 'primaryText'
  }

  const getTextVariant = () => {
    if (textVariant) return textVariant
    return 'subtitle2'
  }

  return (
    <Box style={{ opacity: disabled ? 0.2 : 1 }} {...rest} height={height}>
      <TouchableOpacityBox
        height={height}
        backgroundColor={getBackground()}
        borderRadius="m"
        onPress={onPress}
        disabled={disabled}
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        paddingHorizontal="ms"
      >
        {!!Icon && (
          <Box marginEnd="xxs">
            <Icon color={colors[getTextColor()]} height={10} />
          </Box>
        )}
        <Text
          maxFontSizeMultiplier={1.2}
          alignSelf="center"
          paddingVertical={height ? undefined : 'lm'}
          variant={getTextVariant()}
          color={getTextColor()}
          style={textStyle}
        >
          {title}
        </Text>
        {loading && (
          <Box marginStart="s">
            <ActivityIndicator color={colors[getTextColor()]} />
          </Box>
        )}
      </TouchableOpacityBox>
    </Box>
  )
}

export default Button

export const DebouncedButton = WithDebounce(Button)
