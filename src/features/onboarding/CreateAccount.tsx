import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import SafeAreaBox from '../../components/SafeAreaBox'
import Text from '../../components/Text'
import Box from '../../components/Box'
import TouchableOpacityBox from '../../components/TouchableOpacityBox'
import useDelegateApps from '../../utils/useDelegateApps'

const CreateAccount = () => {
  const { t } = useTranslation()
  const nav = useNavigation()
  const { walletApp, downloadWalletApp } = useDelegateApps()

  const handleAppSelection = useCallback(() => {
    downloadWalletApp()
    nav.goBack()
  }, [downloadWalletApp, nav])

  return (
    <SafeAreaBox flex={1} backgroundColor="primaryBackground" padding="xl">
      <Text variant="subtitle1" marginBottom="l">
        {t('account_setup.linkAccount.stepOne')}
      </Text>

      <Box flexDirection="column" marginBottom="l">
        <TouchableOpacityBox
          backgroundColor="surface"
          padding="s"
          paddingHorizontal="m"
          marginBottom="s"
          borderRadius="l"
          onPress={handleAppSelection}
        >
          <Text variant="h4">{walletApp?.name}</Text>
        </TouchableOpacityBox>
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
