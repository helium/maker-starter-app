import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { createWalletLinkUrl } from '@helium/wallet-link'
import { Linking } from 'react-native'
import { getBundleId } from 'react-native-device-info'
import HotspotIcon from '@assets/images/hotspot.svg'
import Text from '../../../components/Text'
import { OnboardingNavigationProp } from '../onboardingTypes'
import Box from '../../../components/Box'
import TextTransform from '../../../components/TextTransform'
import useDelegateApps from '../../../utils/useDelegateApps'
import Button from '../../../components/Button'
import { useColors } from '../../../theme/themeHooks'

const WelcomeScreen = () => {
  const { t } = useTranslation()
  const { walletApp } = useDelegateApps()
  const navigation = useNavigation<OnboardingNavigationProp>()
  const colors = useColors()

  const createAccount = useCallback(
    () => navigation.push('CreateAccount'),
    [navigation],
  )

  const importAccount = useCallback(() => {
    try {
      const url = createWalletLinkUrl({
        universalLink: walletApp?.universalLink,
        requestAppId: getBundleId(),
        callbackUrl: 'helium://',
        appName: 'Helium',
      })

      Linking.openURL(url)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }, [walletApp?.universalLink])

  return (
    <Box backgroundColor="primaryBackground" flex={1}>
      <Box flex={2} height="100%" alignItems="center" justifyContent="center">
        <HotspotIcon color={colors.purpleDark} height={200} width={200} />
      </Box>
      <Box
        flex={1}
        paddingVertical="l"
        paddingHorizontal="lx"
        justifyContent="flex-end"
      >
        <Text variant="h1">{t('account_setup.welcome.title')}</Text>
        <TextTransform
          variant="subtitle1"
          marginVertical="lx"
          i18nKey="account_setup.welcome.subtitle"
        />
        <Button
          mode="contained"
          variant="primary"
          width="100%"
          marginBottom="s"
          onPress={createAccount}
          title={t('account_setup.welcome.create_account')}
        />
        <Button
          onPress={importAccount}
          mode="text"
          variant="primary"
          title={t('account_setup.welcome.import_account')}
        />
      </Box>
    </Box>
  )
}

export default WelcomeScreen
