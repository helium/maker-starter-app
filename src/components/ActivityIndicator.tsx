import React from 'react'
import { ActivityIndicator as ActivityIndicatorNative } from 'react-native'

import { useColors } from '../theme/themeHooks'
import Box from './Box'

const ActivityIndicator = () => {
  const { primary } = useColors()

  return <ActivityIndicatorNative color={primary} />
}

const ActivityIndicatorCentered = () => {
  return (
    <Box flex={1} justifyContent="center">
      <ActivityIndicator />
    </Box>
  )
}

export { ActivityIndicator, ActivityIndicatorCentered }
