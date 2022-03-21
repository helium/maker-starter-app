import { WalletLink } from '@helium/react-native-sdk'
import * as SecureStore from 'expo-secure-store'

type AccountStoreKey = BooleanKey | StringKey

const stringKeys = [
  'userPin',
  'authInterval',
  'language',
  'walletLinkToken',
] as const
type StringKey = typeof stringKeys[number]

const boolKeys = ['requirePin'] as const
type BooleanKey = typeof boolKeys[number]

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
  const parsed = WalletLink.parseWalletLinkToken(token)
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
