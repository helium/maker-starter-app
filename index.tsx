import "./src/utils/polyfill";
import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import App from "./src/App";
import { name as appName } from "./package.json";
import store from "./src/store/store";
import LanguageProvider from "./src/providers/LanguageProvider";

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
