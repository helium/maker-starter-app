import { Address } from '@helium/crypto-react-native'
import { AddGatewayV1, AssertLocationV2 } from '@helium/transactions'
import { getKeypair } from './secureAccount'

export const DEFAULT_MEMO = 'AAAAAAAAAAA='

export const encodeMemoString = (utf8Input: string | undefined) => {
  if (!utf8Input) return undefined
  const buff = Buffer.from(utf8Input, 'utf8')
  return buff.toString('base64')
}

export const makeAddGatewayTxn = async (
  partialTxnBin: string,
): Promise<AddGatewayV1> => {
  const addGatewayTxn = AddGatewayV1.fromString(partialTxnBin)
  const keypair = await getKeypair()

  return addGatewayTxn.sign({
    owner: keypair,
  })
}

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
