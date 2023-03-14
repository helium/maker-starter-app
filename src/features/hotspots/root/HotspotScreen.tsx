import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import animalName from 'angry-purple-tiger'
import { useTranslation } from 'react-i18next'
import { useOnboarding } from '@helium/react-native-sdk'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Clipboard from '@react-native-community/clipboard'
import Toast from 'react-native-simple-toast'
import { HotspotStackParamList } from './hotspotTypes'
import Text from '../../../components/Text'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Button from '../../../components/Button'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import Box from '../../../components/Box'
import Settings from '../../../assets/images/settings.svg'
import Kabob from '../../../assets/images/kabob.svg'
import {
  useColors,
  useOpacity,
  useSpacing,
  useVerticalHitSlop,
} from '../../../theme/themeHooks'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import ListSeparator from '../../../components/ListSeparator'
import useHaptic from '../../../utils/useHaptic'
import HotspotLocationPreview from '../setup/HotspotLocationPreview'

type Route = RouteProp<HotspotStackParamList, 'HotspotScreen'>
type HotspotDetails = {
  lat?: number
  lng?: number
  location?: string
  elevation?: number
  gain?: number
}
const LIST_ITEM_HEIGHT = 80
const SETTINGS_DATA = ['diagnostics', 'wifi'] as const
export type Setting = (typeof SETTINGS_DATA)[number]

const KABOB_DATA = ['copyAddress'] as const
export type KabobItem = (typeof KABOB_DATA)[number]

