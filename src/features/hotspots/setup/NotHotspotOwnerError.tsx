import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import BackScreen from '../../../components/BackScreen'
import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'

const NotHotspotOwnerErrorScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<RootNavigationProp>()

  const navExit = useCallback(async () => {
    navigation.navigate('MainTabs')
  }, [navigation])

  return (
    <BackScreen>
      <Box justifyContent="center" flex={1}>
        <Text
          variant="h2"
          marginBottom="lm"
          numberOfLines={2}
          adjustsFontSizeToFit
          maxFontSizeMultiplier={1}
        >
          {t('hotspot_setup.not_owner.title')}
        </Text>
        <Text
          variant="subtitle1"
          color="primary"
          numberOfLines={2}
          maxFontSizeMultiplier={1.1}
          adjustsFontSizeToFit
          marginBottom={{ phone: 'xl', smallPhone: 'ms' }}
        >
          {t('hotspot_setup.not_owner.subtitle_1_no_follow')}
        </Text>
      </Box>
      <Text
        variant="subtitle2"
        marginBottom={{ phone: 'lx', smallPhone: 'ms' }}
        fontSize={14}
        lineHeight={19}
        maxFontSizeMultiplier={1.3}
      >
        {t('hotspot_setup.not_owner.contact_manufacturer')}
      </Text>
      <DebouncedButton
        title={t('hotspot_setup.onboarding_error.next')}
        mode="contained"
        variant="primary"
        onPress={navExit}
      />
    </BackScreen>
  )
}

export default NotHotspotOwnerErrorScreen
