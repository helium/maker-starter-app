import Client, { Hotspot } from '@helium/http'
import { Transaction } from '@helium/transactions'
import { getAddress } from './secureAccount'

const MAX = 100000
const client = new Client()

export const configChainVars = async () => {
  const vars = await client.vars.get()
  Transaction.config(vars)
}

export const getChainVars = async () => {
  return client.vars.get()
}

export const submitTxn = async (txn: string) => {
  return client.transactions.submit(txn)
}

export const getHotspots = async () => {
  const address = (await getAddress())?.b58
  if (!address) return []

  const newHotspotList = await client.account(address).hotspots.list()
  return newHotspotList.takeJSON(MAX)
}

export const getHotspotDetails = async (address: string): Promise<Hotspot> => {
  return client.hotspots.get(address)
}

export const getAccount = async (address?: string) => {
  const accountAddress = address || (await getAddress())?.b58
  if (!accountAddress) return

  const { data } = await client.accounts.get(accountAddress)
  return data
}

export const getBlockHeight = (params?: { maxTime?: string }) => {
  return client.blocks.getHeight(params)
}

export const getCurrentOraclePrice = async () => {
  return client.oracle.getCurrentPrice()
}

export const getPredictedOraclePrice = async () => {
  return client.oracle.getPredictedPrice()
}

export default client
