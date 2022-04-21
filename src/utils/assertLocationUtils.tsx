import { Balance, CurrencyType } from '@helium/currency'

import { getChainVars, getCurrentOraclePrice } from './appDataClient'
import { calculateAssertLocFee } from './fees'
import { getAddress } from './secureAccount'
import { OnboardingRecord } from './stakingClient'

export const loadLocationFeeData = async ({
  nonce = 0,
  accountIntegerBalance = 0,
  onboardingRecord,
  dataOnly = false,
}: {
  nonce?: number
  accountIntegerBalance?: number
  onboardingRecord?: OnboardingRecord
  dataOnly?: boolean
}) => {
  let isFree = false
  if (!dataOnly) {
    isFree = hasFreeLocationAssert(nonce, onboardingRecord)
  }
  const owner = await getAddress()
  const payer = isFree ? onboardingRecord?.maker?.address : owner

  if (!owner || !payer) {
    throw new Error('Missing payer or owner')
  }

  const { price: oraclePrice } = await getCurrentOraclePrice()

  let totalStakingAmountDC = new Balance(0, CurrencyType.dataCredit)

  if (!dataOnly) {
    const { stakingFee, fee } = calculateAssertLocFee(owner, payer, nonce)

    totalStakingAmountDC = new Balance(
      stakingFee + fee,
      CurrencyType.dataCredit,
    )
  } else {
    const chainVars = await getChainVars([
      'staking_fee_txn_assert_location_dataonly_gateway_v1',
    ])
    const { stakingFeeTxnAssertLocationDataonlyGatewayV1: fee } = chainVars
    totalStakingAmountDC = new Balance(fee, CurrencyType.dataCredit)
  }

  const totalStakingAmount = totalStakingAmountDC.toNetworkTokens(oraclePrice)
  const totalStakingAmountUsd = totalStakingAmountDC.toUsd(oraclePrice)

  const balance = accountIntegerBalance || 0
  const hasSufficientBalance = balance >= totalStakingAmount.integerBalance
  const remainingFreeAsserts =
    (onboardingRecord?.maker?.locationNonceLimit || 0) - nonce

  return {
    isFree,
    hasSufficientBalance,
    remainingFreeAsserts,
    totalStakingAmount,
    totalStakingAmountDC,
    totalStakingAmountUsd,
  }
}

export const hasFreeLocationAssert = (
  nonce: number,
  onboardingRecord?: OnboardingRecord,
): boolean => {
  if (!onboardingRecord || !onboardingRecord.maker) {
    return false
  }
  const locationNonceLimit = onboardingRecord?.maker.locationNonceLimit || 0
  return nonce < locationNonceLimit
}
