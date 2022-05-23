import React, { memo, useEffect, useState } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { useAnalytics } from '@segment/analytics-react-native'
import { WebView } from 'react-native-webview'

import Box from '../../components/Box'

import useMount from '../../utils/useMount'

import { getAddress } from '../../utils/secureAccount'

const SupportScreen = () => {
  // Set segment identity
  const { identify } = useAnalytics()
  const [address, setAddress] = useState<string>()

  const [identified, setIdentified] = useState(false)

  useMount(() => {
    getAddress().then(setAddress)
  })

  useEffect(() => {
    if (address && !identified) {
      identify(address)

      setIdentified(true)
    }
  }, [address, identified, identify])

  return (
    <Box backgroundColor="primaryBackground" flex={1}>
      <BottomSheetModalProvider>
        <Box
          padding="l"
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
            style={{ marginTop: 30 }}
          />
        </Box>
      </BottomSheetModalProvider>
    </Box>
  )
}

export default memo(SupportScreen)
