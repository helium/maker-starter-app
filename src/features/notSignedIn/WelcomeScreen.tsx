import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { WalletLink } from '@helium/react-native-sdk'
import { Linking, Platform } from 'react-native'
import { getBundleId } from 'react-native-device-info'
import Toast from 'react-native-simple-toast'
import Config from 'react-native-config'

import LogoIcon from '@assets/images/logo.svg'
import { locale } from '../../i18n'
import Text from '../../components/Text'
import Box from '../../components/Box'
import { Button } from '../../components/Button'

const WelcomeScreen = () => {
  const { t } = useTranslation()

  const { delegateApps } = WalletLink
  const heliumApp: WalletLink.DelegateApp = delegateApps[0]

  const linkAccount = useCallback(() => {
    const url = WalletLink.createWalletLinkUrl({
      universalLink: heliumApp.universalLink,
      requestAppId: getBundleId(),
      callbackUrl: Config.APP_LINK_PROTOCOL,
      appName: Config.APP_NAME,
    })

    try {
      Linking.openURL(url)
    } catch {
      Toast.showWithGravity(
        t('generic.openLinkError', { url }),
        Toast.LONG,
        Toast.CENTER,
      )
    }
  }, [t, heliumApp])

  const createAccount = useCallback(() => {
    const url =
      Platform.OS === 'android'
        ? `market://details?id=${heliumApp.androidPackage}`
        : `https://apps.apple.com/${locale}/app/${heliumApp.name}/id${heliumApp.appStoreId}`

    try {
      Linking.openURL(url)
    } catch {
      Toast.showWithGravity(
        t('generic.openLinkError', { url }),
        Toast.LONG,
        Toast.CENTER,
      )
    }
  }, [t, heliumApp])

  return (
    <Box
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
      alignItems="center"
    >
      <Box flex={1} justifyContent="center" alignItems="center">
        <LogoIcon height={80} width={80} />

        <Text variant="h1">{t('welcomeScreen.title')}</Text>
      </Box>

      <Button
        onPress={linkAccount}
        color="primary"
        fullWidth
        marginBottom="m"
        title={t('welcomeScreen.signIn')}
      />
      <Button
        color="secondary"
        fullWidth
        onPress={createAccount}
        title={t('welcomeScreen.createAccount')}
      />
    </Box>
  )
}

export default WelcomeScreen
