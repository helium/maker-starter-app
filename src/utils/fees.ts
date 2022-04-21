import { Address } from '@helium/crypto-react-native'
import { AssertLocationV2 } from '@helium/transactions'
import Balance, {
  CurrencyType,
  DataCredits,
  NetworkTokens,
} from '@helium/currency'
import { minBy } from 'lodash'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { RootState } from '../store/rootReducer'

export const useFees = () => {
  const { currentOraclePrice, predictedOraclePrices } = useSelector(
    (state: RootState) => state.heliumData,
  )

  const feeToHNT = useCallback(
    (balance?: Balance<DataCredits>) => {
      if (!balance) return new Balance<DataCredits>(0, CurrencyType.dataCredit)

      const prices = [currentOraclePrice, ...predictedOraclePrices]
      const oraclePrice = minBy(prices, (p) => p?.price?.integerBalance)
      // ensure precision is only 8 decimals
      const feeHNTInteger = Math.trunc(
        balance.toNetworkTokens(oraclePrice?.price).integerBalance,
      )
      return new Balance<NetworkTokens>(
        feeHNTInteger,
        CurrencyType.networkToken,
      )
    },
    [currentOraclePrice, predictedOraclePrices],
  )

  return { feeToHNT }
}

const emptyB58Address = () =>
  Address.fromB58('13PuqyWXzPYeXcF1B9ZRx7RLkEygeL374ZABiQdwRSNzASdA1sn')

export const calculateAssertLocFee = (
  ownerB58: string | undefined,
  payerB58: string | undefined,
  nonce: number | undefined,
) => {
  const owner = ownerB58 ? Address.fromB58(ownerB58) : emptyB58Address()
  const payer = payerB58 ? Address.fromB58(payerB58) : emptyB58Address()

  const txn = new AssertLocationV2({
    owner,
    gateway: emptyB58Address(),
    payer,
    location: 'fffffffffffffff',
    gain: 12,
    elevation: 1,
    nonce: nonce || 1,
  })

  return { fee: txn.fee || 0, stakingFee: txn.stakingFee || 0 }
}
