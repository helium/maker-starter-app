import React, { memo, useEffect } from 'react'

import { useAnalytics } from '@segment/analytics-react-native'

import { useTranslation } from 'react-i18next'
import Box from '../../components/Box'

import {
  getEvent,
  Scope,
  Action,
  openDashboardBrowser,
} from '../../utils/analytics/utils'
import TouchableOpacityBox from '../../components/TouchableOpacityBox'
import Text from '../../components/Text'

const HmDashboardScreen = () => {
  const { screen } = useAnalytics()

  // Segment log screen visit
  useEffect(() => {
    screen(
      getEvent({
        scope: Scope.DASHBOARD,
        action: Action.VISITED,
      }),
    )
  }, [screen])

  const { t } = useTranslation()

  return (
    <Box
      backgroundColor="primaryBackground"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      flex={2}
    >
      <TouchableOpacityBox
        onPress={openDashboardBrowser}
        backgroundColor="primaryBackground"
        padding="m"
        marginBottom="xxxs"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Text variant="subtitle1">
          {t('home.goto.nebra_dashboard.external_browser')}
        </Text>
      </TouchableOpacityBox>
    </Box>
  )
}

export default memo(HmDashboardScreen)
