import { LocationGeocodedAddress } from 'expo-location'

const formatLocationName = (loc: LocationGeocodedAddress) => {
  if (loc.isoCountryCode) {
    if (loc.region) {
      if (loc.city) {
        if (loc.street) {
          return `${loc.street}, ${loc.city}, ${loc.region}, ${loc.isoCountryCode}`
        }
        return `${loc.city}, ${loc.region}, ${loc.isoCountryCode}`
      }
      return `${loc.region}, ${loc.isoCountryCode}`
    }
    return loc.isoCountryCode
  }
  return loc.name || loc.subregion
}

export default formatLocationName
