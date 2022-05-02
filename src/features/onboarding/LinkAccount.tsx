import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { WalletLink } from '@helium/react-native-sdk'
import { Linking, Platform } from 'react-native'
import { getBundleId } from 'react-native-device-info'
import SafeAreaBox from '../../components/SafeAreaBox'
import Text from '../../components/Text'
import Box from '../../components/Box'
import TouchableOpacityBox from '../../components/TouchableOpacityBox'

const LinkAccount = () => {
  const { t } = useTranslation()
  const { delegateApps } = WalletLink

  const handleAppSelection = useCallback(
    (app: WalletLink.DelegateApp) => async () => {
      try {
        const url = WalletLink.createWalletLinkUrl({
          universalLink: app.universalLink,
          requestAppId: getBundleId(),
          callbackUrl: 'makerappscheme://',
          appName: 'Maker App',
        })

        Linking.openURL(url)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
    [],
  )

  return (
    <SafeAreaBox flex={1} backgroundColor="primaryBackground" padding="xl">
      <Text variant="subtitle1" marginBottom="l">
        {t('account_setup.createAccount.signInWith')}
      </Text>

      <Box flexDirection="column" marginBottom="l">
        {delegateApps.map((app) => (
          <TouchableOpacityBox
            key={
              Platform.OS === 'android' ? app.androidPackage : app.iosBundleId
            }
            backgroundColor="surface"
            padding="s"
            marginBottom="m"
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
