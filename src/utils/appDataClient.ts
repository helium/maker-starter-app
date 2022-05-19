import Client, {
  AnyTransaction,
  Hotspot,
  Network,
  PocReceiptsV1,
  ResourceList,
} from '@helium/http'
import { heliumHttpClient } from '@helium/react-native-sdk'
import Config from 'react-native-config'
import { fromNow } from './timeUtils'
import { getAddress } from './secureAccount'

class StatusError extends Error {
  status: number | undefined
}

const privateHeliumClient = new Client(
  new Network({
    baseURL: Config.PRIVATE_HELIUM_API_URL,
    version: 1,
  }),
)

export const getHotspotDetails = async (address: string): Promise<Hotspot> => {
  try {
    return await privateHeliumClient.hotspots.get(address)
  } catch (error) {
    // The app was able to communicate with the private Helium API server, but can not find
    // the hotspot designated by the address. There is no need to retry, so just throw the exception.
    if (error?.response?.status === 404) {
      const notFoundError = new StatusError(
        `Could not find the hotspot for address ${address}`,
      )
      notFoundError.status = 404
      throw notFoundError
    }

    try {
      return await heliumHttpClient.hotspots.get(address)
    } catch (err) {
      // The app was able to communicate with the public Helium API server, but can not find
      // the hotspot designated by the address. There is no need to retry, so just throw the exception.
      if (error?.response?.status === 404) {
        const notFoundError = new StatusError(
          `Could not find the hotspot for address ${address}`,
        )
        notFoundError.status = 404
        throw notFoundError
      } else {
        throw new Error(
          `Helium API request failed while trying to retrieve hotspot for address ${address}`,
        )
      }
    }
  }
}

export const submitTxn = async (txn: string) => {
  try {
    return await heliumHttpClient.transactions.submit(txn)
  } catch (err) {
    throw new Error(
      'Helium API request failed while submitting the transaction.',
    )
  }
}

export const getHotspots = async () => {
  const address = await getAddress()
  if (!address) return []

  try {
    const newHotspotList = await privateHeliumClient.accounts
      .fromAddress(address)
      .hotspots.list()

    return newHotspotList.takeJSON(10000)
  } catch (error) {
    try {
      const newHotspotList = await heliumHttpClient.accounts
        .fromAddress(address)
        .hotspots.list()

      return newHotspotList.takeJSON(10000)
    } catch (err) {
      throw new Error(
        `Helium API request failed while trying to retrieve the list of hotspots belonging to ${address}.`,
      )
    }
  }
}

export const getAccount = async (address?: string) => {
  if (!address) return

  try {
    const { data } = await privateHeliumClient.accounts.get(address)
    return data
  } catch (error) {
    try {
      const { data } = await heliumHttpClient.accounts.get(address)
      return data
    } catch (err) {
      throw new Error(
        `Helium API request failed while trying to retrieve account information for ${address}.`,
      )
    }
  }
}

export const getBlockHeight = (params?: { maxTime?: string }) => {
  try {
    return privateHeliumClient.blocks.getHeight(params)
  } catch (error) {
    try {
      return heliumHttpClient.blocks.getHeight(params)
    } catch (err) {
      throw new Error(
        'Helium API request failed while trying to retrieve the current block height.',
      )
    }
  }
}

export const getCurrentOraclePrice = async () => {
  try {
    return privateHeliumClient.oracle.getCurrentPrice()
  } catch (error) {
    try {
      return heliumHttpClient.oracle.getCurrentPrice()
    } catch (err) {
      throw new Error(
        'Helium API request failed while trying to retrieve the current oracle price.',
      )
    }
  }
}

export const getPredictedOraclePrice = async () => {
  try {
    return privateHeliumClient.oracle.getPredictedPrice()
  } catch (error) {
    try {
      return heliumHttpClient.oracle.getPredictedPrice()
    } catch (err) {
      throw new Error(
        'Helium API request failed while trying to retrieve the predicted oracle price.',
      )
    }
  }
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
  try {
    return privateHeliumClient.vars.get(keys)
  } catch (error) {
    try {
      return heliumHttpClient.vars.get(keys)
    } catch (err) {
      throw new Error(
        `Helium API request failed while trying to retrieve chain variables for ${keys}.`,
      )
    }
  }
}

export const getHotspotsLastChallengeActivity = async (
  gatewayAddress: string,
) => {
  let hotspotActivityList: ResourceList<AnyTransaction>
  try {
    hotspotActivityList = await privateHeliumClient
      .hotspot(gatewayAddress)
      .activity.list({
        filterTypes: ['poc_receipts_v1', 'poc_request_v1'],
      })
  } catch (error) {
    try {
      hotspotActivityList = await heliumHttpClient
        .hotspot(gatewayAddress)
        .activity.list({
          filterTypes: ['poc_receipts_v1', 'poc_request_v1'],
        })
    } catch (err) {
      throw new Error(
        `Helium API request failed while trying to retrieve hotspot ${gatewayAddress} activity.`,
      )
    }
  }

  const [lastHotspotActivity] = hotspotActivityList
    ? await hotspotActivityList?.take(1)
    : []
  if (lastHotspotActivity && lastHotspotActivity.time) {
    const dateLastActive = new Date(lastHotspotActivity.time * 1000)
    return {
      block: (lastHotspotActivity as PocReceiptsV1).height,
      text: fromNow(dateLastActive)?.toUpperCase(),
    }
  }
  return {}
}
