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

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <NativeActivityIndicator {...propsWithDefaults} />;
};

const ActivityIndicatorCentered = (props: NativeActivityIndicatorProps) => {
  return (
    <Box flex={1} justifyContent="center">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ActivityIndicator {...props} />
    </Box>
  );
};

export { ActivityIndicator, ActivityIndicatorCentered };
