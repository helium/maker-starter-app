// eslint-disable-next-line import/no-unassigned-import
import "utils/polyfill";

import React from "react";

// TODO: Fix error with (?)transpiling.
// eslint-disable-next-line import/namespace
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";

import App from "App";
import LanguageProvider from "providers/LanguageProvider";
import store from "store/store";

import { name as appName } from "./package.json";

const render = (): JSX.Element => {
  return (
    <LanguageProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </LanguageProvider>
  );
};

// TODO: Update app name to follow correct format in package.json, enable rule for npmpackagejsonlint.
AppRegistry.registerComponent(appName, () => render);
