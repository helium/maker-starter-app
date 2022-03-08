import HotspotIcon from './icon.svg'
import { MakerHotspot } from '../hotspotMakerTypes'
import ANTENNAS from './antennas'

const NebraHotspotBLE = {
  name: 'Nebra Hotspot',
  icon: HotspotIcon,
  onboardType: 'BLE',
  translations: {
    en: {
      internal: [
        {
          title: 'Pair with hotspot',
          body:
            'Press and hold the button on the side of your hotspot for 3 seconds to make it discoverable.',
          button: 'Continue',
        },
      ],
    },
    ja: {},
    ko: {},
    zh: {},
  },
  antenna: {
    us: ANTENNAS.NEBRA_US_3,
    default: ANTENNAS.NEBRA_US_3,
  },
} as MakerHotspot

export default { NebraHotspotBLE }
