import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { HotspotMeta, useOnboarding, useSolana } from '@helium/react-native-sdk'
import { HotspotType } from '@helium/onboarding'
import hotspotSlice, { fetchOnboarding } from './hotspotSlice'
import { RootState } from '../rootReducer'
import { useAppDispatch } from '../store'
import useMount from '../../utils/useMount'
import useDeveloperOptions from '../developer/useDeveloperOptions'

type Opts = { fetchOnMount: boolean }
const useHotspot = (address: string, opts?: Opts) => {
  const dispatch = useAppDispatch()
  const { getOnboardingRecord } = useOnboarding()
  const { cluster } = useDeveloperOptions()
  const hotspots = useSelector(
    (state: RootState) => state.hotspot.hotspotsByCluster[cluster],
  )
  const { getHotspotDetails: fetcher } = useSolana()
  const [loading, setLoading] = useState<boolean>()

  const getHotspotDetails = useCallback(async () => {
    if (loading) return

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
        cluster,
        networkTypes,
      }),
    )
    setLoading(false)
  }, [address, cluster, dispatch, fetcher, loading])

  useMount(() => {
    dispatch(
      fetchOnboarding({
        fetcher: getOnboardingRecord,
        hotspotAddress: address,
        cluster,
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
    hotspotDetails: hotspots.hotspotDetails[address],
    onboardingRecord: hotspots.onboardingRecords[address],
  }
}

export default useHotspot
