import { parseWalletLinkToken } from '@helium/wallet-link'
import * as SecureStore from 'expo-secure-store'
import { Mnemonic } from '@helium/crypto-react-native'

type AccountStoreKey = BooleanKey | StringKey

const stringKeys = [
  'userPin',
  'authInterval',
  'language',
  'walletLinkToken',
  'mnemonic',
] as const
type StringKey = (typeof stringKeys)[number]

const boolKeys = ['requirePin'] as const
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
  const token = await getSecureItem('walletLinkToken')
  if (!token) return
  const parsed = parseWalletLinkToken(token)
  if (!parsed?.address) return
  const { address } = parsed
  return address
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
