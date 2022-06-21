import { Hotspot, PocReceiptsV2 } from '@helium/http'
import { heliumHttpClient } from '@helium/react-native-sdk'
import { fromNow } from './timeUtils'

export const submitTxn = async (txn: string) => {
  return heliumHttpClient.transactions.submit(txn)
}

export const getHotspotDetails = async (address: string): Promise<Hotspot> => {
  return heliumHttpClient.hotspots.get(address)
}

export const getAccount = async (address?: string) => {
  if (!address) return

  const { data } = await heliumHttpClient.accounts.get(address)
  return data
}

export const getBlockHeight = (params?: { maxTime?: string }) => {
  return heliumHttpClient.blocks.getHeight(params)
}

export const getCurrentOraclePrice = async () => {
  return heliumHttpClient.oracle.getCurrentPrice()
}

export const getPredictedOraclePrice = async () => {
  return heliumHttpClient.oracle.getPredictedPrice()
}

export const hotspotOnChain = async (address: string) => {
  try {
    await getHotspotDetails(address)
    return true
  } catch (error) {
    return false
  }
}

export const getChainVars = async (keys?: string[]) => {
  return heliumHttpClient.vars.get(keys)
}

export const getHotspotsLastChallengeActivity = async (
  gatewayAddress: string,
) => {
  const hotspotActivityList = await heliumHttpClient
    .hotspot(gatewayAddress)
    .activity.list({
      filterTypes: [
        'poc_receipts_v1',
        'poc_receipts_v2',
        'poc_request_v1',
        'state_channel_close_v1',
      ],
    })
  const [lastHotspotActivity] = hotspotActivityList
    ? await hotspotActivityList?.take(1)
    : []
  if (lastHotspotActivity && lastHotspotActivity.time) {
    const dateLastActive = new Date(lastHotspotActivity.time * 1000)
    return {
      block: (lastHotspotActivity as PocReceiptsV2).height,
      text: fromNow(dateLastActive)?.toUpperCase(),
    }
  }
  return {}
}
