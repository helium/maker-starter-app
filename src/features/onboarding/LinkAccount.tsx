import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { WalletLink } from '@helium/react-native-sdk'
import { Linking, Platform } from 'react-native'
import { getApplicationName, getBundleId } from 'react-native-device-info'
import SafeAreaBox from '../../components/SafeAreaBox'
import Text from '../../components/Text'
import Box from '../../components/Box'
import TouchableOpacityBox from '../../components/TouchableOpacityBox'
import { APP_LINK_PROTOCOL } from '../../providers/AppLinkProvider'

const LinkAccount = () => {
  const { t } = useTranslation()
  const { supportedApps } = WalletLink

  const handleAppSelection = useCallback(
    (app: WalletLink.SupportedApp) => async () => {
      try {
        const canOpen = await Linking.canOpenURL(app.urlScheme)
        if (!canOpen) return

        const url = WalletLink.createWalletLinkUrl({
          universalLink: app.universalLink,
          callbackUrl: APP_LINK_PROTOCOL,
          requestAppId: getBundleId(),
          requestAppName: getApplicationName(),
        })
        Linking.openURL(url)
      } catch (error) {}
    },
    [],
  )

  return (
    <SafeAreaBox flex={1} backgroundColor="primaryBackground" padding="xl">
      <Text variant="subtitle1" marginBottom="l">
        {t('account_setup.createAccount.signInWith')}
      </Text>

      <Box flexDirection="row" marginBottom="l">
        {supportedApps.map((app) => (
          <TouchableOpacityBox
            key={
              Platform.OS === 'android' ? app.androidPackage : app.iosBundleId
            }
            backgroundColor="surface"
            padding="s"
            paddingHorizontal="m"
            borderRadius="l"
            onPress={handleAppSelection(app)}
          >
            <Text variant="h4">{app.name}</Text>
          </TouchableOpacityBox>
        ))}
      </Box>
    </SafeAreaBox>
  )
}

export default memo(LinkAccount)
