import { Hotspot } from '@helium/http'
import { heliumHttpClient } from '@helium/react-native-sdk'
import { getAddress } from './secureAccount'

const MAX = 100000

export const getChainVars = async () => {
  return heliumHttpClient.vars.get()
}

export const submitTxn = async (txn: string) => {
  return heliumHttpClient.transactions.submit(txn)
}

export const getHotspots = async () => {
  const address = (await getAddress())?.b58
  if (!address) return []

  const newHotspotList = await heliumHttpClient.account(address).hotspots.list()
  return newHotspotList.takeJSON(MAX)
}

export const getHotspotDetails = async (address: string): Promise<Hotspot> => {
  return heliumHttpClient.hotspots.get(address)
}

export const getAccount = async (address?: string) => {
  const accountAddress = address || (await getAddress())?.b58
  if (!accountAddress) return

  const { data } = await heliumHttpClient.accounts.get(accountAddress)
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
