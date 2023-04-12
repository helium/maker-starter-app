import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useHotspotBle } from '@helium/react-native-sdk'
import { ActivityIndicator, Platform } from 'react-native'
import {
  checkMultiple,
  PERMISSIONS,
  PermissionStatus,
  requestMultiple,
} from 'react-native-permissions'
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
import useMount from '../../../utils/useMount'

type Route = RouteProp<HotspotSetupStackParamList, 'HotspotSetupScanningScreen'>

const isReady = (
  statuses: Record<
    | 'android.permission.ACCESS_FINE_LOCATION'
    | 'android.permission.BLUETOOTH_CONNECT'
    | 'android.permission.BLUETOOTH_SCAN',
    PermissionStatus
  >,
) =>
  statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'granted' &&
  statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === 'granted' &&
  statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] === 'granted'

const REQUIRED_PERMISSIONS = [
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
  PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
]

const isAndroid = Platform.OS === 'android'
const SCAN_DURATION = 6000
const HotspotSetupScanningScreen = () => {
  const canceled = useRef(false)
  const { t } = useTranslation()
  const { primaryText } = useColors()
  const { startScan, stopScan } = useHotspotBle()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const [ready, setReady] = useState<boolean | undefined>(
    isAndroid ? undefined : true,
  )

  const requestBlePermissions = useCallback(() => {
    if (isAndroid && !ready) {
      requestMultiple(REQUIRED_PERMISSIONS).then((statuses) => {
        setReady(isReady(statuses))
      })
    }
  }, [ready])

  useMount(() => {
    if (!isAndroid) return

    checkMultiple(REQUIRED_PERMISSIONS).then((statuses) => {
      const nextReady = isReady(statuses)
      if (nextReady) {
        setReady(true)
      } else {
        requestBlePermissions()
      }
    })
  })

  useEffect(() => {
    if (!ready) return

    const scan = async () => {
      await startScan((error) => {
        if (error) {
          // TODO: handle error
          // eslint-disable-next-line no-console
          console.log(error)
        }
      })
      await sleep(SCAN_DURATION)
      stopScan()
      if (!canceled.current) {
        navigation.replace('HotspotSetupPickHotspotScreen', params)
      }
    }
    scan()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  const handleCancel = useCallback(() => {
    canceled.current = true
    navigation.goBack()
  }, [navigation])

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
        onPress={handleCancel}
        variant="primary"
        mode="text"
        title={t('hotspot_setup.ble_scan.cancel')}
      />
    </SafeAreaBox>
  )
}

export default HotspotSetupScanningScreen
