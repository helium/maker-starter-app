import { parseWalletLinkToken } from '@helium/wallet-link'
import * as SecureStore from 'expo-secure-store'
import { Keypair, Mnemonic } from '@helium/crypto-react-native'
import { PublicKey } from '@solana/web3.js'

type AccountStoreKey = BooleanKey | StringKey

const stringKeys = [
  'userPin',
  'authInterval',
  'language',
  'walletLinkToken',
  'mnemonic',
  'address',
  'keypair',
] as const
type StringKey = (typeof stringKeys)[number]

const boolKeys = ['requirePin', 'isOnboarded'] as const
type BooleanKey = (typeof boolKeys)[number]

export const setSecureItem = async (
  key: AccountStoreKey,
  val: string | boolean,
) => SecureStore.setItemAsync(key, String(val))

export async function getSecureItem(key: BooleanKey): Promise<boolean>
export async function getSecureItem(key: StringKey): Promise<string | null>
export async function getSecureItem(key: AccountStoreKey) {
  const item = await SecureStore.getItemAsync(key)
  if (boolKeys.find((bk) => key === bk)) {
    return item === 'true'
  }
  return item
}

export const getAddress = async () => {
  const addressB58 = await getSecureItem('address')
  if (addressB58) return addressB58

  const token = await getSecureItem('walletLinkToken')
  if (token) {
    const parsed = parseWalletLinkToken(token)
    const { address } = parsed
    return address
  }

  return ''
}

export const deleteSecureItem = async (key: AccountStoreKey) =>
  SecureStore.deleteItemAsync(key)

export const signOut = async () => {
  return Promise.all(
    [...stringKeys, ...boolKeys].map((key) => deleteSecureItem(key)),
  )
}

export const getMnemonic = async (): Promise<Mnemonic | undefined> => {
  const wordsStr = await getSecureItem('mnemonic')
  if (!wordsStr) return

  let words: string[] = []
  try {
    words = JSON.parse(wordsStr) // The new (v3) app uses JSON.stringify ['hello', 'one', 'two', 'etc'] => "[\"hello\",\"one\",\"two\",\"etc\"]"
  } catch (e) {
    words = wordsStr.split(' ') // The old (v2) app space separated "hello one two etc"
    setSecureItem('mnemonic', JSON.stringify(words)) // upgrade the users to the new format
  }
  return new Mnemonic(words)
}

export const getKeypair = async (): Promise<Keypair | undefined> => {
  const keypairRaw = await getKeypairRaw()
  return new Keypair(keypairRaw)
}

export const getKeypairRaw = async () => {
  const keypairStr = await getSecureItem('keypair')
  if (!keypairStr) throw new Error('Keypair not found')

  return JSON.parse(keypairStr) as {
    sk: string
    pk: string
  }
}

export const isValidSolPubkey = (address: string): boolean => {
  try {
    // eslint-disable-next-line no-new
    new PublicKey(address)
    return true
  } catch {
    return false
  }
}
