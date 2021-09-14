import { useNavigation } from '@react-navigation/native'
import React, { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native-gesture-handler'
import { Edge } from 'react-native-safe-area-context'
import BackScreen from '../../../components/BackScreen'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import HotspotSetupSelectionListItem from './HotspotSetupSelectionListItem'
import { HotspotSetupNavigationProp } from './hotspotSetupTypes'
import {
  HotspotType,
  HotspotModelKeys,
  HotspotMakerModels,
} from '../../../makers'
import { useBorderRadii } from '../../../theme/themeHooks'

const ItemSeparatorComponent = () => (
  <Box height={1} backgroundColor="primaryBackground" />
)

const HotspotSetupSelectionScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const edges = useMemo((): Edge[] => ['top', 'left', 'right'], [])
  const radii = useBorderRadii()

  const handlePress = useCallback(
    (hotspotType: HotspotType) => () => {
      const { onboardType } = HotspotMakerModels[hotspotType]
      if (onboardType === 'BLE') {
        navigation.push('HotspotSetupEducationScreen', { hotspotType })
      } else {
        navigation.push('HotspotSetupExternalScreen', {
          hotspotType,
        })
      }
    },
    [navigation],
  )

  const keyExtractor = useCallback((item) => item, [])

  const data = useMemo(() => {
    return HotspotModelKeys
  }, [])

  const renderItem = useCallback(
    ({ item, index }) => {
      const isFirst = index === 0
      const isLast = index === data.length - 1
      return (
        <HotspotSetupSelectionListItem
          isFirst={isFirst}
          isLast={isLast}
          hotspotType={item}
          onPress={handlePress(item)}
        />
      )
    },
    [data.length, handlePress],
  )

  const flatListStyle = useMemo(() => {
    return { flex: 1, borderRadius: radii.m }
  }, [radii.m])

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
        variant="subtitle1"
        maxFontSizeMultiplier={1}
        numberOfLines={2}
        adjustsFontSizeToFit
        marginVertical="l"
      >
        {t('hotspot_setup.selection.subtitle')}
      </Text>

      <FlatList
        style={flatListStyle}
        ItemSeparatorComponent={ItemSeparatorComponent}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={<Box height={32} />}
      />
    </BackScreen>
  )
}

export default memo(HotspotSetupSelectionScreen)
