import Config from 'react-native-config'

export type OnboardingRecord = {
  id: number
  onboardingKey: string
  macWlan0: string
  rpiSerial: string
  batch: string
  publicAddress: string
  heliumSerial: string
  macEth0: string
  createdAt: string
  updatedAt: string
  makerId: number
  maker: {
    id: number
    name: string
    address: string
    locationNonceLimit: number
    createdAt: string
    updatedAt: string
  }
  code: number
  errorMessage: string
}

export type Maker = {
  id: number
  name: string
  address: string
  locationNonceLimit: number
  createdAt: string
  updatedAt: string
}

const makeRequest = async (url: string, opts: RequestInit = {}) => {
  const route = [Config.ONBOARDING_API_BASE_URL, url].join('/')

  const response = await fetch(route, {
    ...opts,
    headers: {
      ...opts.headers,
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
  })
  const text = await response.text()
  try {
    const json = JSON.parse(text)
    return json.data || json
  } catch (err) {
    throw new Error(text)
  }
}

export const getStaking = async (url: string) => makeRequest(url)

export const postStaking = async (url: string, data: unknown) =>
  makeRequest(url, { method: 'POST', body: data ? JSON.stringify(data) : null })

/**
 * Get the onboarding record of a hotspot. If the hotspot is not asserted this requires the onboarding address.
 * After it is asserted it can be looked up by hotspot address.
 * @param address
 */
export const getOnboardingRecord = async (
  address: string,
): Promise<OnboardingRecord> => {
  const onboardingRecord = await getStaking(`hotspots/${address}`)
  return onboardingRecord as OnboardingRecord
}

export const getStakingSignedTransaction = async (
  gateway: string,
  txn: string,
) => {
  const { transaction } = await postStaking(`transactions/pay/${gateway}`, {
    transaction: txn,
  })
  return transaction
}

export const getMakers = async (): Promise<Maker[]> => {
  return makeRequest('makers')
}

export const getMakerName = (accountAddress: string, makers?: Maker[]) => {
  if (!makers) return ''
  const makerMatchIndex = makers.findIndex(
    (m: { address: string }) => m.address === accountAddress,
  )
  return makerMatchIndex !== -1 ? makers[makerMatchIndex].name : ''
}
