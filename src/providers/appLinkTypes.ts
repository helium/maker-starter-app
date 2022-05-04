import { WalletLink as HeliumWalletLink } from "@helium/react-native-sdk";

export const AppLinkCategories = ["add_gateway", "link_wallet", "sign_hotspot"] as const;
export type AppLinkCategoryType = typeof AppLinkCategories[number];

export const AppLinkFields = ["type", "address", "amount", "memo"] as const;
export type AppLinkFieldType = typeof AppLinkFields[number];

export type AppLink = {
  type: AppLinkCategoryType;
  resource: string;
  [key: string]: string | number | undefined;
};

export type WalletLink = AppLink & HeliumWalletLink.LinkWalletResponse;

export type HotspotLink = AppLink & HeliumWalletLink.SignHotspotResponse;
