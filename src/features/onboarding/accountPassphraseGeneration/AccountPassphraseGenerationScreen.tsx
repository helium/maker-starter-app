import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Text from '../../../components/Text'
import { OnboardingNavigationProp } from '../onboardingTypes'
import { createKeypair } from '../../../utils/secureAccount'

const DURATION = 2000

const AccountPassphraseGenerationScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<OnboardingNavigationProp>()

  useEffect(() => {
    const genKeypair = async () => {
      await createKeypair()
    }

    const timer = setTimeout(
      () => navigation.replace('AccountCreatePassphraseScreen'),
      DURATION,
    )

    genKeypair()
    return () => {
      clearTimeout(timer)
    }
  }, [navigation])

  return (
    <SafeAreaBox
      flex={1}
      paddingVertical={{ phone: 'xxl', smallPhone: 'l' }}
      paddingHorizontal="l"
      backgroundColor="primaryBackground"
      alignItems="center"
      justifyContent="center"
    >
      <Text textAlign="center" variant="body1" marginTop="xl">
        {t('account_setup.generating')}
      </Text>
    </SafeAreaBox>
  )
}

export default AccountPassphraseGenerationScreen
