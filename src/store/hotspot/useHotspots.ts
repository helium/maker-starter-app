import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useSolana } from '@helium/react-native-sdk'
import { fetchHotspots } from './hotspotSlice'
import { RootState } from '../rootReducer'
import { useAppDispatch } from '../store'
import { getAddress } from '../../utils/secureAccount'
import useDeveloperOptions from '../developer/useDeveloperOptions'

const useHotspots = () => {
  const dispatch = useAppDispatch()
  const { getHotspots: fetcher } = useSolana()
  const { cluster } = useDeveloperOptions()
  const hotspot = useSelector(
    (state: RootState) => state.hotspot.hotspotsByCluster[cluster],
  )
  const loadingHotspots = useSelector(
    (state: RootState) => state.hotspot.loadingHotspots,
  )

  const getHotspots = useCallback(async () => {
    const heliumAddress = await getAddress()
    if (!heliumAddress) {
      // TODO: Handle Error
      return
    }

    dispatch(
      fetchHotspots({
        fetcher,
        heliumAddress,
        cluster,
      }),
    )
  }, [dispatch, fetcher, cluster])

  return { ...hotspot, getHotspots, loadingHotspots }
}

export default useHotspots
