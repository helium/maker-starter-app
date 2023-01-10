import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import Text from '../../../components/Text'
import { OnboardingNavigationProp } from '../onboardingTypes'
import Box from '../../../components/Box'
import TextTransform from '../../../components/TextTransform'
import SafeAreaBox from '../../../components/SafeAreaBox'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'

const WelcomeScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<OnboardingNavigationProp>()

  const createAccount = useCallback(
    () => navigation.push('CreateAccount'),
    [navigation],
  )

  const importAccount = useCallback(
    () => navigation.push('LinkAccount'),
    [navigation],
  )

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

      <TouchableOpacityBox onPress={createAccount} width="100%" padding="l">
        <Text variant="body1">{t('account_setup.welcome.create_account')}</Text>
      </TouchableOpacityBox>

      <TouchableOpacityBox onPress={importAccount} width="100%" padding="l">
        <Text variant="body1">
          {t('account_setup.welcome.login_with_helium')}
        </Text>
      </TouchableOpacityBox>
    </SafeAreaBox>
  )
}

export default WelcomeScreen
