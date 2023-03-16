import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useOnboarding } from '@helium/react-native-sdk'
import { fetchHotspots } from './hotspotSlice'
import { RootState } from '../rootReducer'
import { useAppDispatch } from '../store'
import { getAddress } from '../../utils/secureAccount'
import useDeveloperOptions from '../developer/useDeveloperOptions'

const useHotspots = () => {
  const hotspot = useSelector((state: RootState) => state.hotspot)
  const dispatch = useAppDispatch()
  const { status } = useDeveloperOptions()
  const { getHotspots: fetcher } = useOnboarding()

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
        isSolana: status === 'complete',
      }),
    )
  }, [dispatch, fetcher, status])

  return { ...hotspot, getHotspots }
}

export default useHotspots
