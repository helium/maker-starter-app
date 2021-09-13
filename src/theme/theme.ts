import { createTheme } from '@shopify/restyle'
import { TextProps } from 'react-native'

const textVariants = {
  h1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'primaryText',
  },
  h2: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'primaryText',
  },
  h3: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'primaryText',
  },
  subtitle1: {
    fontSize: 20,
    fontWeight: '300',
    color: 'primaryText',
  },
  subtitle2: {
    fontSize: 17,
    fontWeight: '300',
    color: 'primaryText',
  },
  body1: {
    fontSize: 17,
    color: 'primaryText',
  },
  body2: {
    fontSize: 14,
    color: 'primaryText',
  },
  body3: {
    fontSize: 11,
    color: 'primaryText',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
  },
  button: {
    color: 'primaryText',
    textAlign: 'center',
    fontSize: 17,
  } as TextProps,
  keypad: {
    fontSize: 40,
    color: 'primaryText',
  },
}

const palette = {
  charcoal: '#264653',
  peacockGreen: '#2A9D8F',
  yellow: '#E9C46A',
  deepOrange: '#F4A261',
  burntSienna: '#E76F51',
  black: '#000000',
  white: '#FFFFFF',
  transparent: '#00000000',
  offWhite: '#F9FAFC',
}

const isDarkTheme = false

const lightThemeColors = {
  ...palette,

  primary: palette.yellow,
  primaryBackground: palette.charcoal,
  primaryText: palette.white,
  secondaryBackground: palette.peacockGreen,
  secondary: palette.deepOrange,
  secondaryText: palette.yellow,
  surfaceText: palette.charcoal,
  error: palette.burntSienna,
  surface: palette.white,
  surfaceSecondary: palette.offWhite,
}
const darkThemeColors = {
  ...palette,

  primary: palette.yellow,
  primaryBackground: palette.charcoal,
  primaryText: palette.white,
  secondaryBackground: palette.peacockGreen,
  secondary: palette.deepOrange,
  secondaryText: palette.yellow,
  surfaceText: palette.charcoal,
  error: palette.burntSienna,
  surface: palette.white,
  surfaceSecondary: palette.offWhite,
}

export const theme = createTheme({
  colors: isDarkTheme ? darkThemeColors : lightThemeColors,
  spacing: {
    n_xxxxl: -240,
    n_xxxl: -120,
    n_xxl: -60,
    n_xl: -40,
    n_lx: -32,
    n_l: -24,
    n_lm: -20,
    n_m: -16,
    n_ms: -12,
    n_s: -8,
    n_xs: -4,
    n_xxs: -2,
    n_xxxs: -1,
    none: 0,
    xxxs: 1,
    xxs: 2,
    xs: 4,
    s: 8,
    ms: 12,
    m: 16,
    lm: 20,
    l: 24,
    lx: 32,
    xl: 40,
    xxl: 60,
    xxxl: 120,
    xxxxl: 240,
  },
  borderRadii: {
    none: 0,
    s: 4,
    ms: 6,
    m: 8,
    lm: 10,
    l: 12,
    xl: 20,
    round: 1000,
  },
  breakpoints: {
    smallPhone: 0,
    phone: 400,
    tablet: 768,
  },
  cardVariants: {
    regular: {
      padding: 'ms',
      borderRadius: 'ms',
      backgroundColor: 'surface',
    },
    elevated: {
      shadowColor: 'secondaryBackground',
      borderRadius: 'm',
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 9,
    },
    modal: {
      backgroundColor: 'surface',
      borderRadius: 'xl',
    },
  },
  textVariants,
  inputVariants: {
    regular: {
      backgroundColor: 'secondaryBackground',
      fontSize: 18,
      color: 'primaryText',
      borderRadius: 'm',
    },
    secondary: {
      backgroundColor: 'surfaceSecondary',
      height: 52,
      paddingHorizontal: 'm',
      fontSize: 18,
      color: 'surfaceText',
      borderRadius: 'm',
    },
  },
})

export type Theme = typeof theme
export type TextVariant = keyof Theme['textVariants']
export type Spacing = keyof Theme['spacing']
export type Colors = keyof Theme['colors']
