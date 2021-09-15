import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupPickHotspotScreen'
>
const HotspotSetupBluetoothError = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  return (
    <Box flex={1}>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text
          marginTop="l"
          variant="h1"
          maxFontSizeMultiplier={1}
          textAlign="center"
          numberOfLines={2}
          adjustsFontSizeToFit
          marginBottom="xxl"
        >
          {t('hotspot_setup.ble_error.title')}
        </Text>

        <Box flexDirection="row">
          <Box
            flex={3}
            backgroundColor="secondaryBackground"
            borderTopLeftRadius="m"
            borderBottomLeftRadius="m"
            padding="m"
          >
            <Text variant="body2" marginBottom="xs">
              {t('hotspot_setup.ble_error.enablePairing')}
            </Text>
            <Text variant="body2">
              {t('hotspot_setup.ble_error.pairingInstructions')}
            </Text>
          </Box>
          <Box
            flex={1}
            backgroundColor="secondary"
            borderTopRightRadius="m"
            borderBottomRightRadius="m"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              width={28}
              height={28}
              borderRadius="round"
              backgroundColor="primary"
              shadowColor="primary"
              shadowOpacity={1}
              shadowOffset={{ width: 0, height: 0 }}
              shadowRadius={8}
            />
          </Box>
        </Box>
      </Box>
      <DebouncedButton
        onPress={() => navigation.replace('HotspotSetupScanningScreen', params)}
        mode="contained"
        variant="primary"
        title={t('generic.scan_again')}
        backgroundColor="surfaceContrast"
        color="surfaceContrastText"
      />
    </Box>
  )
}

export default HotspotSetupBluetoothError
