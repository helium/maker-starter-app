import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useHotspotBle } from '@helium/react-native-sdk'
import {
  ActivityIndicator,
  Permission,
  PermissionsAndroid,
  Platform,
} from 'react-native'
import { useAnalytics } from '@segment/analytics-react-native'
import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Text from '../../../components/Text'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import sleep from '../../../utils/sleep'
import { useColors } from '../../../theme/themeHooks'
import {
  getEvent,
  Scope,
  SubScope,
  Action,
} from '../../../utils/analytics/utils'

type Route = RouteProp<HotspotSetupStackParamList, 'HotspotSetupScanningScreen'>

const SCAN_DURATION = 6000
const HotspotSetupScanningScreen = () => {
  const { t } = useTranslation()
  const { primaryText } = useColors()
  const { startScan, stopScan } = useHotspotBle()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<HotspotSetupNavigationProp>()

  const { track } = useAnalytics()

  useEffect(() => {
    const getBlePermissions = async () => {
      let neededPermissions: Permission[] = []

      const connectAllowed = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      )
      if (!connectAllowed) {
        console.log('connect Allowed: ', connectAllowed)
        neededPermissions.push(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT)
      }

      const scanAllowed = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      )
      if (!scanAllowed) {
        console.log('scan Allowed: ', scanAllowed)
        neededPermissions.push(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN)
      }

      if (neededPermissions.length > 0) {
        const granted = await PermissionsAndroid.requestMultiple(
          neededPermissions,
        )

        let allGranted = true
        Object.values(granted).forEach((value) => {
          allGranted = value === PermissionsAndroid.RESULTS.GRANTED
        })

        if (allGranted) {
          console.log('we can scan for bluetooth devices now.')
        } else {
          console.log('no luck with bluetooth permissions')
        }
      }
    }

    const scan = async () => {
      // Segment track for bluetooth scan
      const startTimestamp = Date.now()
      track(
        getEvent({
          scope: Scope.HOTSPOT,
          sub_scope: SubScope.BLUETOOTH_CONNECTION,
          action: Action.STARTED,
        }),
      )

      if (Platform.OS === 'android') {
        await getBlePermissions()
      }

      await startScan((error) => {
        if (error) {
          // TODO: handle error
          // eslint-disable-next-line no-console
          console.log(error)
        }
      })

      await sleep(SCAN_DURATION)
      stopScan()

      // Segment track for bluetooth scan
      const endTimestamp = Date.now()
      track(
        getEvent({
          scope: Scope.HOTSPOT,
          sub_scope: SubScope.BLUETOOTH_CONNECTION,
          action: Action.FINISHED,
        }),
        {
          elapsed_milliseconds: endTimestamp - startTimestamp,
        },
      )

      navigation.replace('HotspotSetupPickHotspotScreen', params)
    }

    scan()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SafeAreaBox
      backgroundColor="primaryBackground"
      flex={1}
      alignItems="center"
    >
      <Box flex={1} />

      <Text
        marginTop="xl"
        variant="body2"
        numberOfLines={1}
        adjustsFontSizeToFit
        textAlign="center"
      >
        {t('hotspot_setup.ble_scan.title')}
      </Text>
      <Box flex={1} justifyContent="center">
        <ActivityIndicator color={primaryText} />
      </Box>
      <DebouncedButton
        marginBottom="m"
        justifyContent="flex-end"
        onPress={navigation.goBack}
        variant="primary"
        mode="text"
        title={t('hotspot_setup.ble_scan.cancel')}
      />
    </SafeAreaBox>
  )
}

export default HotspotSetupScanningScreen
