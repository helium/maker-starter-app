import { Location, Onboarding } from '@helium/react-native-sdk'
import { getAddress, getSodiumKeypair } from './secureAccount'

export const assertLocationTxn = async ({
  gateway,
  lat,
  lng,
  decimalGain = 1.2,
  elevation = 0,
  onboardingRecord,
  currentLocation,
  dataOnly,
}: {
  gateway: string | undefined
  lat: number | undefined
  lng: number | undefined
  decimalGain?: number
  elevation?: number
  onboardingRecord: Onboarding.OnboardingRecord | undefined
  currentLocation?: string
  dataOnly: boolean
}) => {
  const owner = await getAddress()
  const ownerKeypairRaw = await getSodiumKeypair()
  if (
    !owner ||
    !gateway ||
    !ownerKeypairRaw ||
    !lat ||
    !lng ||
    !onboardingRecord?.maker?.address
  ) {
    return undefined
  }

  return Location.assertLocationTxn({
    gateway,
    owner: owner.b58,
    lat,
    lng,
    decimalGain,
    elevation,
    dataOnly,
    ownerKeypairRaw,
    currentLocation,
    makerAddress: onboardingRecord?.maker?.address,
    locationNonceLimit: onboardingRecord?.maker?.locationNonceLimit || 0,
  })
}

export const loadLocationFeeData = async ({
  nonce = 0,
  accountIntegerBalance = 0,
  onboardingRecord,
  dataOnly = false,
}: {
  nonce?: number
  accountIntegerBalance?: number
  onboardingRecord?: Onboarding.OnboardingRecord
  dataOnly?: boolean
}) => {
  const owner = await getAddress()
  if (!owner || !onboardingRecord?.maker?.address) return

  return Location.loadLocationFeeData({
    accountIntegerBalance,
    dataOnly,
    locationNonceLimit: onboardingRecord?.maker?.locationNonceLimit || 0,
    makerAddress: onboardingRecord?.maker?.address,
    nonce,
    owner: owner.b58,
  })
}
