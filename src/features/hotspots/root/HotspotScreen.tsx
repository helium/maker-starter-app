import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Clipboard from '@react-native-community/clipboard'
import Toast from 'react-native-simple-toast'
import { useSelector } from 'react-redux'
import { FadeIn } from 'react-native-reanimated'
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
import { ReAnimatedBox } from '../../../components/AnimatedBox'
import { DelayedFadeIn } from '../../../utils/animations'
import { useAppDispatch } from '../../../store/store'
import { getGeocodedAddress } from '../../../store/location/locationSlice'
import { RootState } from '../../../store/rootReducer'
import useDeveloperOptions from '../../../store/developer/useDeveloperOptions'
import useHotspot from '../../../store/hotspot/useHotspot'
import formatLocationName from '../../../utils/formatLocationName'

type Route = RouteProp<HotspotStackParamList, 'HotspotScreen'>

const LIST_ITEM_HEIGHT = 80
const SETTINGS_DATA = ['diagnostics', 'wifi'] as const
export type Setting = (typeof SETTINGS_DATA)[number]

const KABOB_DATA = [
  'copyAddress',
  'assertLocation',
  'transfer',
  'onboardIot',
  'onboardMobile',
] as const
export type KabobItem = (typeof KABOB_DATA)[number]

const HotspotScreen = () => {
  const {
    params: {
      hotspot: { address, animalName },
    },
  } = useRoute<Route>()
  const { t } = useTranslation()
  const nav = useNavigation<RootNavigationProp>()
  const [menuType, setMenuType] = useState<'kabob' | 'settings'>('settings')
  const colors = useColors()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { bottom } = useSafeAreaInsets()
  const spacing = useSpacing()
  const hitSlop = useVerticalHitSlop('l')
  const { triggerNotification } = useHaptic()
  const dispatch = useAppDispatch()
  const locations = useSelector((state: RootState) => state.location.locations)
  const { status } = useDeveloperOptions()
  const { hotspotDetails, loading, getHotspotDetails, onboardingRecord } =
    useHotspot(address)

  const centerCoordinate = useMemo(() => {
    if (!hotspotDetails?.lat || !hotspotDetails?.lng) return

    const { lat, lng } = hotspotDetails

    return [lng, lat]
  }, [hotspotDetails])

  const locationName = useMemo(() => {
    if (loading === false && !centerCoordinate) {
      return t('hotspots.noLocation')
    }

    if (hotspotDetails?.location && locations[hotspotDetails?.location]) {
      const loc = locations[hotspotDetails?.location]
      return formatLocationName(loc)
    }
    return ' '
  }, [centerCoordinate, hotspotDetails?.location, loading, locations, t])

  useEffect(() => {
    if (!hotspotDetails?.location || !centerCoordinate) {
      return
    }
    dispatch(
      getGeocodedAddress({
        lat: centerCoordinate[1],
        lng: centerCoordinate[0],
        location: hotspotDetails?.location,
      }),
    )
  }, [centerCoordinate, dispatch, hotspotDetails?.location])

  const needsOnboarding = useMemo(
    () => !loading && !hotspotDetails,
    [hotspotDetails, loading],
  )

  const isIot = useMemo(
    () => hotspotDetails?.networkTypes?.find((n) => n === 'IOT'),
    [hotspotDetails?.networkTypes],
  )

  const isMobile = useMemo(
    () => hotspotDetails?.networkTypes?.find((n) => n === 'MOBILE'),
    [hotspotDetails?.networkTypes],
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

  const assertHotspotLocation = useCallback(() => {
    nav.navigate('HotspotAssert', {
      screen: 'HotspotSetupPickLocationScreen',
      params: {
        hotspotAddress: address,
        hotspotType: 'Helium',
        hotspotNetworkTypes: hotspotDetails?.networkTypes,
      },
    })
  }, [address, hotspotDetails?.networkTypes, nav])

  const transferHotspot = useCallback(
    () =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      nav.navigate('TransferHotspot', {
        screen: 'TransferHotspotScreen',
        params: { hotspotAddress: address },
      }),
    [address, nav],
  )

  const handleKabobPress = useCallback(
    (item: KabobItem) => () => {
      bottomSheetModalRef.current?.dismiss()

      switch (item) {
        case 'assertLocation':
          assertHotspotLocation()
          break
        case 'transfer':
          transferHotspot()
          break
        case 'copyAddress': {
          Clipboard.setString(address)
          triggerNotification('success')
          Toast.show(t('hotspots.copiedToClipboard', { address }))
          break
        }
        case 'onboardMobile': {
          nav.navigate('HotspotAssert', {
            screen: 'HotspotSetupPickLocationScreen',
            params: {
              hotspotAddress: address,
              hotspotType: 'Helium',
              hotspotNetworkTypes: ['MOBILE'],
            },
          })
          break
        }
        case 'onboardIot': {
          nav.navigate('HotspotAssert', {
            screen: 'HotspotSetupPickLocationScreen',
            params: {
              hotspotAddress: address,
              hotspotType: 'Helium',
              hotspotNetworkTypes: ['IOT'],
            },
          })
          break
        }
      }
    },
    [
      address,
      assertHotspotLocation,
      nav,
      t,
      transferHotspot,
      triggerNotification,
    ],
  )

  useEffect(() => {
    return nav.addListener('focus', () => {
      getHotspotDetails()
    })
  }, [getHotspotDetails, nav])

  const formattedHotspotName = useMemo(() => {
    if (!animalName) return ''

    const pieces = animalName.split(' ')
    if (pieces.length < 3) return animalName

    return [`${pieces[0]} ${pieces[1]}`, pieces[2]]
  }, [animalName])

  const moreData = useMemo((): KabobItem[] => {
    const baseItems: KabobItem[] = ['copyAddress', 'assertLocation', 'transfer']
    if (
      status !== 'complete' ||
      onboardingRecord?.maker.name.toLowerCase().includes('helium') ||
      (isIot && isMobile)
    ) {
      return baseItems
    }

    if (isIot) {
      return [...baseItems, 'onboardMobile']
    }
    if (isMobile) {
      return [...baseItems, 'onboardIot']
    }
    return [...baseItems, 'onboardMobile', 'onboardIot']
  }, [isIot, isMobile, onboardingRecord?.maker.name, status])

  const snapPoints = useMemo(() => {
    const handleHeight = 72
    return [
      (menuType === 'settings' ? SETTINGS_DATA.length : moreData.length) *
        LIST_ITEM_HEIGHT +
        bottom +
        handleHeight,
    ]
  }, [bottom, menuType, moreData])

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

  const showNetworks = useMemo(
    () => status === 'complete' && !loading,
    [loading, status],
  )

  const footerText = useMemo(() => {
    if (!showNetworks && !onboardingRecord) {
      return ''
    }

    if (!showNetworks) {
      return onboardingRecord?.maker?.name
    }
    if (showNetworks && onboardingRecord) {
      return `${onboardingRecord?.maker?.name || ''} - ${isIot ? 'IOT ' : ''}${
        isMobile ? 'MOBILE' : ''
      }`
    }
  }, [isIot, isMobile, onboardingRecord, showNetworks])

  return (
    <SafeAreaBox
      backgroundColor="primaryBackground"
      flex={1}
      paddingHorizontal="l"
    >
      <Box flex={1} justifyContent="center">
        <Box flexDirection="row" marginStart="s" alignItems="center">
          <Box>
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
          <Box flex={1} flexDirection="row" justifyContent="flex-end">
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
        <ReAnimatedBox
          height={200}
          width="100%"
          borderRadius="xl"
          overflow="hidden"
          marginTop="xxl"
          entering={DelayedFadeIn}
        >
          <HotspotLocationPreview
            loading={(!hotspotDetails?.lat || !hotspotDetails?.lng) && loading}
            movable
            zoomLevel={14}
            mapCenter={centerCoordinate}
            locationName={locationName}
          />
        </ReAnimatedBox>

        {needsOnboarding && (
          <Button
            onPress={assertHotspotLocation}
            height={48}
            marginTop="l"
            mode="contained"
            title={t('hotspots.onboardHotspot')}
          />
        )}
      </Box>

      {loading && (
        <Text
          variant="body1"
          color="primaryText"
          paddingLeft="s"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {' '}
        </Text>
      )}
      {!loading && (
        <ReAnimatedBox entering={FadeIn}>
          <Text
            variant="body1"
            color="primaryText"
            paddingLeft="xs"
            numberOfLines={1}
            adjustsFontSizeToFit
            textAlign="center"
            fontWeight="100"
          >
            {footerText}
          </Text>
        </ReAnimatedBox>
      )}

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
            data={moreData}
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
