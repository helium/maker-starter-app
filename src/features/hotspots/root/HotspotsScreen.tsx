import React, { memo, useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAnalytics } from '@segment/analytics-react-native'
import { ActivityIndicator } from 'react-native'
import Box from '../../../components/Box'
import useMount from '../../../utils/useMount'
import HotspotsEmpty from './HotspotsEmpty'
import Hotspots from './Hotspots'
import { getAddress } from '../../../utils/secureAccount'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { useColors } from '../../../theme/themeHooks'
import useSolanaCache from '../../../utils/solanaCache'

const HotspotsScreen = () => {
  const { getHotspotAddress, getCachedHotspots: getHotspots } = useSolanaCache()

  const [hotspots, setHotspots] = useState<{ address: string }[]>([])
  const [hotstpotFetched, setHotspotFetched] = useState<boolean>(false)
  const nav = useNavigation<RootNavigationProp>()
  const { primaryText } = useColors()

  const fetch = useCallback(async () => {
    const nextHotspots = await getHotspots()

    if (!nextHotspots) return

    const fetchedHotspots = nextHotspots?.map((h) => ({
      address: getHotspotAddress(h),
    }))

    setHotspotFetched(true)
    setHotspots(fetchedHotspots)
  }, [getHotspotAddress, getHotspots])

  useEffect(() => {
    const unsubscribe = nav.addListener('focus', () => {
      fetch()
    })

    return unsubscribe
  }, [fetch, nav])

  // Set segment identity
  const { identify } = useAnalytics()
  const [address, setAddress] = useState<string>()

  const [identified, setIdentified] = useState(false)

  useMount(() => {
    getAddress().then(setAddress)
  })

  useEffect(() => {
    if (address && !identified) {
      identify(address)

      setIdentified(true)
    }
  }, [address, identified, identify])

  return (
    <Box backgroundColor="primaryBackground" flex={1} justifyContent="center">
      {hotstpotFetched ? (
        hotspots.length === 0 ? (
          <HotspotsEmpty />
        ) : (
          <Hotspots hotspots={hotspots} />
        )
      ) : (
        <ActivityIndicator size="small" color={primaryText} />
      )}
    </Box>
  )
}

export default memo(HotspotsScreen)
