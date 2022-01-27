import React from 'react'
import { useTranslation } from 'react-i18next'
// import { Linking } from 'react-native'
// import Toast from 'react-native-simple-toast'

// import { EXPLORER_BASE_URL } from '../../../utils/config'
import Text from '../../../components/Text'
import Box from '../../../components/Box'

const HotspotDetailsScreen = () => {
  const { t } = useTranslation()

  // const openHotspotInExplorer = async (hotspotAddress: string) => {
  //   if (!hotspotAddress) return

  //   const url = `${EXPLORER_BASE_URL}/hotspots/${hotspotAddress}`
  //   const supported = await Linking.canOpenURL(url)
  //   if (supported) {
  //     await Linking.openURL(url)
  //   } else {
  //     Toast.showWithGravity(
  //       t('generic.openLinkError', { url }),
  //       Toast.LONG,
  //       Toast.CENTER,
  //     )
  //   }
  // }

  return (
    <Box
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
      paddingTop="l"
    >
      <Text variant="h2" textAlign="center">
        {t('hotspotDetailsScreen.title')}
      </Text>
    </Box>
  )
}

export default HotspotDetailsScreen
