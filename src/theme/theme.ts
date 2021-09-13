import { createTheme } from '@shopify/restyle'
import { TextProps } from 'react-native'

// TODO restructure this color palatte like material or ant

const palette = {
  primary: '#474DFF',
  primaryBackground: '#161B3D',
  primaryText: '#FFFFFF',

  secondary: '#1D91F8',
  secondaryText: '#74869A',

  black: '#000000',
  white: '#FFFFFF',
  transparent: '#00000000',
  whiteTransparent: '#FFFFFF66',
  offwhite: '#F9FAFC',
  offblack: '#1C1E3B',

  blueGray: '#33414E',
  blueDark: '#232E39',
  grayLight: '#DADADA',
  grayMain: '#81909F',
  graySteel: '#74869A',
  grayDark: '#202B37',
  grayBox: '#F6F7FE',
  grayHex: '#4F5293',

  redMain: '#F97570',
  redMedium: '#FF6666',

  purple: '#B377FF',
  purpleBright: '#AA3EFF',
  purpleLight: '#A0A5DA',
  purpleGray: '#BBBDD8',
  purple500: '#232749',
  purple400: '#292E56',
  purple300: '#343964',
  purple200: '#23264b',
  purpleMuted: '#666995',
  purpleBrightMuted: '#7788D4',
  purpleDarkMuted: '#4C5280',

  greenBright: '#29D391',
  greenMain: '#32C48D',

  yellow: '#FCC945',
}

export const Font = {
  main: {
    light: 'Inter-Light',
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
  },
  mono: {
    light: 'InputMono-Light',
    regular: 'InputMono-Regular',
  },
}

const textVariants = {
  h1: {
    fontFamily: Font.main.semiBold,
    fontSize: 40,
    lineHeight: 39,
    color: 'primaryText',
  },
  h1s: {
    // h1s stands for h1 small. TODO: Could rename all headings to fit this one in
    fontFamily: Font.main.semiBold,
    fontSize: 34,
    lineHeight: 33,
    color: 'primaryText',
  },
  h2: {
    fontFamily: Font.main.semiBold,
    fontSize: 27,
    lineHeight: 27,
    color: 'primaryText',
  },
  h3: {
    fontFamily: Font.main.semiBold,
    fontSize: 22,
    lineHeight: 22,
    color: 'primaryText',
  },
  h4: {
    fontFamily: Font.main.semiBold,
    fontSize: 20,
    lineHeight: 20,
    color: 'primaryText',
  },
  h5: {
    fontFamily: Font.main.semiBold,
    fontSize: 17,
    lineHeight: 17,
    color: 'primaryText',
  },
  h6: {
    fontFamily: Font.main.semiBold,
    fontSize: 13,
    lineHeight: 13,
    color: 'primaryText',
  },
  h7: {
    fontFamily: Font.main.semiBold,
    fontSize: 11,
    lineHeight: 11,
    color: 'primaryText',
  },
  regular: {
    fontFamily: Font.main.regular,
    color: 'primaryText',
  },
  light: {
    fontFamily: Font.main.light,
    color: 'primaryText',
  },
  bold: {
    fontFamily: Font.main.semiBold,
    color: 'primaryText',
  },
  mono: {
    fontFamily: Font.mono.regular,
    color: 'primaryText',
  },
  medium: {
    fontFamily: Font.main.medium,
    color: 'primaryText',
  },
  subtitle: {
    fontFamily: Font.main.regular,
    fontSize: 20,
    lineHeight: 22,
    color: 'purpleLight',
  },
  body1: {
    fontFamily: Font.main.regular,
    fontSize: 17,
    color: 'primaryText',
  },
  body2: {
    fontFamily: Font.main.regular,
    fontSize: 14,
    color: 'primaryText',
  },
  body3: {
    fontFamily: Font.main.regular,
    fontSize: 11,
    color: 'primaryText',
  },
  input: {
    fontFamily: Font.main.regular,
    flex: 1,
    borderWidth: 1,
    padding: 8,
  },
  button: {
    fontFamily: Font.main.regular,
    color: 'primaryText',
    textAlign: 'center',
    fontSize: 17,
  } as TextProps,
  keypad: {
    fontFamily: Font.main.medium,
    fontSize: 40,
    color: 'primaryText',
  },
}

export const theme = createTheme({
  colors: {
    ...palette,
  },
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
      backgroundColor: 'grayBox',
    },
    elevated: {
      shadowColor: 'blueDark',
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
      backgroundColor: 'white',
      borderRadius: 'xl',
    },
  },
  textVariants: {
    ...textVariants,

    buttonLight: { ...textVariants.button, ...textVariants.light },
    buttonMedium: { ...textVariants.button, ...textVariants.medium },
    buttonBold: { ...textVariants.button, ...textVariants.bold },
    buttonMono: { ...textVariants.button, ...textVariants.mono },

    body1Light: { ...textVariants.body1, ...textVariants.light },
    body1Medium: { ...textVariants.body1, ...textVariants.medium },
    body1Bold: { ...textVariants.body1, ...textVariants.bold },
    body1Mono: { ...textVariants.body1, ...textVariants.mono },

    body2Light: { ...textVariants.body2, ...textVariants.light },
    body2Medium: { ...textVariants.body2, ...textVariants.medium },
    body2Bold: { ...textVariants.body2, ...textVariants.bold },
    body2Mono: { ...textVariants.body2, ...textVariants.mono },

    body3Light: { ...textVariants.body3, ...textVariants.light },
    body3Medium: { ...textVariants.body3, ...textVariants.medium },
    body3Bold: { ...textVariants.body3, ...textVariants.bold },
    body3Mono: { ...textVariants.body3, ...textVariants.mono },

    subtitleLight: {
      ...textVariants.subtitle,
      fontFamily: textVariants.light.fontFamily,
    },
    subtitleRegular: { ...textVariants.subtitle, ...textVariants.regular },
    subtitleMedium: { ...textVariants.subtitle, ...textVariants.medium },
    subtitleBold: { ...textVariants.subtitle, ...textVariants.bold },
    subtitleMono: { ...textVariants.subtitle, ...textVariants.mono },
  },
  inputVariants: {
    regular: {
      backgroundColor: 'grayDark',
      fontFamily: Font.main.regular,
      fontSize: 18,
      color: 'white',
      borderRadius: 'm',
    },
    regularDark: {
      backgroundColor: 'purple500',
      fontFamily: Font.main.regular,
      fontSize: 20,
      height: 52,
      paddingHorizontal: 'm',
      color: 'white',
      borderRadius: 'm',
    },
    medium: {
      fontFamily: Font.main.regular,
      fontSize: 14,
      color: 'black',
      padding: 'm',
      backgroundColor: '#E7EEF3',
      borderRadius: 'm',
    },
    light: {
      fontFamily: Font.main.regular,
      fontSize: 18,
      color: 'black',
      borderRadius: 'm',
    },
  },
})

export type Theme = typeof theme
export type TextVariant = keyof Theme['textVariants']
export type Spacing = keyof Theme['spacing']
export type Colors = keyof Theme['colors']
