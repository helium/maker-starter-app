import React, { memo, useEffect } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { useAnalytics } from '@segment/analytics-react-native'
import { WebView } from 'react-native-webview'

import { URL, URLSearchParams } from 'react-native-url-polyfill'
import Box from '../../components/Box'

import { AppScreens } from '../../utils/analytics/screens'

const HmDashboardScreen = () => {
  const { screen } = useAnalytics()

  // Segment log screen visit
  useEffect(() => {
    screen(AppScreens.HMDASHBOARD)
  }, [screen])

  const utmCampaign = {
    utm_id: 'nebra_app.1',
    utm_source: Platform.OS === 'ios' ? 'nebra_app_ios' : 'nebra_app_android',
    utm_medium: 'app_home',
    utm_campaign: 'nebra_app',
  }

  const utmQueryString = new URLSearchParams(utmCampaign).toString()

  const getNebraDashboardUrl = () => {
    return `https://dashboard.nebra.com/?${utmQueryString}`
  }

  let webView = null

  const onLoadStart = (event) => {
    const url = new URL(event.nativeEvent.url)
    const urlQueryString = new URLSearchParams(url.searchParams)

    if (!urlQueryString.has('utm_campaign')) {
      webView.injectJavaScript(`window.location='${url}?${utmQueryString}'`)
    }
  }

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
            ref={(ref) => {
              webView = ref
            }}
            source={{
              uri: getNebraDashboardUrl(),
            }}
            style={{ marginTop: 70 }}
            onLoadStart={onLoadStart}
            startInLoadingState
            scalesPageToFit
            javaScriptEnabled
          />
        </Box>
      </BottomSheetModalProvider>
    </Box>
  )
}

export default memo(HmDashboardScreen)
