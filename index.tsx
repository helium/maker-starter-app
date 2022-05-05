import "utils/polyfill";
import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import App from "App";
import store from "store/store";
import LanguageProvider from "providers/LanguageProvider";
import { name as appName } from "./package.json";

const render = () => {
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
