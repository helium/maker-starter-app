import React, { memo, useEffect } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { useAnalytics } from '@segment/analytics-react-native'
import { WebView } from 'react-native-webview'

import Box from '../../components/Box'

import { AppScreens } from '../../utils/analytics/screens'

const HmDashboardScreen = () => {
  const { screen } = useAnalytics()

  // Segment log screen visit
  useEffect(() => {
    screen(AppScreens.HMDASHBOARD)
  }, [screen])

  return (
    <Box backgroundColor="primaryBackground" flex={1}>
      <BottomSheetModalProvider>
        <Box
          flex={1}
          justifyContent="center"
          backgroundColor="primaryBackground"
          style={{
            flexDirection: 'column',
          }}
        >
          <WebView
            source={{
              uri: 'https://dashboard.nebra.com/',
            }}
            style={{ marginTop: 70 }}
          />
        </Box>
      </BottomSheetModalProvider>
    </Box>
  )
}

export default memo(HmDashboardScreen)
