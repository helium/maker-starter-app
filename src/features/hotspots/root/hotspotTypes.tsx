import { HotspotType } from '@helium/onboarding'
import { StackNavigationProp } from '@react-navigation/stack'
import Config from 'react-native-config'

export type Hotspot = { address: string }

export type HotspotStackParamList = {
  HotspotsScreen:
    | undefined
    | { address: string; resource: 'validator' | 'hotspot' }
  HotspotScreen: { hotspot: Hotspot }
}

export type HotspotNavigationProp = StackNavigationProp<HotspotStackParamList>

export const HotspotActivityKeys = [
  'all',
  'rewards',
  'challenge_activity',
  'data_transfer',
  'challenge_construction',
  'consensus_group',
] as const
export type HotspotActivityType = (typeof HotspotActivityKeys)[number]

export const HotspotActivityFilters = {
  all: [],
  rewards: ['rewards_v1', 'rewards_v2'],
  challenge_activity: ['poc_receipts_v1', 'poc_receipts_v2'],
  data_transfer: ['state_channel_close_v1'],
  challenge_construction: ['poc_request_v1'],
  consensus_group: ['consensus_group_v1'],
} as Record<HotspotActivityType, string[]>

export type HotspotSyncStatus = 'full' | 'partial'

export const GLOBAL_OPTS = ['explore', 'search', 'home'] as const
export type GlobalOpt = (typeof GLOBAL_OPTS)[number]

export const getHotspotTypes = ({
  hotspotMakerAddress,
}: {
  hotspotMakerAddress: string
}): HotspotType[] => {
  /*
    NOTE: Determine which network types this hotspot supports
    Could possibly use your maker address, make sure that 5G maker address 
    is present in the env file
  */

  if (
    Config.MAKER_ADDRESS_5G &&
    Config.MAKER_ADDRESS_5G === hotspotMakerAddress
  ) {
    console.log('5g hotspot containing both iot and mobile radio')
    return ['IOT', 'MOBILE']
  }
  console.log('iot hotspot')
  return ['IOT']
}
