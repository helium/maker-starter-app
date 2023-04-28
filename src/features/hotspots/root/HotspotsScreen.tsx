import React, { memo, useCallback, useEffect, useState } from 'react'
import { Asset, useSolana } from '@helium/react-native-sdk'
import { Hotspot } from '@helium/http'
import { useNavigation } from '@react-navigation/native'
import { useAnalytics } from '@segment/analytics-react-native'
import Box from '../../../components/Box'
import useMount from '../../../utils/useMount'
// import { fetchHotspotsData } from '../../../store/hotspots/hotspotsSlice'
// import { useAppDispatch } from '../../../store/store'
import HotspotsEmpty from './HotspotsEmpty'
import Hotspots from './Hotspots'
import { getAddress } from '../../../utils/secureAccount'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { ActivityIndicator } from 'react-native'
import { useColors } from '../../../theme/themeHooks'

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
  const [hotstpotFetched, setHotspotFetched] = useState<boolean>(false)
  const nav = useNavigation<RootNavigationProp>()
  const { primaryText } = useColors()

  const { getHotspots } = useSolana()

  // const dispatch = useAppDispatch()

  // useMount(() => {
  //   dispatch(fetchHotspotsData())
  // })

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
    setHotspotFetched(true)

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
