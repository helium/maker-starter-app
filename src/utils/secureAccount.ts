import * as SecureStore from 'expo-secure-store'
import { Account } from '@helium/react-native-sdk'

type AccountStoreKey = BooleanKey | StringKey

const stringKeys = [
  'mnemonic',
  'keypair',
  'address',
  'userPin',
  'authInterval',
  'walletApiToken',
  'language',
] as const
type StringKey = typeof stringKeys[number]

const boolKeys = [
  'accountBackedUp',
  'isSettingUpHotspot',
  'requirePin',
] as const
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

export const deleteSecureItem = async (key: AccountStoreKey) =>
  SecureStore.deleteItemAsync(key)

export const createKeypair = async (givenMnemonic?: string[]) => {
  const { keypairRaw, address, mnemonic } = await Account.createKeypair(
    givenMnemonic,
  )
  await Promise.all([
    setSecureItem('mnemonic', JSON.stringify(mnemonic.words)),
    setSecureItem('keypair', JSON.stringify(keypairRaw)),
    setSecureItem('address', address.b58),
  ])
}

export const getAddress = async () => {
  const addressB58 = await getSecureItem('address')
  if (!addressB58) return

  return Account.getAddress(addressB58)
}

export const getMnemonic = async () => {
  const wordsStr = await getSecureItem('mnemonic')
  if (!wordsStr) return

  let words: string[] = []
  try {
    words = JSON.parse(wordsStr)
  } catch (e) {
    return
  }
  return Account.getMnemonic(words)
}

export const getKeypair = async () => {
  const keypairRaw = await getSodiumKeypair()
  if (keypairRaw) {
    return Account.getKeypair(keypairRaw)
  }
}

export const getSodiumKeypair = async (): Promise<
  Account.SodiumKeyPair | undefined
> => {
  const keypairStr = await getSecureItem('keypair')
  if (!keypairStr) return
  return JSON.parse(keypairStr)
}

export const signOut = async () => {
  return Promise.all(
    [...stringKeys, ...boolKeys].map((key) => deleteSecureItem(key)),
  )
}
