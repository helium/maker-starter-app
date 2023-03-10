import { BoxProps } from '@shopify/restyle'
import React, { memo, ReactNode, FC, useMemo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Theme } from '../theme/theme'
import { useColors } from '../theme/themeHooks'
import { FadeInSlow, FadeOutSlow } from '../utils/animations'
import { ReAnimatedBox } from './AnimatedBox'

type Props = {
  children: ReactNode
  style?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>
  slow?: boolean
} & BoxProps<Theme>

const Fade = ({ children, style, slow, ...boxProps }: Props) => {
  const { primaryBackground } = useColors()
  const defaultStyle = useMemo(
    () => ({ backgroundColor: primaryBackground, flex: 1 }),
    [primaryBackground],
  )

  return (
    <ReAnimatedBox
      entering={slow ? FadeInSlow : FadeIn}
      exiting={slow ? FadeOutSlow : FadeOut}
      style={style || defaultStyle}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...boxProps}
    >
      {children}
    </ReAnimatedBox>
  )
}

export default memo(Fade)

export const withFade = (Component: FC) => () =>
  (
    <Fade slow>
      <Component />
    </Fade>
  )
