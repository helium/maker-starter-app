import { Hotspot } from "@helium/http";
import { heliumHttpClient } from "@helium/react-native-sdk";

export const submitTxn = async (txn: string) => {
  return heliumHttpClient.transactions.submit(txn);
};

export const getHotspotDetails = async (address: string): Promise<Hotspot> => {
  return heliumHttpClient.hotspots.get(address);
};

export const getAccount = async (address?: string) => {
  if (!address) {
    return;
  }

  const { data } = await heliumHttpClient.accounts.get(address);
  return data;
};

export const hotspotOnChain = async (address: string) => {
  try {
    await getHotspotDetails(address);
    return true;
  } catch (error) {
    return false;
  }
};
