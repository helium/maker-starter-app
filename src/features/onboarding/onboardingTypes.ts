import { StackNavigationProp } from '@react-navigation/stack'
import { HotspotType } from '../../makers'
import { GatewayAction } from '../hotspots/setup/hotspotSetupTypes'

export type OnboardingStackParamList = {
  Welcome: undefined
  HotspotSetupScanningScreen: {
    hotspotType: HotspotType
    gatewayAction: GatewayAction
  }
  HotspotSetupPickHotspotScreen: {
    hotspotType: HotspotType
    gatewayAction: GatewayAction
  }
  HotspotSetupDiagnostics: undefined
}

export type OnboardingNavigationProp =
  StackNavigationProp<OnboardingStackParamList>
