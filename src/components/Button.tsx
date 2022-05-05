/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from "react";

import { BoxProps } from "@shopify/restyle";
import { StyleProp, ViewStyle } from "react-native";

import { Colors, Theme } from "theme/theme";

import Text from "./Text";
import TouchableOpacityBox from "./TouchableOpacityBox";
import WithDebounce from "./WithDebounce";

type ButtonColor = "primary" | "secondary";

type ButtonVariant = "contained" | "text";

type ButtonSize = "small" | "medium" | "large";

type Props = BoxProps<Theme> & {
  title: string;
  onPress: () => void;
  color: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
};

export const Button = ({
  title,
  onPress,
  color,
  variant = "contained",
  size = "medium",
  disabled = false,
  fullWidth = false,
  ...rest
}: Props) => {
  const getSize = useCallback(() => {
    switch (size) {
      case "small":
        return "s";

      case "medium":
        return "m";

      case "large":
        return "l";

      default:
        throw new Error("Unknown button size");
    }
  }, [size]);

  const getBackground = useCallback((): Colors | undefined => {
    if (variant === "text") {
      return undefined;
    }

    switch (color) {
      case "primary":
        return "primary";

      case "secondary":
        return "secondary";

      default:
        throw new Error("Unknown button color");
    }
  }, [color, variant]);

  const getTextColor = useCallback((): Colors | undefined => {
    return variant === "text" ? "linkText" : "primaryText";
  }, [variant]);

  const getTextWeight = useCallback(() => {
    return variant === "text" ? undefined : "bold";
  }, [variant]);

  const style: StyleProp<ViewStyle> = {
    opacity: disabled ? 0.2 : 1,
    width: fullWidth ? "100%" : undefined,
  };

  return (
    <TouchableOpacityBox
      onPress={onPress}
      disabled={disabled}
      backgroundColor={getBackground()}
      borderRadius="m"
      paddingHorizontal={getSize()}
      paddingVertical={getSize()}
      style={style}
      {...rest}
    >
      <Text variant="button" color={getTextColor()} fontWeight={getTextWeight()}>
        {title}
      </Text>
    </TouchableOpacityBox>
  );
};

export const DebouncedButton = WithDebounce(Button);
