import React, { memo, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Image, Linking, Platform, ScrollView } from 'react-native'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Box from '../../../components/Box'
import Button from '../../../components/Button'
import { useAppDispatch } from '../../../store/store'
import appSlice from '../../../store/user/appSlice'
import Text from '../../../components/Text'
import TextTransform from '../../../components/TextTransform'
import { WALLET_APP_ANDROID, WALLET_APP_IOS } from '../../../utils/urls'

const MigrationOnboard = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const onMigrate = useCallback(() => {
    dispatch(appSlice.actions.setOnboarded(true))
    Linking.openURL(Platform.OS === 'ios' ? WALLET_APP_IOS : WALLET_APP_ANDROID)
    navigation.goBack()
  }, [dispatch, navigation])

  return (
    <SafeAreaBox
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="l"
      backgroundColor="white"
    >
      <ScrollView>
        <Box justifyContent="center" alignItems="center">
          <Box paddingVertical="m" justifyContent="center" alignItems="center">
            <Image source={require('assets/images/heliumLogoLarge.png')} />
          </Box>
          <Text variant="h1" fontWeight="600" textAlign="center" fontSize={32}>
            {t('migrate.helium.title')}
          </Text>
          <Text
            variant="subtitle1"
            fontWeight="600"
            textAlign="center"
            color="primary"
            paddingVertical="l"
          >
            {t('migrate.helium.subtitle1')}
          </Text>
          <TextTransform
            variant="subtitle1"
            fontWeight="400"
            textAlign="center"
            color="secondary"
            i18nKey="migrate.helium.subtitle2"
          />
          <TextTransform
            variant="subtitle1"
            fontWeight="400"
            marginTop="m"
            textAlign="center"
            color="secondary"
            i18nKey="migrate.helium.subtitle3"
          />
        </Box>
      </ScrollView>
      <Box flex={1} />
      <Button
        mode="contained"
        variant="primary"
        width="100%"
        marginBottom="s"
        onPress={onMigrate}
        title={t('migrate.action')}
      />
      <Button
        onPress={navigation.goBack}
        mode="text"
        variant="primary"
        title={t('migrate.skip')}
      />
    </SafeAreaBox>
  )
}

export default memo(MigrationOnboard)
