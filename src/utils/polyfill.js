import buffer from "buffer";

import { Platform } from "react-native";

// noinspection JSConstantReassignment
global.document = {
  addEventListener: () => {},
};

if (Platform.OS === "android") {
  // eslint-disable-next-line import/no-unassigned-import
  require("number-to-locale-string-polyfill");
}

global.Buffer = global.Buffer || buffer.Buffer;
