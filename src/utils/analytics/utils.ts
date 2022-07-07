const SOURCE = 'app'

type Event = {
  scope: string
  sub_scope?: string
  action: string
}

export enum Scope {
  HOME = 'home',
  WALLET = 'wallet',
  HOTSPOT = 'hotspot',
  DASHBOARD = 'dashboard',
  SUPPORT = 'support',
}

export enum SubScope {
  BLUETOOTH_CONNECTION = 'bluetooth-connection',
  WIFI_SCAN = 'wifi-scan',
  WIFI_CONNECTION = 'wifi-connection',
  ANTENNA = 'antenna',
  LOCATION = 'location',
  TRANSFER = 'transfer',
}

export enum Action {
  LOADED = 'loaded',
  ADDED = 'added',
  VISITED = 'visited',
  STARTED = 'started',
  FINISHED = 'finished',
  FAILED = ' failed',
  NEW = 'new',
  SUBMITTED = 'submitted',
}

export const getEvent = (event: Event) => {
  if (event.hasOwnProperty('sub_scope')) {
    return `${SOURCE}.${event.scope}_${event.sub_scope}.${event.action}`
  }
  return `${SOURCE}.${event.scope}.${event.action}`
}
