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
}

export enum Action {
  LOADED = 'loaded',
  ADDED = 'added',
  VISITED = 'visited',
}

export enum SubScope {}

export const getEvent = (event: Event) => {
  if (event.hasOwnProperty('sub_scope')) {
    return `${SOURCE}.${event.scope}_${event.sub_scope}.${event.action}`
  }
  return `${SOURCE}.${event.scope}.${event.action}`
}
