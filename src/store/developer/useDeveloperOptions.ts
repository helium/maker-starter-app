import { useMemo } from 'react'
import Config from 'react-native-config'
import { useSelector } from 'react-redux'
import { RootState } from '../rootReducer'

const useDeveloperOptions = () => {
  const devOptions = useSelector((state: RootState) => state.developer)

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

  return { ...devOptions, onboardingEndpoint, solanaRpcEndpoint }
}

export default useDeveloperOptions
