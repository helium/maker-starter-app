import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Linking, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { DelegateApp, DELEGATE_APPS } from '@helium/wallet-link'
import SafeAreaBox from '../../components/SafeAreaBox'
import Text from '../../components/Text'
import Box from '../../components/Box'
import TouchableOpacityBox from '../../components/TouchableOpacityBox'
import { locale } from '../../utils/i18n'

const CreateAccount = () => {
  const { t } = useTranslation()
  const nav = useNavigation()

  const handleAppSelection = useCallback(
    (app: DelegateApp) => async () => {
      if (Platform.OS === 'android') {
        Linking.openURL(`market://details?id=${app.androidPackage}`)
      } else if (Platform.OS === 'ios') {
        Linking.openURL(
          `https://apps.apple.com/${locale}/app/${app.name}/id${app.appStoreId}`,
        )
      }
      nav.goBack()
    },
    [nav],
  )

  return (
    <SafeAreaBox flex={1} backgroundColor="primaryBackground" padding="xl">
      <Text variant="subtitle1" marginBottom="l">
        {t('account_setup.linkAccount.stepOne')}
      </Text>

      <Box flexDirection="row" marginBottom="l">
        {DELEGATE_APPS.map((app) => (
          <TouchableOpacityBox
            key={app.name}
            backgroundColor="surface"
            padding="s"
            paddingHorizontal="m"
            borderRadius="l"
            onPress={handleAppSelection(app)}
          >
            <Text color="primaryBackground" variant="h4">
              {app.name}
            </Text>
          </TouchableOpacityBox>
        ))}
      </Box>

      <Text variant="subtitle1" marginBottom="l">
        {t('account_setup.linkAccount.stepTwo')}
      </Text>
      <Text variant="subtitle1" marginBottom="l">
        {t('account_setup.linkAccount.stepThree')}
      </Text>
    </SafeAreaBox>
  )
}

export default memo(CreateAccount)
