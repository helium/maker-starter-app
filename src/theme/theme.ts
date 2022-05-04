import { createTheme } from "@shopify/restyle";
import { TextProps } from "react-native";

const textVariants = {
  h1: {
    fontSize: 40,
    fontWeight: "bold",
    color: "primaryText",
  },
  h2: {
    fontSize: 33,
    fontWeight: "bold",
    color: "primaryText",
  },
  h3: {
    fontSize: 27,
    fontWeight: "bold",
    color: "primaryText",
  },
  h4: {
    fontSize: 22,
    fontWeight: "bold",
    color: "primaryText",
  },
  subtitle1: {
    fontSize: 20,
    fontWeight: "500",
    color: "primaryText",
  },
  subtitle2: {
    fontSize: 17,
    fontWeight: "500",
    color: "primaryText",
  },
  body1: {
    fontSize: 17,
    color: "primaryText",
  },
  body2: {
    fontSize: 14,
    color: "primaryText",
  },
  body3: {
    fontSize: 11,
    color: "primaryText",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
  },
  button: {
    color: "primaryText",
    textAlign: "center",
    fontSize: 17,
  } as TextProps,
  keypad: {
    fontSize: 40,
    color: "primaryText",
  },
};

const palette = {
  blizzardWhite: "#F5F5F5",
  boneBlack: "#2F2F2F",
  citrine: "#EACE03",
  ghost: "#C7CCCF",
  white: "#FFFFFF",
  greenBlue: "#00B196",
  fadedRed: "#D3494E",
  cornflowerBlue: "#4A85F7",
};

export const themeColors = {
  ...palette,

  primary: palette.citrine,
  primaryBackground: palette.blizzardWhite,
  primaryText: palette.boneBlack,

  secondaryBackground: palette.white,
  secondary: palette.ghost,
  secondaryText: palette.boneBlack,

  error: palette.fadedRed,
  linkText: palette.cornflowerBlue,

  surface: palette.blizzardWhite,
  surfaceText: palette.boneBlack,
  surfaceSecondary: palette.white,
  surfaceSecondaryText: palette.boneBlack,
  surfaceContrast: palette.boneBlack,
  surfaceContrastText: palette.white,
};

export const theme = createTheme({
  colors: themeColors,
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
      padding: "ms",
      borderRadius: "ms",
      backgroundColor: "surface",
    },
    elevated: {
      shadowColor: "secondaryBackground",
      borderRadius: "m",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 9,
    },
    modal: {
      backgroundColor: "surface",
      borderRadius: "xl",
    },
  },
  textVariants,
  inputVariants: {
    regular: {
      backgroundColor: "secondaryBackground",
      fontSize: 18,
      color: "primaryText",
      borderRadius: "m",
    },
    secondary: {
      backgroundColor: "surfaceSecondary",
      height: 52,
      paddingHorizontal: "m",
      fontSize: 18,
      color: "surfaceSecondaryText",
      borderRadius: "m",
    },
  },
});

export type Theme = typeof theme;
export type TextVariant = keyof Theme["textVariants"];
export type Spacing = keyof Theme["spacing"];
export type Colors = keyof Theme["colors"];
