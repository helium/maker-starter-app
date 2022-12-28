import IN1Icon from './in1.svg'
import OUT1Icon from './out1.svg'
import INROCKPIIcon from './inrockpi.svg'
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

export default { IN1BLE, OUT1BLE, HHRK4IN1BLE }
