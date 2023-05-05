import React, { useCallback, useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Fingerprint from '@assets/images/fingerprint.svg'
import { ActivityIndicator } from 'react-native'
import {
  AddGateway,
  useOnboarding,
  useSolana,
  Account,
} from '@helium/react-native-sdk'
import { first } from 'lodash'
import BackScreen from '../../../components/BackScreen'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import { useBreakpoints, useColors } from '../../../theme/themeHooks'
import animateTransition from '../../../utils/animateTransition'
import { DebouncedButton } from '../../../components/Button'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { getAddress } from '../../../utils/secureAccount'
import { getHotspotTypes } from '../root/hotspotTypes'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupExternalConfirmScreen'
>

const HotspotSetupExternalConfirmScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const colors = useColors()
  const breakpoints = useBreakpoints()
  const [address, setAddress] = useState<string>()
  const [publicKey, setPublicKey] = useState('')
  const [macAddress, setMacAddress] = useState('')
  const [ownerAddress, setOwnerAddress] = useState('')
  const rootNav = useNavigation<RootNavigationProp>()
  const { getOnboardingRecord } = useOnboarding()
  const { getHotspotDetails } = useSolana()

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  useEffect(() => {
    getAddress().then(setAddress)
  }, [])

  useEffect(() => {
    if (!publicKey) return

    const getRecord = async () => {
      const onboardingRecord = await getOnboardingRecord(publicKey)
      if (!onboardingRecord) return
      animateTransition('HotspotSetupExternalConfirmScreen.GetMac')
      setMacAddress(onboardingRecord.macEth0 || t('generic.unknown'))
    }
    getRecord()
  }, [getOnboardingRecord, publicKey, t])

  useEffect(() => {
    if (!params.addGatewayTxn) return

    const addGatewayTxn = AddGateway.txnFromString(params.addGatewayTxn)

    setPublicKey(addGatewayTxn.gateway?.b58 || '')
    setOwnerAddress(addGatewayTxn.owner?.b58 || '')
  }, [params])

  const navNext = useCallback(async () => {
    const solAddress = Account.heliumAddressToSolAddress(address || '')
    const hotspot = await getHotspotDetails({
      address: publicKey,
      type: first(getHotspotTypes()) || 'IOT',
    })

    if (hotspot?.owner) {
      if (hotspot.owner === solAddress) {
        navigation.replace('OwnedHotspotErrorScreen')
      } else {
        navigation.replace('NotHotspotOwnerErrorScreen')
      }
    } else {
      navigation.push('HotspotSetupLocationInfoScreen', {
        addGatewayTxn: params.addGatewayTxn,
        hotspotAddress: publicKey,
        hotspotType: params.hotspotType,
      })
    }
  }, [
    address,
    getHotspotDetails,
    navigation,
    params.addGatewayTxn,
    params.hotspotType,
    publicKey,
  ])

  return (
    <BackScreen
      backgroundColor="primaryBackground"
      paddingTop={{ smallPhone: 's', phone: 'lx' }}
      onClose={handleClose}
    >
      <Box
        height={52}
        width={52}
        backgroundColor="secondaryBackground"
        borderRadius="m"
        alignItems="center"
        justifyContent="center"
      >
        <Fingerprint color={colors.primary} width={26} height={26} />
      </Box>
      <Text
        variant="h1"
        fontSize={breakpoints.smallPhone ? 28 : 40}
        numberOfLines={breakpoints.smallPhone ? 1 : 2}
        adjustsFontSizeToFit
        marginTop="l"
      >
        {breakpoints.smallPhone
          ? t('hotspot_setup.confirm.title_one_line')
          : t('hotspot_setup.confirm.title')}
      </Text>
      <Box
        padding="l"
        backgroundColor="secondaryBackground"
        borderTopLeftRadius="s"
        borderTopRightRadius="s"
        marginTop={{ smallPhone: 'm', phone: 'xl' }}
        justifyContent="center"
      >
        <Text variant="body1" maxFontSizeMultiplier={1}>
          {t('hotspot_setup.confirm.public_key')}
        </Text>
        <Text
          variant="body1"
          marginTop="xs"
          maxFontSizeMultiplier={1}
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {publicKey}
        </Text>
      </Box>
      <Box
        padding="l"
        backgroundColor="secondaryBackground"
        marginTop="xs"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Text variant="body1" maxFontSizeMultiplier={1}>
          {t('hotspot_setup.confirm.mac_address')}
        </Text>
        {macAddress ? (
          <Text variant="body1" marginTop="xs" maxFontSizeMultiplier={1}>
            {macAddress}
          </Text>
        ) : (
          <Box marginTop="s">
            <ActivityIndicator color="white" />
          </Box>
        )}
      </Box>
      <Box
        marginTop="xs"
        backgroundColor="secondaryBackground"
        borderBottomLeftRadius="s"
        borderBottomRightRadius="s"
        padding="l"
        justifyContent="center"
      >
        <Text variant="body1" maxFontSizeMultiplier={1}>
          {t('hotspot_setup.confirm.owner_address')}
        </Text>
        <Text
          variant="body1"
          maxFontSizeMultiplier={1}
          marginTop="xs"
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {ownerAddress}
        </Text>
      </Box>
      <Box flex={1} />
      <DebouncedButton
        title={t('generic.next')}
        mode="contained"
        variant="primary"
        onPress={navNext}
        disabled={ownerAddress !== address}
      />
    </BackScreen>
  )
}

export default HotspotSetupExternalConfirmScreen
