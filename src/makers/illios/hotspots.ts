import HotspotIcon from './icon.svg'
import { MakerHotspot } from '../hotspotMakerTypes'
import ANTENNAS from './antennas'

const IlliosHotspotBLE = {
  name: 'Illios Hotspot BLE',
  icon: HotspotIcon,
  onboardType: 'BLE',
  translations: {
    en: {
      internal: [
        {
          title: 'Diagnótico',
          body:
            '<b>Diagnostic support allows Illios to identify issues with your Hotspot in a secure way.</white></b>\n\nHelium will never have access to private keys and will only ever be able to access your Hotspot and not any other devices on your Network.\n\nIf you would like to opt-out of diagnostic support please email <b>support@phygitall.com</b>from the email used to purchase the Hotspot.',
          button: '[next button - 1]',
        },
        {
          title: 'Potência',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          button: '[next button - 2]',
        },
        {
          title: '[title.3]',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          button: '[finish button]',
        },
      ],
    },
    ja: {},
    ko: {},
    zh: {},
  },
  antenna: {
    us: ANTENNAS.ILLIOS_AU,
    default: ANTENNAS.ILLIOS_AU,
  },
} as MakerHotspot

const IlliosHotspotQR = {
  name: 'Illios Hotspot QR',
  icon: HotspotIcon,
  onboardType: 'QR',
  translations: {
    en: {
      externalOnboard: 'Visite illios.com/qr para gerar o código QR',
    },
    ja: {},
    ko: {},
    zh: {},
  },
  antenna: {
    us: ANTENNAS.ILLIOS_AU,
    default: ANTENNAS.ILLIOS_AU,
  },
} as MakerHotspot

const IlliosHotspotWeb = {
  name: 'Illios Hotspot Web',
  icon: HotspotIcon,
  onboardType: 'WEB',
  onboardUrl: 'https://illios.com/setup',
  translations: {
    en: {
      externalOnboard: 'Visite o site da Illios para configurar o Hotspot',
    },
    ja: {},
    ko: {},
    zh: {},
  },
  antenna: {
    us: ANTENNAS.ILLIOS_AU,
    default: ANTENNAS.ILLIOS_AU,
  },
} as MakerHotspot

export default { IlliosHotspotBLE, IlliosHotspotQR, IlliosHotspotWeb }
