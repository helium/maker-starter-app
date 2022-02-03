import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Config from 'react-native-config'
import Toast from 'react-native-simple-toast'
import { FlatList, Linking } from 'react-native'

import CarotRight from '@assets/images/carot-right.svg'
import { useNavigation } from '@react-navigation/native'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import Box from '../../../components/Box'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import { ActivityIndicatorCentered } from '../../../components/ActivityIndicator'
import { useGetHostspotsQuery } from '../../../store/helium/heliumApi'
import { useColors } from '../../../theme/themeHooks'
import {
  WithAccountAddress,
  WithAccountAddressProps,
} from '../../../hocs/WithAccountAddress'
import { SignedInStackNavigationProp } from '../../../navigation/navigationRootTypes'

const HotspotsScreen = ({ accountAddress }: WithAccountAddressProps) => {
  const { t } = useTranslation()

  const openOnboardingSite = useCallback(async () => {
    const url = Config.ONBOARD_URL.replace(/WALLET/, accountAddress)

    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url)
    } else {
      Toast.showWithGravity(
        t('generic.openLinkError', { url }),
        Toast.LONG,
        Toast.CENTER,
      )
    }
  }, [t, accountAddress])

  return (
    <Box
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="s"
    >
      <Text variant="h2" textAlign="center" marginBottom="m">
        {t('hotspotsScreen.title')}
      </Text>

      <Box flex={1} marginBottom="s">
        <HotspotsList accountAddress={accountAddress} />
      </Box>

      <DebouncedButton
        title={t('hotspotsScreen.addBtn')}
        onPress={openOnboardingSite}
        color="primary"
      />
    </Box>
  )
}

const HotspotsList = ({ accountAddress }: WithAccountAddressProps) => {
  const { t } = useTranslation()
  const colors = useColors()

  const navigation = useNavigation<SignedInStackNavigationProp>()

  const { data: hotspots, isLoading } = useGetHostspotsQuery(
    accountAddress,
    { pollingInterval: 60000 }, // refresh every minute
  )

  if (isLoading) return <ActivityIndicatorCentered />

  if (!hotspots?.length)
    return (
      <Text variant="body1" textAlign="center">
        {t('hotspotsScreen.noItems')}
      </Text>
    )

  const openHotspotDetails = (hotspotAddress: string) => {
    if (!hotspotAddress) return

    navigation.push('HotspotDetails', { hotspotAddress })
  }

  return (
    <FlatList
      data={hotspots}
      renderItem={({ item }) => {
        return (
          <TouchableOpacityBox
            backgroundColor="secondaryBackground"
            borderRadius="l"
            flexDirection="row"
            marginBottom="s"
            onPress={() => openHotspotDetails(item.address)}
          >
            <Box flex={1} paddingVertical="m" paddingLeft="m">
              <Text
                variant="body1"
                textTransform="capitalize"
                fontWeight="bold"
                marginBottom="xs"
              >
                {item.name}
              </Text>

              <Text variant="body2" marginBottom="xs">
                {item.locationName || t('hotspotsScreen.locationNotSet')}
              </Text>

              <Text variant="body2" textTransform="capitalize">
                {item.isLocationSet && item.status}
              </Text>
            </Box>

            <Box width={60} justifyContent="center" alignItems="center">
              <CarotRight color={colors.boneBlack} />
            </Box>
          </TouchableOpacityBox>
        )
      }}
    />
  )
}

export default WithAccountAddress(HotspotsScreen)
