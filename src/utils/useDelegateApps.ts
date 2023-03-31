import { DELEGATE_APPS } from '@helium/wallet-link'
import { useCallback, useMemo } from 'react'
import { Linking, Platform } from 'react-native'
import { locale } from './i18n'

const useDelegateApps = () => {
  const hotspotApp = useMemo(
    () => DELEGATE_APPS.find((app) => app.name === 'helium-hotspot'),

    [],
  )

  const walletApp = useMemo(
    () => DELEGATE_APPS.find((app) => app.name === 'helium-hnt-wallet'),
    [],
  )

  const downloadWalletApp = useCallback(() => {
    if (!walletApp) return
    if (Platform.OS === 'android') {
      Linking.openURL(`market://details?id=${walletApp.androidPackage}`)
    } else if (Platform.OS === 'ios') {
      Linking.openURL(
        `https://apps.apple.com/${locale}/app/${walletApp.name}/id${walletApp.appStoreId}`,
      )
    }
  }, [walletApp])

  return { walletApp, hotspotApp, downloadWalletApp }
}

export default useDelegateApps
