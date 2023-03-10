import React, { memo } from 'react'
import {
  ActivityIndicatorProps,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native'
import { Colors } from '../theme/theme'
import { useColors } from '../theme/themeHooks'

type Props = { color?: Colors } & ActivityIndicatorProps
const ActivityIndicator = ({ color, ...props }: Props) => {
  const colors = useColors()
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RNActivityIndicator color={colors[color || 'secondaryText']} {...props} />
  )
}

export default memo(ActivityIndicator)
