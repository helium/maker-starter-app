import React, { memo, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Box from '../../../components/Box'
import HotspotsEmpty from './HotspotsEmpty'
import Hotspots from './Hotspots'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import useDeveloperOptions from '../../../store/developer/useDeveloperOptions'
import useHotspots from '../../../store/hotspot/useHotspots'

const HotspotsScreen = () => {
  const nav = useNavigation<RootNavigationProp>()
  const { status, cluster } = useDeveloperOptions()
  const { hotspots, loadingHotspots, getHotspots } = useHotspots()

  useEffect(() => {
    const unsubscribe = nav.addListener('focus', () => {
      getHotspots()
    })

    return unsubscribe
  }, [getHotspots, nav, status, cluster])

  return (
    <Box backgroundColor="primaryBackground" flex={1}>
      {hotspots !== undefined && hotspots.length === 0 ? (
        <HotspotsEmpty />
      ) : (
        <Hotspots hotspots={hotspots || []} loading={loadingHotspots} />
      )}
    </Box>
  )
}

export default memo(HotspotsScreen)
