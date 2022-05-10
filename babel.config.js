module.exports = (api) => {
  api.cache(true);

  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          root: ["./src"],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
