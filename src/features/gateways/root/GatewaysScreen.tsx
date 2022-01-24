import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Config from 'react-native-config'
import Toast from 'react-native-simple-toast'
import { FlatList, Linking, StyleSheet } from 'react-native'

import CarotRight from '@assets/images/carot-right.svg'
import { EXPLORER_BASE_URL } from '../../../utils/config'
import { getAddress } from '../../../utils/secureAccount'
import { Button } from '../../../components/Button'
import Text from '../../../components/Text'
import Box from '../../../components/Box'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import { ActivityIndicatorCentered } from '../../../components/ActivityIndicator'
import { useGetHostspotsQuery } from '../../../store/helium/heliumApi'
import { useColors } from '../../../theme/themeHooks'

export function WithAccountAddress<T>(Component: React.FC<T>) {
  return function WithAccountB58Component(props: any) {
    const [address, setAddress] = useState<string>()

    useEffect(() => {
      getAddress().then(setAddress)
    }, [])

    return !address ? (
      <ActivityIndicatorCentered />
    ) : (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Component {...props} accountAddress={address} />
    )
  }
}

type Props = {
  accountAddress: string
}

const GatewaysScreen = ({ accountAddress }: Props) => {
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
        {t('gatewaysScreen.title')}
      </Text>

      <Box flex={1} marginTop="l">
        <GatewaysList accountAddress={accountAddress} />
      </Box>

      <Button
        title={t('gatewaysScreen.addBtn')}
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

const GatewaysList = ({ accountAddress }: Props) => {
  const { t } = useTranslation()
  const colors = useColors()

  const { data: hotspots, isLoading } = useGetHostspotsQuery(accountAddress)

  if (isLoading) return <ActivityIndicatorCentered />

  if (!hotspots?.length)
    return (
      <Text variant="body1" textAlign="center">
        {t('gatewaysScreen.noItems')}
      </Text>
    )

  const openHotspotDetails = (hotspotAddress: string) => {
    if (!hotspotAddress) return

    Linking.openURL(`${EXPLORER_BASE_URL}/hotspots/${hotspotAddress}`)
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
                {item.location || t('gatewaysScreen.locationNotSet')}
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

export default WithAccountAddress(GatewaysScreen)
