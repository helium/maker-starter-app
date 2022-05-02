import React from "react";
import Box from "./Box";

type Props = { filled?: boolean };
const dotSize = 16;
const Dot = ({ filled }: Props) => {
  return (
    <Box
      borderWidth={1}
      marginHorizontal="xs"
      borderColor="primaryText"
      width={dotSize}
      height={dotSize}
      borderRadius="round"
      backgroundColor={filled ? "primaryText" : undefined}
    />
  );
};

export default Dot;
