import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useOnboarding, Account } from '@helium/react-native-sdk'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator, Keyboard, Linking, Platform } from 'react-native'
import { useTranslation } from 'react-i18next'
import { createUpdateHotspotUrl } from '@helium/wallet-link'
import animalName from 'angry-purple-tiger'
import { useAsync } from 'react-async-hook'
import Address from '@helium/address'
import Text from '../../components/Text'
import SafeAreaBox from '../../components/SafeAreaBox'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import {
  getAddress,
  getSecureItem,
  isValidSolPubkey,
} from '../../utils/secureAccount'
import { RootStackParamList } from '../../navigation/main/tabTypes'
import Box from '../../components/Box'

type Route = RouteProp<RootStackParamList, 'TransferHotspot'>
const TransferHotspot = () => {
  const { result: address } = useAsync(getAddress, [])
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const { createTransferTransaction } = useOnboarding()

  const [newOwnerAddress, setNewOwnerAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [hotspotName, setHotspotName] = useState('')

  const onSubmit = useCallback(async () => {
    if (!params?.hotspotAddress) return

    setLoading(true)

    // get linked wallet token
    const token = await getSecureItem('walletLinkToken')
    if (!token) throw new Error('Token Not found')

    try {
      const userAddress = await getAddress()
      const { solanaTransactions, transferHotspotTxn } =
        await createTransferTransaction({
          hotspotAddress: params?.hotspotAddress,
          userAddress,
          newOwnerAddress,
        })

      const url = createUpdateHotspotUrl({
        platform: Platform.OS,
        token,
        transferHotspotTxn,
        solanaTransactions: solanaTransactions?.join(','),
      })
      if (!url) throw new Error('Link could not be created')
      // open in the Helium wallet app
      await Linking.openURL(url)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
    setLoading(false)
  }, [createTransferTransaction, newOwnerAddress, params?.hotspotAddress])

  useEffect(() => {
    if (!params?.hotspotAddress) return
    setHotspotName(animalName(params?.hotspotAddress))
  }, [params?.hotspotAddress])

  useEffect(() => {
    setNewOwnerAddress(newOwnerAddress.replace('\n', '').trim())
  }, [newOwnerAddress])

  const disabled = useMemo(() => {
    if (!params?.hotspotAddress || !newOwnerAddress || loading || !address) {
      return true
    }

    if (Address.isValid(newOwnerAddress)) {
      // new addr is helium address
      return newOwnerAddress === address
    }

    if (isValidSolPubkey(newOwnerAddress)) {
      // new addr is solana address
      const solAddr = Account.heliumAddressToSolAddress(address)
      return newOwnerAddress === solAddr
    }

    return true
  }, [loading, newOwnerAddress, params, address])

  return (
    <SafeAreaBox
      backgroundColor="primaryBackground"
      flex={1}
      paddingHorizontal="m"
    >
      <Box justifyContent="center" flex={1}>
        <Text variant="h1" marginBottom="l">
          {t('transferHotspot.title')}
        </Text>
        <Text variant="subtitle1" marginBottom="l" textAlign="center">
          {hotspotName}
        </Text>
        <TextInput
          borderRadius="s"
          padding="s"
          backgroundColor="white"
          onChangeText={setNewOwnerAddress}
          value={newOwnerAddress}
          placeholderTextColor="black"
          numberOfLines={2}
          multiline
          minHeight={80}
          placeholder={t('transferHotspot.enterOwner')}
          editable={!loading}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          paddingTop="m"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          variant="regular"
        />
      </Box>
      <Button
        title={t('transferHotspot.submit')}
        mode="contained"
        marginVertical="m"
        height={48}
        disabled={disabled}
        onPress={onSubmit}
      />
      <Button title={t('generic.cancel')} onPress={navigation.goBack} />
      {loading && <ActivityIndicator size="small" color="white" />}
    </SafeAreaBox>
  )
}

export default TransferHotspot
