import React from "react";

import { Theme } from "theme/theme";
import createText from "utils/createText";

const Text = createText<Theme>();

export default Text;

export type TextProps = React.ComponentProps<typeof Text>;
