import { parseWalletLinkToken, createWalletLinkUrl } from '@helium/wallet-link'
import { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Linking, Platform } from 'react-native'
import { getBundleId } from 'react-native-device-info'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'
import useDelegateApps from './useDelegateApps'

const useCheckWalletLink = () => {
  const { t } = useTranslation()
  const { walletLinkToken } = useSelector((state: RootState) => state.app)
  const { hotspotApp, walletApp } = useDelegateApps()

  const hotspotAppId = useMemo(() => {
    if (!hotspotApp) return

    return Platform.OS === 'ios'
      ? hotspotApp.iosBundleId
      : hotspotApp.androidPackage
  }, [hotspotApp])

  const showAlert = useCallback(() => {
    if (!walletApp) return

    const title = t('wallet.checkLink.title')
    const message = t('wallet.checkLink.message')
    Alert.alert(title, message, [
      {
        text: t('wallet.checkLink.link'),
        onPress: () => {
          const url = createWalletLinkUrl({
            universalLink: walletApp.universalLink,
            requestAppId: getBundleId(),
            callbackUrl: 'makerappscheme://',
            appName: 'Maker App',
          })
          Linking.openURL(url)
        },
      },
      {
        text: t('generic.cancel'),
        onPress: () => {},
        style: 'destructive',
      },
    ])
  }, [t, walletApp])

  useEffect(() => {
    if (!walletLinkToken || !hotspotAppId || !walletApp) return

    const parsedToken = parseWalletLinkToken(walletLinkToken)

    if (parsedToken.signingAppId !== hotspotAppId) {
      return
    }

    showAlert()
  }, [hotspotAppId, showAlert, walletApp, walletLinkToken])
}

export default useCheckWalletLink
