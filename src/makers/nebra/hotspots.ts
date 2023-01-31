import IN1Icon from './in1.svg'
import OUT1Icon from './out1.svg'
import INROCKPIIcon from './inrockpi.svg'
import IN5GIcon from './in5g.svg'
import { MakerHotspot } from '../hotspotMakerTypes'

const IN1BLE = {
  name: 'Nebra Indoor Original ',
  icon: IN1Icon,
  onboardType: 'BLE',
  translations: {
    en: {
      internal: [
        {
          title: 'Pair with hotspot',
          body: 'Press and hold the button on the side of your hotspot for 3 seconds to make it discoverable.',
          button: 'Continue',
        },
      ],
    },
    ja: {},
    ko: {},
    zh: {},
  },
} as MakerHotspot

const OUT1BLE = {
  name: 'Nebra Outdoor Original',
  icon: OUT1Icon,
  onboardType: 'BLE',
  translations: {
    en: {
      internal: [
        {
          title: 'Pair with hotspot',
          body: 'Unplug your device and plug back in. It will be discoverable for 5min after powering back on.',
          button: 'Continue',
        },
      ],
    },
    ja: {},
    ko: {},
    zh: {},
  },
} as MakerHotspot

const HHRK4IN1BLE = {
  name: 'Nebra Indoor ROCK Pi',
  icon: INROCKPIIcon,
  onboardType: 'BLE',
  translations: {
    en: {
      internal: [
        {
          title: 'Pair with hotspot',
          body: 'Press and hold the button on the side of your hotspot for 3 seconds to make it discoverable.',
          button: 'Continue',
        },
      ],
    },
    ja: {},
    ko: {},
    zh: {},
  },
} as MakerHotspot

const NEBRA5GMAGMA = {
  name: 'Nebra HNT 5G Gateway',
  icon: IN5GIcon,
  onboardType: 'WEB',
  translations: {
    en: {
      externalOnboard:
        'Please onboard your Nebra HNT 5G Gateway by tapping the link below:',
      power: [
        "Attach the antenna's and plug in the provided power adapter.",
        'The Hotspot PWR LED will light up once it’s powered on.',
      ],
      internal: [
        {
          title: 'Onboard the hotspot',
          body: 'Please onboard your Nebra 5G Gateway by tapping the link below:',
          button: 'Continue',
        },
      ],
    },
    ja: {},
    ko: {},
    zh: {},
  },
  onboardUrl: 'https://nebra.dashboard.helium.freedomfi.com//?wallet_id=WALLET',
} as MakerHotspot

export default { IN1BLE, OUT1BLE, HHRK4IN1BLE, NEBRA5GMAGMA }
