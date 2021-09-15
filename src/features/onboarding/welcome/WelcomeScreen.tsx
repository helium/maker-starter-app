import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import Config from 'react-native-config'
import Button from '../../../components/Button'
import Text from '../../../components/Text'
import { OnboardingNavigationProp } from '../onboardingTypes'
import Box from '../../../components/Box'
import TextTransform from '../../../components/TextTransform'
import SafeAreaBox from '../../../components/SafeAreaBox'

const WelcomeScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<OnboardingNavigationProp>()

  const createAccount = useCallback(
    () => navigation.push('AccountPassphraseWarning'),
    [navigation],
  )

  const importAccount = useCallback(() => {
    const hasWords = !!Config.WORDS
    if (!hasWords) {
      navigation.push('AccountImportScreen')
    } else {
      navigation.push('ImportAccountConfirmScreen', {
        words: Config.WORDS.split(','),
      })
    }
  }, [navigation])

  return (
    <SafeAreaBox
      backgroundColor="primaryBackground"
      flex={1}
      paddingHorizontal="l"
      alignItems="center"
      paddingTop="xxxl"
    >
      <Text variant="h1">{t('account_setup.welcome.title')}</Text>
      <TextTransform
        variant="subtitle1"
        marginVertical="xxl"
        i18nKey="account_setup.welcome.subtitle"
      />
      <Box flex={1} />
      <Button
        mode="contained"
        variant="primary"
        color="surfaceContrastText"
        backgroundColor="surfaceContrast"
        width="100%"
        marginBottom="s"
        onPress={createAccount}
        title={t('account_setup.welcome.create_account')}
      />
      <Button
        onPress={importAccount}
        mode="text"
        variant="secondary"
        title={t('account_setup.welcome.import_account')}
      />
    </SafeAreaBox>
  )
}

export default WelcomeScreen
