import helium from './helium'
import freedomfi from './freedomfi'
import customAntennas from './custom/antennas'
import { LangType, supportedLangs } from '../utils/i18n/i18nTypes'
import { HotspotMakerLangField } from './hotspotMakerTypes'

export const Makers: Record<string, { id: number; supportEmail: string }> = {
  helium,
  freedomfi,
}

export const AntennaModels = {
  ...helium.antennas,
  ...freedomfi.antennas,
  ...customAntennas,
}

export const HotspotMakerModels = {
  ...helium.hotspots,
  ...freedomfi.hotspots,
}

export type HotspotType = keyof typeof HotspotMakerModels
export const HotspotModelKeys = Object.keys(
  HotspotMakerModels,
).sort() as HotspotType[]
export const HotspotTypeCount = HotspotModelKeys.length

type MakerLangType = Record<
  HotspotType,
  Record<
    HotspotMakerLangField,
    string | { title: string; body: string; button: string }[]
  >
>
export const getTranslations = () => {
  const trans: Record<LangType, MakerLangType> = {
    en: {} as MakerLangType,
    ko: {} as MakerLangType,
    zh: {} as MakerLangType,
    ja: {} as MakerLangType,
  }

  supportedLangs.forEach((l) => {
    HotspotModelKeys.forEach((ht) => {
      trans[l][ht] = HotspotMakerModels[ht].translations[l]
    })
  })
  return trans
}

export type AntennaType = keyof typeof AntennaModels
export const AntennaModelKeys = Object.keys(
  AntennaModels,
).sort() as AntennaType[]
export const AntennaTypeCount = AntennaModelKeys.length

export const getMakerSupportEmail = (makerId?: number): string => {
  const makerKey = Object.keys(Makers).find((m) => Makers[m].id === makerId)
  return makerKey ? Makers[makerKey].supportEmail : 'support@helium.com'
}
