import React, { useState, useCallback } from 'react'
import { Transfer } from '@helium/react-native-sdk'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator, Linking, Platform } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAsync } from 'react-async-hook'
import {
  createUpdateHotspotUrl,
  parseWalletLinkToken,
} from '@helium/wallet-link'
import Text from '../../components/Text'
import BackButton from '../../components/BackButton'
import SafeAreaBox from '../../components/SafeAreaBox'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { getSecureItem } from '../../utils/secureAccount'
import {
  getBlockHeight,
  getChainVars,
  getHotspotDetails,
  getHotspotsLastChallengeActivity,
  submitTxn,
} from '../../utils/appDataClient'
import { RootStackParamList } from '../../navigation/main/tabTypes'

type Route = RouteProp<RootStackParamList, 'TransferHotspot'>
const TransferHotspot = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { params } = useRoute<Route>()

  const [hotspotAddress, setHotspotAddress] = useState('')
  const [newOwnerAddress, setNewOwnerAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [hash, setHash] = useState<string>()

  // handle callback from the Helium hotspot app
  useAsync(async () => {
    if (!params || !params.transferTxn) return

    // submit the signed transaction to the blockchain API
    setLoading(true)
    const signedTxnString = params.transferTxn
    const pendingTxn = await submitTxn(signedTxnString)
    setHash(pendingTxn.hash)
    setLoading(false)
  }, [params])

  const onSubmit = useCallback(async () => {
    setLoading(true)

    // get linked wallet token
    const token = await getSecureItem('walletLinkToken')
    if (!token) throw new Error('Token Not found')

    const parsed = parseWalletLinkToken(token)
    if (!parsed?.address) throw new Error('Invalid Token')

    try {
      // load hotspot
      const hotspot = await getHotspotDetails(hotspotAddress)
      const ownerAddress = hotspot.owner
      const nonce = hotspot?.speculativeNonce
        ? hotspot?.speculativeNonce + 1
        : 0

      if (!ownerAddress) throw new Error('Hotspot owner not found')
      if (ownerAddress !== parsed?.address) {
        throw new Error('The linked wallet is not the Hotspot owner')
      }

      // check hotspot for valid activity
      const chainVars = await getChainVars([
        'transfer_hotspot_stale_poc_blocks',
      ])
      const staleBlockCount = chainVars.transferHotspotStalePocBlocks as number
      const blockHeight = await getBlockHeight()
      const reportedActivity = await getHotspotsLastChallengeActivity(
        hotspotAddress,
      )
      const lastActiveBlock = reportedActivity.block || 0
      if (blockHeight - lastActiveBlock > staleBlockCount) {
        throw new Error(
          'Hotspot has no recent Proof-of-Coverage or Data Transfer activity',
        )
      }

      // create transfer hotspot v2 transaction
      const transferHotspotV2Txn = Transfer.createTransferV2(
        hotspotAddress,
        ownerAddress,
        newOwnerAddress,
        nonce,
      )

      // create wallet link url to sent transfer v2
      const url = createUpdateHotspotUrl({
        platform: Platform.OS,
        token,
        transferHotspotTxn: transferHotspotV2Txn.toString(),
      })
      if (!url) throw new Error('Link could not be created')

      // open in the Helium hotspot app
      await Linking.openURL(url)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
    setLoading(false)
  }, [hotspotAddress, newOwnerAddress])

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
      <TextInput
        borderRadius="s"
        padding="s"
        marginBottom="m"
        backgroundColor="white"
        onChangeText={setHotspotAddress}
        value={hotspotAddress}
        placeholderTextColor="black"
        placeholder={t('transferHotspot.enterHotspot')}
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
        disabled={
          !hotspotAddress || !newOwnerAddress || loading || hash !== undefined
        }
        onPress={onSubmit}
      />
      {loading && <ActivityIndicator size="small" color="white" />}

      {hash !== undefined && (
        <>
          <Text variant="body1">{t('transferHotspot.submitComplete')}</Text>
          <Text variant="body1" selectable>
            {hash}
          </Text>
        </>
      )}
    </SafeAreaBox>
  )
}

export default TransferHotspot
