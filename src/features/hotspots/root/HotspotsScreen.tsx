import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Config from 'react-native-config'
import Toast from 'react-native-simple-toast'
import { FlatList, Linking, StyleSheet } from 'react-native'

import CarotRight from '@assets/images/carot-right.svg'
import { useNavigation } from '@react-navigation/native'
import { Button } from '../../../components/Button'
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
      paddingBottom="m"
      paddingTop="l"
    >
      <Text variant="h2" textAlign="center">
        {t('hotspotsScreen.title')}
      </Text>

      <Box flex={1} marginTop="l">
        <HotspotsList accountAddress={accountAddress} />
      </Box>

      <Button
        title={t('hotspotsScreen.addBtn')}
        onPress={openOnboardingSite}
        color="primary"
        marginTop="s"
      />
    </Box>
  )
}

const listStyles = StyleSheet.create({
  listItemName: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  listItemStatus: {
    textTransform: 'uppercase',
  },
})

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
          <Box
            backgroundColor="white"
            borderRadius="l"
            flexDirection="row"
            marginBottom="s"
          >
            <Box flex={1} paddingVertical="m" paddingLeft="m">
              <Text
                variant="body1"
                style={listStyles.listItemName}
                marginBottom="xs"
              >
                {item.name}
              </Text>

              <Text variant="body2" marginBottom="xs">
                {item.locationName || t('hotspotsScreen.locationNotSet')}
              </Text>

              <Text variant="body2" style={listStyles.listItemStatus}>
                {item.status}
              </Text>
            </Box>

            <TouchableOpacityBox
              width={60}
              justifyContent="center"
              alignItems="center"
              onPress={() => openHotspotDetails(item.address)}
            >
              <CarotRight color={colors.boneBlack} />
            </TouchableOpacityBox>
          </Box>
        )
      }}
    />
  )
}

export default WithAccountAddress(HotspotsScreen)
