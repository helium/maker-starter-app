import React, { memo, useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAnalytics } from '@segment/analytics-react-native'
import { Hotspot } from '@helium/http'
import { Asset, useOnboarding } from '@helium/react-native-sdk'
import Box from '../../../components/Box'
import useMount from '../../../utils/useMount'
import { fetchHotspotsData } from '../../../store/hotspots/hotspotsSlice'
import { useAppDispatch } from '../../../store/store'
import HotspotsEmpty from './HotspotsEmpty'
import Hotspots from './Hotspots'
import { getAddress } from '../../../utils/secureAccount'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'

const getHotspotAddress = (item: Asset | Hotspot): string => {
  const asset = item as Asset
  if (asset?.content?.json_uri) {
    return asset.content.json_uri.split('/').slice(-1)[0]
  }

  const hotspot = item as Hotspot
  return hotspot.address
}

const HotspotsScreen = () => {
  const [hotspots, setHotspots] = useState<{ address: string }[]>([])
  const nav = useNavigation<RootNavigationProp>()

  const { getHotspots } = useOnboarding()

  const dispatch = useAppDispatch()

  useMount(() => {
    dispatch(fetchHotspotsData())
  })

  const fetch = useCallback(async () => {
    const heliumAddress = await getAddress()
    if (!heliumAddress) {
      // TODO: Handle Error
      return
    }

    const nextHotspots = await getHotspots({
      heliumAddress,
      // makerName: Config.MAKER_NAME,
    })

    if (!nextHotspots) return

    setHotspots(nextHotspots?.map((h) => ({ address: getHotspotAddress(h) })))
  }, [getHotspots])

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
    <Box backgroundColor="primaryBackground" flex={1}>
      {hotspots.length === 0 ? (
        <HotspotsEmpty />
      ) : (
        <Hotspots hotspots={hotspots} />
      )}
    </Box>
  )
}

export default memo(HotspotsScreen)
