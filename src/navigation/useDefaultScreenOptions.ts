import { useColors } from '../theme/themeHooks'

const useDefaultScreenOptions = () => {
  const { primaryBackground, primaryText } = useColors()

  return {
    headerStyle: {
      backgroundColor: primaryBackground,
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
    headerTintColor: primaryText,
  }
}

export default useDefaultScreenOptions
