import React, { useCallback, useMemo, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import Box from '../../../components/Box'
import Button, { DebouncedButton } from '../../../components/Button'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'
import sendMail from '../../../utils/sendMail'

type Route = RouteProp<HotspotSetupStackParamList, 'OnboardingErrorScreen'>
const OnboardingErrorScreen = () => {
  const { t, i18n } = useTranslation()
  const [showLogs, setShowLogs] = useState(false)
  const navigation = useNavigation<RootNavigationProp>()
  const {
    params: { connectStatus, errorLogs },
  } = useRoute<Route>()
  const navNext = useCallback(() => {
    navigation.navigate('MainTabs')
  }, [navigation])

  const subtitle = useMemo(() => {
    let subtitleKey = `hotspot_setup.onboarding_error.subtitle.${connectStatus}`

    if (!i18n.exists(subtitleKey)) {
      subtitleKey =
        'hotspot_setup.onboarding_error.subtitle.something_went_wrong'
    }
    return t(subtitleKey)
  }, [connectStatus, i18n, t])

  const handleSend = useCallback(() => {
    if (!errorLogs) return

    let body = ''
    errorLogs.forEach((l) => {
      body += `${l}\n\n`
    })
    sendMail({ subject: 'Hotspot Onboarding Failure', body, isHTML: false })
  }, [errorLogs])

  return (
    <SafeAreaBox backgroundColor="primaryBackground" flex={1} padding="l">
      <Box flex={1} />
      <Box>
        <Text variant="h1">{t('hotspot_setup.onboarding_error.title')}</Text>
        <Text variant="body1" marginVertical="l">
          {subtitle}
        </Text>
        {connectStatus && (
          <Text variant="body2" marginTop="l">
            {connectStatus}
          </Text>
        )}
      </Box>

      <Box flex={2}>
        <ScrollView>
          {showLogs &&
            errorLogs?.map((l) => (
              <Text key={l} variant="body2">
                {`${l}\n`}
              </Text>
            ))}
        </ScrollView>
      </Box>

      <Box>
        {errorLogs && (
          <Box flexDirection="row" justifyContent="space-around">
            <Button
              paddingVertical="m"
              onPress={() => setShowLogs(!showLogs)}
              variant="secondary"
              mode="text"
              title={showLogs ? 'Hide Logs' : 'View Logs'}
            />
            <Button
              paddingVertical="m"
              onPress={handleSend}
              variant="secondary"
              mode="text"
              title="Send Logs"
            />
          </Box>
        )}
        <DebouncedButton
          mode="contained"
          variant="primary"
          title={t('hotspot_setup.onboarding_error.next')}
          onPress={navNext}
        />
      </Box>
    </SafeAreaBox>
  )
}

export default OnboardingErrorScreen
