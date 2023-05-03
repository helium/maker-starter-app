import { useCallback } from 'react'
import { useOnboarding } from '@helium/react-native-sdk'
import { OnboardingRecord } from '@helium/onboarding'
import { fetchOnboarding } from './hotspotSlice'
import { useAppDispatch } from '../store'
import useDeveloperOptions from '../developer/useDeveloperOptions'

const useGetOnboardingRecord = () => {
  const dispatch = useAppDispatch()
  const { getOnboardingRecord } = useOnboarding()
  const { cluster } = useDeveloperOptions()

  const fetchOnboardingRecord = useCallback(
    async (address: string) => {
      if (!address) return

      const state = await dispatch(
        fetchOnboarding({
          fetcher: getOnboardingRecord,
          hotspotAddress: address,
          cluster,
        }),
      )
      return state.payload as OnboardingRecord | undefined | null
    },
    [cluster, dispatch, getOnboardingRecord],
  )

  return fetchOnboardingRecord
}

export default useGetOnboardingRecord
