import React, { useState, useCallback, useEffect, useMemo } from 'react'
import {
  useOnboarding,
  Account,
  TransferHotspotV2,
} from '@helium/react-native-sdk'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Keyboard, Linking, Platform } from 'react-native'
import { useTranslation } from 'react-i18next'
import { createUpdateHotspotUrl, SignHotspotRequest } from '@helium/wallet-link'
import animalName from 'angry-purple-tiger'
import { useAsync } from 'react-async-hook'
import Address from '@helium/address'
import { bufferToTransaction, getSolanaKeypair } from '@helium/spl-utils'
import Text from '../../components/Text'
import SafeAreaBox from '../../components/SafeAreaBox'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import {
  getAddress,
  getKeypair,
  getKeypairRaw,
  getSecureItem,
  isValidSolPubkey,
} from '../../utils/secureAccount'
import { RootStackParamList } from '../../navigation/main/tabTypes'
import Box from '../../components/Box'
import ActivityIndicator from '../../components/ActivityIndicator'
import useAlert from '../../utils/useAlert'
import { TransferHotspotNavigationProp } from './transferHotspotTypes'
import ImageBox from '../../components/ImageBox'

type Route = RouteProp<RootStackParamList, 'TransferHotspot'>
const TransferHotspot = () => {
  const { result: address } = useAsync(getAddress, [])
  const navigation = useNavigation<TransferHotspotNavigationProp>()
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const { createTransferTransaction } = useOnboarding()
  const [newOwnerAddress, setNewOwnerAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [hotspotName, setHotspotName] = useState('')
  const { showOKAlert } = useAlert()

  const navToHeliumAppForSigning = useCallback(
    async (updateParams: SignHotspotRequest) => {
      const url = createUpdateHotspotUrl(updateParams)
      if (!url) {
        // eslint-disable-next-line no-console
        console.error('Link could not be created')
        return
      }

      Linking.openURL(url)
    },
    [],
  )

  const signTxn = useCallback(
    async ({ solanaTransactions, transferHotspotTxn }: SignHotspotRequest) => {
      const keypair = await getKeypair()

      const keypairRaw = await getKeypairRaw()
      if (!keypairRaw || !keypair) {
        throw new Error('keypair not found!')
      }

      let solanaSignedTransactions: string[] = []
      let transferTxn: string | undefined

      if (transferHotspotTxn) {
        const unsigned = TransferHotspotV2.fromString(transferHotspotTxn)
        const signed = await unsigned.sign({ owner: keypair })
        transferTxn = signed.toString()
      }

      if (solanaTransactions) {
        const solTxns = solanaTransactions.split(',')
        const solanaKeypair = getSolanaKeypair(keypairRaw.sk)
        solanaSignedTransactions = solTxns.map((txn) => {
          const tx = bufferToTransaction(Buffer.from(txn, 'base64'))
          tx.partialSign(solanaKeypair)
          return tx.serialize().toString('base64')
        })
      }
      navigation.navigate('HotspotTxnsSubmitScreen', {
        gatewayAddress: params?.hotspotAddress,
        transferTxn,
        solanaTransactions: solanaSignedTransactions.join(','),
        status: 'success',
      })
    },
    [navigation, params?.hotspotAddress],
  )

  const onSubmit = useCallback(async () => {
    try {
      if (!params?.hotspotAddress) return

      setLoading(true)

      const userAddress = await getAddress()
      const { solanaTransactions, transferHotspotTxn } =
        await createTransferTransaction({
          hotspotAddress: params?.hotspotAddress,
          userAddress,
          newOwnerAddress,
        })

      const token = await getSecureItem('walletLinkToken')
      const updateParams = {
        token,
        platform: Platform.OS,
      } as SignHotspotRequest

      if (solanaTransactions?.length) {
        updateParams.solanaTransactions = solanaTransactions.join(',')
      } else {
        updateParams.transferHotspotTxn = transferHotspotTxn
      }

      if (token) {
        navToHeliumAppForSigning(updateParams)
      } else {
        signTxn(updateParams)
      }
    } catch (e) {
      setLoading(false)
      showOKAlert({
        titleKey: 'generic.something_went_wrong',
        messageKey: (e as string).toString(),
      })
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [
    params?.hotspotAddress,
    createTransferTransaction,
    newOwnerAddress,
    navToHeliumAppForSigning,
    signTxn,
    showOKAlert,
  ])

  useEffect(() => {
    if (!params?.hotspotAddress) return
    setHotspotName(animalName(params?.hotspotAddress))
  }, [params?.hotspotAddress])

  useEffect(() => {
    setNewOwnerAddress(newOwnerAddress.replace('\n', '').trim())
  }, [newOwnerAddress])

  const disabled = useMemo(() => {
    if (
      !params?.hotspotAddress ||
      !address ||
      !newOwnerAddress ||
      params.hotspotAddress === newOwnerAddress || // Some people have tried transferring their hotspot to itself
      loading
    ) {
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
      <Box justifyContent="center" flex={1} alignItems="center">
        <ImageBox source={require('assets/images/hotspot.png')} />
        <Text variant="h1" marginBottom="l" textAlign="center">
          {t('transferHotspot.title')}
        </Text>
        <Text
          variant="subtitle1"
          marginBottom="l"
          textAlign="center"
          color="primary"
        >
          {hotspotName}
        </Text>
        <TextInput
          width="100%"
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
      <ActivityIndicator animating={loading} />
      <Button
        title={t('transferHotspot.submit')}
        mode="contained"
        marginVertical="m"
        height={48}
        disabled={disabled}
        onPress={onSubmit}
      />
      <Button title={t('generic.cancel')} onPress={navigation.goBack} />
    </SafeAreaBox>
  )
}

export default TransferHotspot
