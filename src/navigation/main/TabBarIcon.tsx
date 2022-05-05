import React, { memo } from "react";

import Cog from "assets/images/cog.svg";
import Hotspot from "assets/images/placeholder.svg";
import Box from "components/Box";

import { MainTabType, TabBarIconType } from "./tabTypes";

type Props = {
  name: MainTabType;
} & TabBarIconType;

const Icon = ({ size, name }: { size: number; name: MainTabType }) => {
  switch (name) {
    case "Hotspots":
      return <Hotspot height={size} width={size} />;

    case "Settings":
      return <Cog height={size} width={size} />;

    default:
      throw new Error("Unknown tab name");
  }
};

const TabBarIcon = ({ name, focused, size }: Props) => {
  const style = { opacity: focused ? 1 : 0.2 };

  return (
    <Box
      alignItems="center"
      flex={1}
      justifyContent="center"
      padding="xxxs"
      paddingTop="s"
      style={style}
    >
      <Icon size={size} name={name} />
    </Box>
  );
};

export default memo(TabBarIcon);
