import React, { useState, useCallback, useEffect } from 'react'
import { useOnboarding } from '@helium/react-native-sdk'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator, Linking, Platform } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  createUpdateHotspotUrl,
  parseWalletLinkToken,
} from '@helium/wallet-link'
import animalName from 'angry-purple-tiger'
import Address from '@helium/address'
import Text from '../../components/Text'
import BackButton from '../../components/BackButton'
import SafeAreaBox from '../../components/SafeAreaBox'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { getAddress, getSecureItem } from '../../utils/secureAccount'
import { RootStackParamList } from '../../navigation/main/tabTypes'

type Route = RouteProp<RootStackParamList, 'TransferHotspot'>
const TransferHotspot = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const { createTransferTransaction } = useOnboarding()

  const [hotspotAddress, setHotspotAddress] = useState(
    params?.hotspotAddress || '',
  )
  const [newOwnerAddress, setNewOwnerAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [hotspotName, setHotspotName] = useState('')

  const onSubmit = useCallback(async () => {
    setLoading(true)

    // get linked wallet token
    const token = await getSecureItem('walletLinkToken')
    if (!token) throw new Error('Token Not found')

    const parsed = parseWalletLinkToken(token)
    if (!parsed?.address) throw new Error('Invalid Token')

    try {
      const userAddress = (await getAddress()) || ''
      const { solanaTransaction, transferHotspotTxn } =
        await createTransferTransaction({
          hotspotAddress,
          userAddress,
          newOwnerAddress,
        })

      const url = createUpdateHotspotUrl({
        platform: Platform.OS,
        token,
        transferHotspotTxn,
        solanaTransactions: solanaTransaction,
      })
      if (!url) throw new Error('Link could not be created')
      // open in the Helium wallet app
      await Linking.openURL(url)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
    setLoading(false)
  }, [createTransferTransaction, hotspotAddress, newOwnerAddress])

  useEffect(() => {
    if (!Address.isValid(hotspotAddress)) {
      setHotspotName('')
      return
    }

    setHotspotName(animalName(hotspotAddress))
  }, [hotspotAddress])

  return (
    <SafeAreaBox
      backgroundColor="primaryBackground"
      flex={1}
      paddingHorizontal="m"
    >
      <BackButton
        marginHorizontal="n_lx"
        onPress={navigation.goBack}
        marginBottom="l"
      />
      <Text variant="h1" marginBottom="l">
        {t('transferHotspot.title')}
      </Text>
      <Text variant="body1" marginBottom="l" textAlign="center">
        {hotspotName}
      </Text>
      <TextInput
        borderRadius="s"
        padding="s"
        marginBottom="m"
        backgroundColor="white"
        onChangeText={setHotspotAddress}
        value={hotspotAddress}
        placeholderTextColor="black"
        placeholder={t('transferHotspot.enterHotspot')}
        numberOfLines={2}
        multiline
        editable={!loading}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
      <TextInput
        borderRadius="s"
        padding="s"
        backgroundColor="white"
        onChangeText={setNewOwnerAddress}
        value={newOwnerAddress}
        placeholderTextColor="black"
        numberOfLines={2}
        multiline
        placeholder={t('transferHotspot.enterOwner')}
        editable={!loading}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
      <Button
        title={t('transferHotspot.submit')}
        mode="contained"
        marginVertical="l"
        height={48}
        disabled={!hotspotAddress || !newOwnerAddress || loading}
        onPress={onSubmit}
      />
      {loading && <ActivityIndicator size="small" color="white" />}
    </SafeAreaBox>
  )
}

export default TransferHotspot
