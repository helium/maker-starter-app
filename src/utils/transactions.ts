import { Address } from '@helium/crypto-react-native'
import { AssertLocationV2 } from '@helium/transactions'
import { getKeypair } from './secureAccount'

export const makeAssertLocTxn = async (
  ownerB58: string,
  gatewayB58: string,
  payerB58: string,
  location: string,
  nonce: number,
  gain: number,
  elevation: number,
  stakingFee: number,
): Promise<AssertLocationV2> => {
  const keypair = await getKeypair()
  const owner = Address.fromB58(ownerB58)
  const gateway = Address.fromB58(gatewayB58)
  const payer = Address.fromB58(payerB58)
  const ownerIsPayer = payerB58 === ownerB58

  const assertLocTxn = new AssertLocationV2({
    owner,
    gateway,
    payer,
    nonce,
    gain,
    elevation,
    location,
    stakingFee,
  })

  return assertLocTxn.sign({
    owner: keypair,
    payer: ownerIsPayer ? keypair : undefined,
  })
}
