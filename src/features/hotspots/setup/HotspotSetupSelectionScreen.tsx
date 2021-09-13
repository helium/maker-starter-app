import { useNavigation } from '@react-navigation/native'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Edge } from 'react-native-safe-area-context'
import BackScreen from '../../../components/BackScreen'
import Text from '../../../components/Text'
import HotspotSetupSelectionListItem from './HotspotSetupSelectionListItem'
import { HotspotSetupNavigationProp } from './hotspotSetupTypes'
import hotspotOnboardingSlice from '../../../store/hotspots/hotspotOnboardingSlice'
import { useAppDispatch } from '../../../store/store'
import {
  HotspotType,
  HotspotModelKeys,
  HotspotMakerModels,
} from '../../../makers'

const HotspotSetupSelectionScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const dispatch = useAppDispatch()
  const edges = useMemo((): Edge[] => ['top', 'left', 'right'], [])

  // clear any existing onboarding state
  useEffect(() => {
    dispatch(hotspotOnboardingSlice.actions.reset())
  }, [dispatch])

  const handlePress = useCallback(
    (hotspotType: HotspotType) => () => {
      dispatch(hotspotOnboardingSlice.actions.setHotspotType(hotspotType))

      const { onboardType } = HotspotMakerModels[hotspotType]
      if (onboardType === 'BLE') {
        navigation.push('HotspotSetupEducationScreen', { hotspotType })
      } else {
        navigation.push('HotspotSetupExternalScreen', {
          hotspotType,
        })
      }
    },
    [dispatch, navigation],
  )

  return (
    <BackScreen
      backgroundColor="primaryBackground"
      paddingTop="m"
      padding="lx"
      hideBack
      onClose={navigation.goBack}
      edges={edges}
    >
      <Text variant="h1" numberOfLines={2} adjustsFontSizeToFit>
        {t('hotspot_setup.selection.title')}
      </Text>
      <Text
        variant="subtitle"
        maxFontSizeMultiplier={1}
        numberOfLines={2}
        adjustsFontSizeToFit
        marginVertical="l"
      >
        {t('hotspot_setup.selection.subtitle')}
      </Text>

      <HotspotSetupSelectionListItem
        isFirst
        isLast
        hotspotType={HotspotModelKeys[0]}
        onPress={handlePress(HotspotModelKeys[0])}
      />
    </BackScreen>
  )
}

export default memo(HotspotSetupSelectionScreen)
