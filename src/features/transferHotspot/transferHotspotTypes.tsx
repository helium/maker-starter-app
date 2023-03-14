import { StackNavigationProp } from '@react-navigation/stack'
import { HotspotLink } from '../../providers/appLinkTypes'

export type TransferHotspotStackParamList = {
  TransferHotspot: undefined
  HotspotTxnsSubmitScreen: HotspotLink
}

export type TransferHotspotNavigationProp =
  StackNavigationProp<TransferHotspotStackParamList>
