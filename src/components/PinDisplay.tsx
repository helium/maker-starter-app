import React from "react";

import { BoxProps } from "@shopify/restyle";

import { Theme } from "theme/theme";

import Box from "./Box";
import Dot from "./Dot";

type Props = BoxProps<Theme> & { length: number };
const PinDisplay = ({ length, ...props }: Props) => {
  return (
    <Box flexDirection="row" {...props}>
      {[...Array(6).keys()].map((i) => (
        <Dot key={i} filled={length > i} />
      ))}
    </Box>
  );
};

export default PinDisplay;
