import { useMemo } from 'react'
import Config from 'react-native-config'
import { useSelector } from 'react-redux'
import { getStatus, SolanaStatus } from '../store/developer/developerSlice'
import { RootState } from '../store/rootReducer'
import { useAppDispatch } from '../store/store'
import useMount from './useMount'

const useDeveloperOptions = () => {
  const devOptions = useSelector((state: RootState) => state.developer)

  const dispatch = useAppDispatch()

  useMount(() => {
    dispatch(getStatus())
  })

  // TODO: MAKE ONBOARDING SERVER CONFIGURABLE
  // TODO: UPDATE APP CENTER SCRIPT FOR CONIG VARS

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
