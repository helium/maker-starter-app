import React, { memo, useCallback, useMemo } from 'react'
import { SectionList } from 'react-native'
import { Hotspot, Validator } from '@helium/http'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { sortBy } from 'lodash'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import HotspotListItem from '../../../components/HotspotListItem'
import { RootState } from '../../../store/rootReducer'
import WelcomeOverview from './WelcomeOverview'
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar'
import { distance } from '../../../utils/location'
import { isHotspot } from '../../../utils/hotspotUtils'

const HotspotsList = ({
  onSelectHotspot,
  visible,
}: {
  onSelectHotspot: (hotspot: Hotspot | Validator, showNav: boolean) => void
  visible: boolean
}) => {
  const { t } = useTranslation()

  const hotspots = useSelector(
    (state: RootState) => state.hotspots.hotspots.data,
  )

  const { currentLocation } = useSelector((state: RootState) => state.location)

  const orderedGateways = useMemo((): Hotspot[] => {
    return sortBy(hotspots, [
      (h) =>
        distance(currentLocation || { latitude: 0, longitude: 0 }, {
          latitude: h.lat || 0,
          longitude: h.lng || 0,
        }),
    ])
  }, [currentLocation, hotspots])

  const visibleHotspots = useMemo(() => {
    return orderedGateways as Hotspot[]
  }, [orderedGateways])

  const handlePress = useCallback(
    (hotspot: Hotspot) => {
      onSelectHotspot(hotspot, visibleHotspots.length > 1)
    },
    [onSelectHotspot, visibleHotspots.length],
  )

  const hasOfflineHotspot = useMemo(() => {
    return (visibleHotspots as Hotspot[]).some(
      (h: Hotspot) => h.status?.online !== 'online',
    )
  }, [visibleHotspots])

  const sections = useMemo(() => {
    let data = visibleHotspots
    if (hasOfflineHotspot) {
      data = (visibleHotspots as Hotspot[]).filter(
        (h) => h.status?.online !== 'online',
      )
    }
    return [
      {
        data,
      },
    ]
  }, [hasOfflineHotspot, visibleHotspots])

  const renderHeader = useCallback(() => {
    const filterHasHotspots = visibleHotspots && visibleHotspots.length > 0
    return (
      <Box
        paddingVertical="s"
        borderTopRightRadius="m"
        borderTopLeftRadius="m"
        backgroundColor="white"
      >
        {filterHasHotspots && (
          <Box paddingHorizontal="l">
            <Text
              variant="body3Medium"
              color="grayDark"
              letterSpacing={1}
              maxFontSizeMultiplier={1.2}
            >
              {t('hotspots.list.devices')}
            </Text>
          </Box>
        )}
      </Box>
    )
  }, [visibleHotspots, t])

  const renderItem = useCallback(
    ({ item }) => {
      if (isHotspot(item)) {
        return (
          <HotspotListItem onPress={handlePress} gateway={item} showCarot />
        )
      }
      return null
    },
    [handlePress],
  )

  const contentContainerStyle = useMemo(
    () => ({
      paddingBottom: 30,
    }),
    [],
  )

  const keyExtractor = useCallback(
    (item: Hotspot | Validator) => item.address,
    [],
  )

  return (
    <Box
      backgroundColor="white"
      left={0}
      right={0}
      alignContent="center"
      position="relative"
    >
      {visible && <FocusAwareStatusBar barStyle="dark-content" />}

      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<WelcomeOverview />}
        renderSectionHeader={renderHeader}
        renderItem={renderItem}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  )
}

export default memo(HotspotsList)
