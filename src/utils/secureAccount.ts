import * as SecureStore from "expo-secure-store";

// BOOL AND STRING KEYS
const boolValueKeys = ["requirePin"] as const;
type BoolValueKey = typeof boolValueKeys[number];

const stringValueKeys = ["userPin", "authInterval", "language"] as const;
type StringValueKey = typeof stringValueKeys[number];

export async function getSecureItem(key: BoolValueKey): Promise<boolean>;
export async function getSecureItem(key: StringValueKey): Promise<string | null>;
export async function getSecureItem(key: BoolValueKey | StringValueKey) {
  const item = await SecureStore.getItemAsync(key);
  if (boolValueKeys.find((boolItem) => key === boolItem)) {
    return item === "true";
  }
  return item;
}

export const setSecureItem = async (key: BoolValueKey | StringValueKey, val: string | boolean) =>
  SecureStore.setItemAsync(key, String(val));
// !!! BOOL AND STRING KEYS

// WALLET INFO KEYS
const walletAddressKey = "address";
const walletTokenKey = "token";
const walletInfoKeys = [walletAddressKey, walletTokenKey] as const;
type WalletInfoKey = typeof walletInfoKeys[number];

export const getWalletAddress = async () => {
  return SecureStore.getItemAsync(walletAddressKey);
};

export const setWalletAddress = async (address: string) => {
  await SecureStore.setItemAsync(walletAddressKey, address);
};

export const getWalletToken = async () => {
  return SecureStore.getItemAsync(walletTokenKey);
};

export const setWalletToken = async (token: string) => {
  await SecureStore.setItemAsync(walletTokenKey, token);
};
// !! WALLET INFO KEYS

// COMMON METHODS
export const deleteSecureItem = async (key: BoolValueKey | StringValueKey | WalletInfoKey) =>
  SecureStore.deleteItemAsync(key);

export const signOut = async () => {
  return Promise.all(
    [...boolValueKeys, ...stringValueKeys, ...walletInfoKeys].map((key) => deleteSecureItem(key)),
  );
};
// !!! COMMON METHODS
