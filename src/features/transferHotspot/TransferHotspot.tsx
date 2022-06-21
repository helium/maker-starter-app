import React, { useState, useCallback } from 'react'
import {
  Transfer,
  WalletLink as HeliumWalletLink,
  WalletLink,
} from '@helium/react-native-sdk'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator, Linking, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAsync } from 'react-async-hook'
import Toast from 'react-native-simple-toast'
import { useAnalytics } from '@segment/analytics-react-native'
import animalName from 'angry-purple-tiger'
import { useSelector } from 'react-redux'
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
import {
  HotspotAddressParam,
  RootStackParamList,
} from '../../navigation/main/tabTypes'
import { getEvent, Scope, SubScope, Action } from '../../utils/analytics/utils'
import { RootState } from '../../store/rootReducer'
import { getMakerName } from '../../utils/stakingClient'
import hotspotTransferSlice from '../../store/hotspots/hotspotTransferSlice'
import { useAppDispatch } from '../../store/store'

type Route = RouteProp<RootStackParamList, 'TransferHotspot'>
const TransferHotspot = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const [newOwnerAddress, setNewOwnerAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [hash, setHash] = useState<string>()
  const makers = useSelector((state: RootState) => state.heliumData.makers)
  const hotspotAddress = (params as HotspotAddressParam)?.hotspotAddress || ''
  const dispatch = useAppDispatch()

  const { track } = useAnalytics()

  // Saved hotspot information when starting the transferring
  const hotspotNameSaved = useSelector(
    (state: RootState) => state.hotspotTransfer.hotspotName,
  )
  const ownerAddressSaved = useSelector(
    (state: RootState) => state.hotspotTransfer.ownerAddress,
  )
  const newOwnerAddressSaved = useSelector(
    (state: RootState) => state.hotspotTransfer.newOwnerAddress,
  )
  const makerNameSaved = useSelector(
    (state: RootState) => state.hotspotTransfer.makerName,
  )

  // handle callback from the Helium hotspot app
  useAsync(async () => {
    const txnParams = params as HeliumWalletLink.SignHotspotResponse
    if (!txnParams || !txnParams.transferTxn) return

    // submit the signed transaction to the blockchain API
    setLoading(true)
    const signedTxnString = txnParams.transferTxn

    const pendingTxn = await submitTxn(signedTxnString)

    // Segment track for Hotspot transfer
    track(
      getEvent({
        scope: Scope.HOTSPOT,
        sub_scope: SubScope.TRANSFER,
        action: Action.SUBMITTED,
      }),
      {
        hotspot_address: txnParams.gatewayAddress,
        hotspot_name: hotspotNameSaved,
        owner_address: ownerAddressSaved,
        new_owner_address: newOwnerAddressSaved,
        maker_name: makerNameSaved,
        pending_transaction: {
          type: pendingTxn.type,
          txn: pendingTxn.txn,
          status: pendingTxn.status,
          hash: pendingTxn.hash,
          failed_reason: pendingTxn.failedReason,
          created_at: pendingTxn.createdAt,
          updated_at: pendingTxn.updatedAt,
        },
      },
    )

    setHash(pendingTxn.hash)
    setLoading(false)
  }, [params])

  const onSubmit = useCallback(async () => {
    dispatch(hotspotTransferSlice.actions.reset())

    setLoading(true)

    // get linked wallet token
    const token = await getSecureItem('walletLinkToken')
    if (!token) throw new Error('Token Not found')

    const parsed = WalletLink.parseWalletLinkToken(token)
    if (!parsed?.address) throw new Error('Invalid Token')

    try {
      // load hotspot
      const hotspot = await getHotspotDetails(hotspotAddress)
      const ownerAddress = hotspot.owner

      const hotspotName = animalName(hotspot.address)
      const makerName = getMakerName(hotspot.payer, makers)

      dispatch(hotspotTransferSlice.actions.setHotspotName(hotspotName))
      dispatch(hotspotTransferSlice.actions.setOwnerAddress(ownerAddress || ''))
      dispatch(hotspotTransferSlice.actions.setNewOwnerAddress(newOwnerAddress))
      dispatch(hotspotTransferSlice.actions.setMakerName(makerName))

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
      const url = WalletLink.createUpdateHotspotUrl({
        token,
        transferHotspotTxn: transferHotspotV2Txn.toString(),
      })
      if (!url) throw new Error('Link could not be created')

      // Segment track for Hotspot transfer
      track(
        getEvent({
          scope: Scope.HOTSPOT,
          sub_scope: SubScope.TRANSFER,
          action: Action.STARTED,
        }),
        {
          hotspot_address: hotspotAddress,
          hotspot_name: hotspotName,
          owner_address: ownerAddress,
          new_owner_address: newOwnerAddress,
          maker_name: makerName,
        },
      )

      // open in the Helium hotspot app
      await Linking.openURL(url)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)

      Toast.showWithGravity(e.message, Toast.LONG, Toast.CENTER)
    }
    setLoading(false)
  }, [dispatch, hotspotAddress, makers, newOwnerAddress, track])

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
      <Text variant="subtitle2">{t('transferHotspot.hotspotAddress')}</Text>
      <Text variant="body1" selectable>
        {hotspotAddress}
      </Text>

      <Text variant="subtitle2" marginTop="m">
        {t('transferHotspot.newOwnerAddress')}
      </Text>
      <TextInput
        variant="regular"
        style={styles.textInput}
        borderRadius="s"
        padding="s"
        onChangeText={setNewOwnerAddress}
        value={newOwnerAddress}
        editable={!loading}
        autoCapitalize="none"
        autoCompleteType="off"
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

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CDD7E5',
  },
})

export default TransferHotspot
