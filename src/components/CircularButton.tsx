/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { BoxProps } from '@shopify/restyle'
import { SvgProps } from 'react-native-svg'
import { Colors, Theme } from '../theme/theme'
import TouchableOpacityBox from './TouchableOpacityBox'
import Box from './Box'
import WithDebounce from './WithDebounce'
import { useColors } from '../theme/themeHooks'

type Props = BoxProps<Theme> & {
  mode?: 'text' | 'contained'
  variant?: ButtonVariant
  onPress?: () => void
  disabled?: boolean
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

const CircularButton = ({
  onPress,

  mode = 'text',
  variant = 'primary',
  color,
  marginBottom,
  disabled,
  height,
  Icon,
  backgroundColor,
  loading,
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

  return (
    <Box
      style={{
        opacity: disabled ? 0.2 : 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      height={height}
    >
      <TouchableOpacityBox
        height={height}
        width={height}
        backgroundColor={getBackground()}
        borderRadius="round"
        onPress={onPress}
        disabled={disabled}
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        paddingHorizontal="ms"
        marginBottom={marginBottom}
      >
        {!!Icon && (
          <Box marginEnd="xxs">
            <Icon color={colors[getTextColor()]} height={30} />
          </Box>
        )}

        {loading && (
          <Box marginStart="s">
            <ActivityIndicator color={colors[getTextColor()]} />
          </Box>
        )}
      </TouchableOpacityBox>
    </Box>
  )
}

export default CircularButton

export const DebouncedButton = WithDebounce(CircularButton)
