import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { createWalletLinkUrl } from '@helium/wallet-link'
import { Linking } from 'react-native'
import { getBundleId } from 'react-native-device-info'
import Text from '../../../components/Text'
import { OnboardingNavigationProp } from '../onboardingTypes'
import Box from '../../../components/Box'
import TextTransform from '../../../components/TextTransform'
import Button from '../../../components/Button'
import SafeAreaBox from '../../../components/SafeAreaBox'
import ImageBox from '../../../components/ImageBox'

const WelcomeScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<OnboardingNavigationProp>()

  const runDiagnostics = useCallback(() => {
    navigation.push('HotspotSetupScanningScreen', {
      gatewayAction: 'diagnostics_wallet_not_linked',
      hotspotType: 'Helium',
    })
  }, [navigation])

  const importAccount = useCallback(() => {
    try {
      const url = createWalletLinkUrl({
        requestAppId: getBundleId(),
        callbackUrl: 'helium://',
        appName: 'Helium',
      })

      Linking.openURL(url)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }, [])

  return (
    <SafeAreaBox
      backgroundColor="primaryBackground"
      flex={1}
      alignItems="center"
      padding="l"
    >
      <ImageBox
        marginTop="xxl"
        source={require('assets/images/heliumAndHotspot.png')}
      />
      <Text
        variant="h1"
        textAlign="center"
        fontSize={46}
        fontWeight="600"
        letterSpacing={-1}
      >
        {t('account_setup.welcome.title')}
      </Text>
      <TextTransform
        variant="subtitle1"
        color="secondary"
        fontWeight="400"
        marginVertical="m"
        textAlign="center"
        i18nKey="account_setup.welcome.subtitle"
      />
      <Box flex={1} />
      <Button
        mode="contained"
        variant="primary"
        width="100%"
        marginBottom="s"
        onPress={importAccount}
        title={t('account_setup.welcome.import_account')}
      />
      <Button
        mode="text"
        variant="primary"
        onPress={runDiagnostics}
        title={t('account_setup.welcome.run_diagnostics')}
      />
    </SafeAreaBox>
  )
}

export default WelcomeScreen
