import { SvgProps } from 'react-native-svg'
import { LangType } from '../utils/i18n/i18nTypes'

export type HotspotMakerLangField = 'internal' | 'externalOnboard' | 'power'

export type OnboardType = 'BLE' | 'QR' | 'WEB'

type LangFieldsRecord = Record<
  HotspotMakerLangField,
  string | { title: string; body: string; button: string }[] | string[]
>
export type MakerHotspotTranslations = Record<LangType, LangFieldsRecord>
export type MakerHotspot = {
  translations: MakerHotspotTranslations
  icon: React.FC<SvgProps>
  name: string
  onboardType: OnboardType
  onboardUrl?: string
}