const HotspotScreen = () => {
  const {
    params: { hotspot },
  } = useRoute<Route>()
  const { t } = useTranslation()
  const nav = useNavigation<RootNavigationProp>()
  const [details, setDetails] = useState<HotspotDetails>()
  const [menuType, setMenuType] = useState<'kabob' | 'settings'>('settings')
  const [loadingDetails, setLoadingDetails] = useState(true)
  const { getHotspotDetails } = useOnboarding()
  const colors = useColors()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { bottom } = useSafeAreaInsets()
  const spacing = useSpacing()
  const hitSlop = useVerticalHitSlop('l')
  const { triggerNotification } = useHaptic()

  const needsOnboarding = useMemo(
    () => !loadingDetails && !details,
    [details, loadingDetails],
  )

  const handleSettingPress = useCallback(
    (setting: Setting) => () => {
      bottomSheetModalRef.current?.dismiss()

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      nav.navigate('HotspotSetup', {
        screen: 'HotspotSetupScanningScreen',
        params: {
          hotspotType: 'Helium',
          gatewayAction: setting,
        },
      })
    },
    [nav],
  )

  const handleKabobPress = useCallback(
    (item: KabobItem) => () => {
      bottomSheetModalRef.current?.dismiss()

      switch (item) {
        case 'copyAddress': {
          Clipboard.setString(hotspot.address)
          triggerNotification('success')
          Toast.show(
            t('hotspots.copiedToClipboard', { address: hotspot.address }),
          )
        }
      }
    },
    [hotspot.address, t, triggerNotification],
  )

  const updateHotspotDetails = useCallback(async () => {
    try {
      const hotspotMeta = await getHotspotDetails({
        address: hotspot.address,
        type: 'IOT', // Both freedomfi and helium support iot
      })
      setDetails(hotspotMeta || {})
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
    setLoadingDetails(false)
  }, [getHotspotDetails, hotspot])

  useEffect(() => {
    return nav.addListener('focus', () => {
      updateHotspotDetails()
    })
  }, [nav, updateHotspotDetails])

  const formattedHotspotName = useMemo(() => {
    if (!hotspot || !hotspot.address) return ''

    const name = animalName(hotspot.address)
    const pieces = name.split(' ')
    if (pieces.length < 3) return name

    return [`${pieces[0]} ${pieces[1]}`, pieces[2]]
  }, [hotspot])

  const assertHotspot = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nav.navigate('HotspotAssert', {
      screen: 'HotspotSetupPickLocationScreen',
      params: { hotspotAddress: hotspot.address, hotspotType: 'Helium' },
    })
  }, [hotspot.address, nav])

  const transferHotspot = useCallback(
    () =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      nav.navigate('TransferHotspot', {
        screen: 'TransferHotspotScreen',
        params: { hotspotAddress: hotspot.address },
      }),
    [hotspot.address, nav],
  )

  const snapPoints = useMemo(() => {
    const handleHeight = 72
    return [
      (menuType === 'settings' ? SETTINGS_DATA.length : KABOB_DATA.length) *
        LIST_ITEM_HEIGHT +
        bottom +
        handleHeight,
    ]
  }, [bottom, menuType])

  const handleIndicatorStyle = useMemo(
    () => ({
      backgroundColor: colors.graySteel,
      opacity: 0.5,
      marginVertical: spacing.l,
      width: 80,
    }),
    [colors.graySteel, spacing.l],
  )

  const { backgroundStyle } = useOpacity('primaryBackground', 0.98)

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    ),
    [],
  )

  const keyExtractor = useCallback((item: string) => {
    return item
  }, [])

  const renderSetting = useCallback(
    ({ item }: { item: Setting; index: number }) => {
      return (
        <TouchableOpacityBox
          justifyContent="center"
          height={LIST_ITEM_HEIGHT}
          marginHorizontal="m"
          onPress={handleSettingPress(item)}
        >
          <Text variant="body1">{t(`hotspots.${item}`)}</Text>
        </TouchableOpacityBox>
      )
    },
    [handleSettingPress, t],
  )

  const renderKabob = useCallback(
    ({ item }: { item: KabobItem; index: number }) => {
      return (
        <TouchableOpacityBox
          justifyContent="center"
          height={LIST_ITEM_HEIGHT}
          marginHorizontal="m"
          onPress={handleKabobPress(item)}
        >
          <Text variant="body1">{t(`hotspots.${item}`)}</Text>
        </TouchableOpacityBox>
      )
    },
    [handleKabobPress, t],
  )

  const handleSettings = useCallback(() => {
    bottomSheetModalRef.current?.present()
    setMenuType('settings')
  }, [])

  const handleKabob = useCallback(() => {
    bottomSheetModalRef.current?.present()
    setMenuType('kabob')
  }, [])

  const centerCoordinate = useMemo(() => {
    if (!details?.lat || !details?.lng) return

    return [details.lng, details.lat]
  }, [details])

  return (
    <SafeAreaBox
      backgroundColor="primaryBackground"
      flex={1}
      paddingHorizontal="l"
      justifyContent="center"
    >
      <Box flexDirection="row" marginStart="s" alignItems="center">
        <Box flex={1}>
          <Text
            fontSize={29}
            lineHeight={31}
            color="primaryText"
            fontWeight="200"
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formattedHotspotName[0]}
          </Text>

          <Text
            variant="body1"
            fontSize={29}
            lineHeight={31}
            paddingRight="s"
            color="primaryText"
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formattedHotspotName[1]}
          </Text>
        </Box>
        <TouchableOpacityBox
          paddingLeft="s"
          paddingRight="xs"
          paddingBottom="s"
          hitSlop={hitSlop}
          onPress={handleSettings}
        >
          <Settings width={22} height={22} color={colors.graySteel} />
        </TouchableOpacityBox>
        <TouchableOpacityBox
          paddingBottom="s"
          paddingStart="xs"
          paddingEnd="s"
          hitSlop={hitSlop}
          onPress={handleKabob}
        >
          <Kabob width={22} height={22} color={colors.graySteel} />
        </TouchableOpacityBox>
      </Box>
      {needsOnboarding && (
        <Text
          color="primaryText"
          variant="body1"
          marginHorizontal="s"
          marginTop="s"
        >
          {t('hotspots.notOnboarded')}
        </Text>
      )}
      <Box
        height={200}
        width="100%"
        borderRadius="xl"
        overflow="hidden"
        marginTop="xxl"
      >
        <HotspotLocationPreview
          mapCenter={centerCoordinate}
          locationName={
            details && !centerCoordinate ? 'No asserted Location' : undefined
          }
        />
        {/* <MapboxGL.MapView
          styleURL={Config.MAPBOX_STYLE_URL}
          style={{ height: 200, width: '100%' }}
        >
          {centerCoordinate && (
            <MapboxGL.Camera
              defaultSettings={{
                centerCoordinate,
                zoomLevel: 9,
              }}
            />
          )}
        </MapboxGL.MapView> */}
      </Box>

      <Button
        onPress={assertHotspot}
        height={48}
        marginTop="l"
        mode="contained"
        title={t('hotspots.empty.hotspots.assertLocation')}
      />
      <Button
        onPress={transferHotspot}
        height={48}
        marginTop="l"
        mode="contained"
        title={t('hotspots.empty.hotspots.transfer')}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={handleIndicatorStyle}
        backgroundStyle={backgroundStyle}
        backdropComponent={renderBackdrop}
      >
        {menuType === 'settings' && (
          <BottomSheetFlatList
            data={SETTINGS_DATA}
            renderItem={renderSetting}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ListSeparator}
          />
        )}
        {menuType === 'kabob' && (
          <BottomSheetFlatList
            data={KABOB_DATA}
            renderItem={renderKabob}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ListSeparator}
          />
        )}
      </BottomSheetModal>
    </SafeAreaBox>
  )
}

export default memo(HotspotScreen)
