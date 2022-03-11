import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { WalletLink } from '@helium/react-native-sdk'
import { Linking, Platform, Alert } from 'react-native'
import { getBundleId } from 'react-native-device-info'
import SafeAreaBox from '../../components/SafeAreaBox'
import Text from '../../components/Text'
import Box from '../../components/Box'
import TouchableOpacityBox from '../../components/TouchableOpacityBox'
import { locale } from '../../utils/i18n'

const LinkAccount = () => {
  const { t } = useTranslation()
  const { delegateApps } = WalletLink

  const handleAppSelection = useCallback(
    (app: WalletLink.DelegateApp) => async () => {
      try {
        const url = WalletLink.createWalletLinkUrl({
          universalLink: app.urlScheme,
          requestAppId: getBundleId(),
          callbackUrl: 'makerappscheme://',
          appName: 'Nebra Hotspot',
        })
        // Checking if the wallet URL scheme can be opened.
        const supported = await Linking.canOpenURL(url)
        if (supported) {
          Linking.openURL(url)
        } else {
          Alert.alert(
            'Helium App Not Found',
            'You must have the official Helium app installed.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Get Helium App',
                onPress: () => {
                  if (Platform.OS === 'android') {
                    Linking.openURL(`market://details?id=${app.androidPackage}`)
                  } else if (Platform.OS === 'ios') {
                    Linking.openURL(
                      `https://apps.apple.com/${locale}/app/${app.name}/id${app.appStoreId}`,
                    )
                  }
                },
              },
            ],
          )
        }
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

      <Box flexDirection="row" marginBottom="l">
        {delegateApps.map((app) => (
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
