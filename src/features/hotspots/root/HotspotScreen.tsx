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
import MapboxGL from '@react-native-mapbox-gl/maps'
import Config from 'react-native-config'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HOTSPOT_TYPE, HotspotStackParamList } from './hotspotTypes'
import Text from '../../../components/Text'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Button from '../../../components/Button'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import Box from '../../../components/Box'
import Settings from '../../../assets/images/settings.svg'
import {
  useColors,
  useHitSlop,
  useOpacity,
  useSpacing,
} from '../../../theme/themeHooks'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import ListSeparator from '../../../components/ListSeparator'

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
const HotspotScreen = () => {
  const {
    params: { hotspot },
  } = useRoute<Route>()
  const { t } = useTranslation()
  const nav = useNavigation<RootNavigationProp>()
  const [details, setDetails] = useState<HotspotDetails>()
  const [loadingDetails, setLoadingDetails] = useState(true)
  const { getHotspotDetails } = useOnboarding()
  const colors = useColors()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { bottom } = useSafeAreaInsets()
  const spacing = useSpacing()
  const hitSlop = useHitSlop('l')

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

  const updateHotspotDetails = useCallback(async () => {
    const hotspotMeta = await getHotspotDetails({
      address: hotspot.address,
      type: HOTSPOT_TYPE,
    })
    setDetails(hotspotMeta)
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
    () => nav.push('TransferHotspot', { hotspotAddress: hotspot.address }),
    [hotspot.address, nav],
  )

  const snapPoints = useMemo(() => {
    const handleHeight = 72
    return [SETTINGS_DATA.length * LIST_ITEM_HEIGHT + bottom + handleHeight]
  }, [bottom])

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

  const settingsKeyExtractor = useCallback((item: string) => {
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

  const handleSettings = useCallback(() => {
    bottomSheetModalRef.current?.present()
    // setSelectedHotspot(item)
  }, [])

  return (
    <SafeAreaBox
      backgroundColor="primaryBackground"
      flex={1}
      paddingHorizontal="l"
      justifyContent="center"
    >
      <Box flexDirection="row" marginHorizontal="s" alignItems="center">
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
          marginBottom="s"
          hitSlop={hitSlop}
          onPress={handleSettings}
        >
          <Settings width={22} height={22} color={colors.graySteel} />
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
      {details?.lat && details.lng && (
        <Box
          height={200}
          width="100%"
          borderRadius="xl"
          overflow="hidden"
          marginTop="xxl"
        >
          <MapboxGL.MapView
            styleURL={Config.MAPBOX_STYLE_URL}
            style={{ height: 200, width: '100%' }}
          >
            <MapboxGL.Camera
              defaultSettings={{
                centerCoordinate: [details.lng, details.lat],
                zoomLevel: 9,
              }}
            />
          </MapboxGL.MapView>
          <Box
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            alignItems="center"
            justifyContent="center"
            pointerEvents="none"
          >
            <Box
              height={16}
              borderRadius="round"
              width={16}
              backgroundColor="greenMain"
              pointerEvents="none"
            />
          </Box>
        </Box>
      )}

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
        <BottomSheetFlatList
          data={SETTINGS_DATA}
          renderItem={renderSetting}
          keyExtractor={settingsKeyExtractor}
          ItemSeparatorComponent={ListSeparator}
        />
      </BottomSheetModal>
    </SafeAreaBox>
  )
}

export default memo(HotspotScreen)
