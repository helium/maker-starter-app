import { useSelector } from 'react-redux'
import { Asset, HotspotMeta, useSolana } from '@helium/react-native-sdk'
import { Hotspot } from '@helium/http'
import { useAppDispatch } from '../store/store'
import { getAddress } from './secureAccount'
import {
  HotspotsSliceState,
  updateHotspots,
  updateHotspotDetail,
  dropHotspotCache,
} from '../store/hotspots/hotspotsSlice'
import { RootState } from '../store/rootReducer'

function useSolanaCache() {
  const hotspots: HotspotsSliceState = useSelector(
    (state: RootState) => state.hotspots,
  )
  const { getHotspotDetails, getHotspots } = useSolana()
  const dispatch = useAppDispatch()

  const getHotspotAddress = (item: Asset | Hotspot): string => {
    const asset = item as Asset
    if (asset?.content?.json_uri) {
      return asset.content.json_uri.split('/').slice(-1)[0]
    }

    const hotspot = item as Hotspot
    return hotspot.address
  }

  const getCachedHotspots = async () => {
    if (hotspots.hotspotsLoaded) {
      return hotspots.hotspots
    }
    console.log('hotspots: cache miss')

    const heliumAddress = await getAddress()
    if (!heliumAddress) {
      return
    }

    const nextHotspots = await getHotspots({
      heliumAddress,
      // makerName: Config.MAKER_NAME,
    })

    if (!nextHotspots) return

    console.log('hotspots: cache miss, doing entry in cache')
    dispatch(updateHotspots(nextHotspots))
    return nextHotspots
  }

  const getCachedHotspotDetails = async (params: {
    address: string
    type: 'MOBILE' | 'IOT'
  }) => {
    if (hotspots.hotspotDetails.has(params.address)) {
      return hotspots.hotspotDetails.get(params.address)
    }
    const hotspotMeta = await getHotspotDetails(params)
    if (hotspotMeta) {
      console.log('cache miss')
      dispatch(
        updateHotspotDetail({
          address: params.address,
          hotspotDetail: hotspotMeta as HotspotMeta,
        }),
      )
    }
    return hotspotMeta
  }

  const invalidateHotspotCache = async () => {
    console.log('invalidating cache')
    dispatch(dropHotspotCache())
  }

  return {
    getHotspotAddress,
    getCachedHotspots,
    getCachedHotspotDetails,
    invalidateHotspotCache,
  }
}

export default useSolanaCache
