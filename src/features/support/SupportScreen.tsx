import React, { memo, useEffect } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { useAnalytics } from '@segment/analytics-react-native'
import { WebView } from 'react-native-webview'

import Box from '../../components/Box'

import { getEvent, Scope, Action } from '../../utils/analytics/utils'

const SupportScreen = () => {
  const { screen } = useAnalytics()

  useEffect(() => {
    screen(
      getEvent({
        scope: Scope.SUPPORT,
        action: Action.VISITED,
      }),
    )
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
              uri: 'https://support.nebra.com/support/solutions/24000003609',
            }}
            style={{ marginTop: 70 }}
          />
        </Box>
      </BottomSheetModalProvider>
    </Box>
  )
}

export default memo(SupportScreen)
