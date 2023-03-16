import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { HotspotMeta, useOnboarding } from '@helium/react-native-sdk'
import { HotspotType } from '@helium/onboarding'
import hotspotSlice, { fetchOnboarding } from './hotspotSlice'
import { RootState } from '../rootReducer'
import { useAppDispatch } from '../store'
import useDeveloperOptions from '../developer/useDeveloperOptions'
import useMount from '../../utils/useMount'

type Opts = { fetchOnMount: boolean }
const useHotspot = (address: string, opts?: Opts) => {
  const hotspot = useSelector((state: RootState) => state.hotspot)
  const dispatch = useAppDispatch()
  const { status } = useDeveloperOptions(false)
  const { getHotspotDetails: fetcher, getOnboardingRecord } = useOnboarding()
  const [loading, setLoading] = useState<boolean>()

  const getHotspotDetails = useCallback(async () => {
    if (loading) return

    if (status !== 'complete') {
      setLoading(false)
      return
    }

    let iotMeta: HotspotMeta | undefined
    let mobileMeta: HotspotMeta | undefined
    try {
      iotMeta = await fetcher({
        address,
        type: 'IOT', // Both freedomfi and helium support iot
      })
    } catch {}

    // See if it has been onboarded to the mobile network as well
    try {
      mobileMeta = await fetcher({
        address,
        type: 'MOBILE',
      })
    } catch {}

    const updated = iotMeta || mobileMeta
    if (!updated) return

    const networkTypes = [] as HotspotType[]

    if (iotMeta) {
      networkTypes.push('IOT')
    }
    if (mobileMeta) {
      networkTypes.push('MOBILE')
    }

    dispatch(
      hotspotSlice.actions.updateHotspotDetails({
        ...updated,
        address,
        networkTypes,
      }),
    )
    setLoading(false)
  }, [address, dispatch, fetcher, loading, status])

  useMount(() => {
    dispatch(
      fetchOnboarding({
        fetcher: getOnboardingRecord,
        hotspotAddress: address,
      }),
    )
    if (!opts?.fetchOnMount) {
      return
    }
    getHotspotDetails()
  })

  return {
    loading,
    getHotspotDetails,
    hotspotDetails: hotspot.hotspotDetails[address],
    onboardingRecord: hotspot.onboardingRecords[address],
  }
}

export default useHotspot
