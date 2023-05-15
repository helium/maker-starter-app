import { HELIUM_WALLET_APP } from '@helium/wallet-link'
import { useCallback } from 'react'
import { Linking, Platform } from 'react-native'
import { locale } from './i18n'

const useDelegateApps = () => {
  const downloadWalletApp = useCallback(() => {
    if (Platform.OS === 'android') {
      Linking.openURL(`market://details?id=${HELIUM_WALLET_APP.androidPackage}`)
    } else if (Platform.OS === 'ios') {
      Linking.openURL(
        `https://apps.apple.com/${locale}/app/${HELIUM_WALLET_APP.name}/id${HELIUM_WALLET_APP.appStoreId}`,
      )
    }
  }, [])

  return { walletApp: HELIUM_WALLET_APP, downloadWalletApp }
}

export default useDelegateApps
