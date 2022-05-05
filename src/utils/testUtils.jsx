import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ThemeProvider } from "@shopify/restyle";
import { render as rtlRender } from "@testing-library/react-native";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import i18n from "i18n";
import rootReducer from "store/rootReducer";
import { theme } from "theme/theme";

const { Screen, Navigator } = createStackNavigator();

const render = (ui, { initialState, ...renderOptions } = {}) => {
  // TODO: Convert to TS. Fix tests.
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
      middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
    });
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <NavigationContainer>{children}</NavigationContainer>
          </I18nextProvider>
        </ThemeProvider>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

const renderWithNav = (ui, { initialState, ...renderOptions } = {}) => {
  // TODO: Convert to TS. Fix tests.
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
      middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
    });
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <NavigationContainer>
              <Navigator>
                <Screen name="Test" component={children} />
              </Navigator>
            </NavigationContainer>
          </I18nextProvider>
        </ThemeProvider>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// override render method
export * from "@testing-library/react-native";
export { render, renderWithNav };
