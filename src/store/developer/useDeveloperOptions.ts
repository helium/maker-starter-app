import { useMemo } from 'react'
import Config from 'react-native-config'
import { useSelector } from 'react-redux'
import { getStatus, SolanaStatus } from './developerSlice'
import { RootState } from '../rootReducer'
import { useAppDispatch } from '../store'
import useMount from '../../utils/useMount'

const useDeveloperOptions = (refresh = true) => {
  const devOptions = useSelector((state: RootState) => state.developer)

  const dispatch = useAppDispatch()

  useMount(() => {
    if (!refresh) return
    dispatch(getStatus())
  })

  const solanaRpcEndpoint = useMemo(() => {
    let endpoint: string | undefined
    if (devOptions.cluster === 'mainnet-beta') {
      endpoint = Config.SOLANA_RPC_ENDPOINT
    } else {
      endpoint = Config.DEVNET_SOLANA_RPC_ENDPOINT
    }
    if (!endpoint) throw new Error('Solana RPC Endpoint is missing!')

    return endpoint
  }, [devOptions.cluster])

  const onboardingEndpoint = useMemo(() => {
    let endpoint: string | undefined
    if (devOptions.cluster === 'mainnet-beta') {
      endpoint = Config.ONBOARDING_BASE_URL
    } else {
      endpoint = Config.TEST_ONBOARDING_BASE_URL
    }
    if (!endpoint) throw new Error('Onboarding Endpoint is missing!')

    return endpoint
  }, [devOptions.cluster])

  const status = useMemo((): SolanaStatus => {
    if (devOptions.forceSolana) {
      return 'complete'
    }
    return devOptions.status
  }, [devOptions.forceSolana, devOptions.status])

  return { ...devOptions, onboardingEndpoint, solanaRpcEndpoint, status }
}

export default useDeveloperOptions
