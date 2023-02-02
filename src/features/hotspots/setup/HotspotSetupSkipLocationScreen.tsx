import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useOnboarding } from '@helium/react-native-sdk'
import Config from 'react-native-config'
import { HotspotType } from '@helium/onboarding'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import BackScreen from '../../../components/BackScreen'
import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupSkipLocationScreen'
>

const HotspotSetupSkipLocationScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()
  const { getOnboardTransactions, getOnboardingRecord } = useOnboarding()
  const [loading, setLoading] = useState(false)

  const { params } = useRoute<Route>()

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  const navNext = useCallback(async () => {
    setLoading(true)
    try {
      const onboardingRecord = await getOnboardingRecord(params.hotspotAddress)
      let hotspotTypes = [] as HotspotType[]
      /*
         TODO: Determine which network types this hotspot supports
         Could possibly use the maker address
      */
      if (Config.MAKER_ADDRESS_5G === onboardingRecord?.maker.address) {
        hotspotTypes = ['iot', 'mobile']
      } else {
        hotspotTypes = ['iot']
      }

      const onboardTxns = await getOnboardTransactions({
        txn: params.addGatewayTxn,
        hotspotAddress: params.hotspotAddress,
        hotspotTypes,
      })
      navigation.replace('HotspotTxnsProgressScreen', {
        addGatewayTxn: onboardTxns.addGatewayTxn || '',
        hotspotAddress: params.hotspotAddress,
        solanaTransactions: onboardTxns.solanaTransactions,
        assertLocationTxn: '',
      })
    } catch (e) {
      setLoading(false)
    }
  }, [getOnboardTransactions, getOnboardingRecord, navigation, params])

  return (
    <BackScreen onClose={handleClose}>
      <Box flex={1} justifyContent="center" paddingBottom="xxl">
        <Text variant="h1" marginBottom="l" maxFontSizeMultiplier={1}>
          {t('hotspot_setup.skip_location.title')}
        </Text>
        <Text
          variant="subtitle1"
          color="secondary"
          marginBottom={{ phone: 'l', smallPhone: 'ms' }}
        >
          {t('hotspot_setup.skip_location.subtitle_1')}
        </Text>
        <Text
          variant="subtitle2"
          marginBottom={{ phone: 'xl', smallPhone: 'ms' }}
          numberOfLines={2}
          adjustsFontSizeToFit
          maxFontSizeMultiplier={1.3}
        >
          {t('hotspot_setup.skip_location.subtitle_2')}
        </Text>
      </Box>
      <Box>
        <DebouncedButton
          loading={loading}
          title={t('hotspot_setup.location_fee.next')}
          mode="contained"
          variant="secondary"
          disabled={loading}
          onPress={navNext}
        />
      </Box>
    </BackScreen>
  )
}

export default HotspotSetupSkipLocationScreen
