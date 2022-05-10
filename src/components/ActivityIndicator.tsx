import React from "react";

import {
  ActivityIndicator as NativeActivityIndicator,
  ActivityIndicatorProps as NativeActivityIndicatorProps,
} from "react-native";

import { useColors } from "theme/themeHooks";

import Box from "./Box";

const ActivityIndicator = (props: NativeActivityIndicatorProps) => {
  const { primary } = useColors();

  const propsWithDefaults = {
    ...props,
    color: props.color || primary,
  };

  return <NativeActivityIndicator {...propsWithDefaults} />;
};

const ActivityIndicatorCentered = (props: NativeActivityIndicatorProps) => {
  return (
    <Box flex={1} justifyContent="center">
      <ActivityIndicator {...props} />
    </Box>
  );
};

export { ActivityIndicator, ActivityIndicatorCentered };
