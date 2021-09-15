import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet } from 'react-native'
import BackScreen from '../../../components/BackScreen'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import TextTransform from '../../../components/TextTransform'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import Box from '../../../components/Box'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupInstructionsScreen'
>

const HotspotSetupDiagnosticsScreen = () => {
  const {
    params: { hotspotType, slideIndex },
  } = useRoute<Route>()
  const { t, i18n } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  const handleNext = useCallback(() => {
    const nextSlideIndex = slideIndex + 1
    const hasNext = i18n.exists(
      `makerHotspot.${hotspotType}.internal.${nextSlideIndex}`,
    )
    if (hasNext) {
      navigation.push('HotspotSetupInstructionsScreen', {
        hotspotType,
        slideIndex: nextSlideIndex,
      })
    } else {
      navigation.push('HotspotSetupScanningScreen', { hotspotType })
    }
  }, [hotspotType, i18n, navigation, slideIndex])

  return (
    <BackScreen backgroundColor="primaryBackground" onClose={handleClose}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Box alignItems="center">
          <Text
            variant="h1"
            numberOfLines={1}
            maxFontSizeMultiplier={1}
            adjustsFontSizeToFit
            marginVertical="l"
          >
            {t(`makerHotspot.${hotspotType}.internal.${slideIndex}.title`)}
          </Text>
          <TextTransform
            maxFontSizeMultiplier={1.1}
            variant="subtitle1"
            marginTop="m"
            i18nKey={t(
              `makerHotspot.${hotspotType}.internal.${slideIndex}.body`,
            )}
          />
        </Box>
      </ScrollView>
      <DebouncedButton
        variant="primary"
        mode="contained"
        backgroundColor="surfaceContrast"
        color="surfaceContrastText"
        title={t(`makerHotspot.${hotspotType}.internal.${slideIndex}.button`)}
        onPress={handleNext}
      />
    </BackScreen>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HotspotSetupDiagnosticsScreen
