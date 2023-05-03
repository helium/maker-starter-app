import { HotspotType } from '@helium/onboarding'
import { HotspotMeta } from '@helium/react-native-sdk'
import { StackNavigationProp } from '@react-navigation/stack'

export type Hotspot = {
  address: string
  animalName: string
}

export type HotspotDetail = {
  lat?: number
  lng?: number
  location?: string
  elevation?: number
  gain?: number
  networkTypes?: HotspotType[]
}

export type HotspotStackParamList = {
  HotspotsScreen:
    | undefined
    | { address: string; resource: 'validator' | 'hotspot' }
  HotspotScreen: { hotspot: Hotspot; meta?: HotspotMeta }
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

export const FREEDOM_FI_MAKER_NAME = 'freedomfi'
export const FREEDOM_FI_MAKER_ADDRESS =
  '13y2EqUUzyQhQGtDSoXktz8m5jHNSiwAKLTYnHNxZq2uH5GGGym'

export const getHotspotTypes = (makerNameOrAddress?: string): HotspotType[] => {
  if (
    makerNameOrAddress?.toLowerCase().includes(FREEDOM_FI_MAKER_NAME) ||
    makerNameOrAddress === FREEDOM_FI_MAKER_ADDRESS
  ) {
    return ['IOT', 'MOBILE']
  }

  return ['IOT']
}
