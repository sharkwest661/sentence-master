// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin", // Keep reanimated plugin first if required by its docs
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@": "./src",
          },
        },
      ],
      // Add the necessary class feature plugins (order might matter, often class-properties first)
      // Ensure these match what's in your package.json devDependencies
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-private-methods",
      "@babel/plugin-proposal-private-property-in-object",
    ],
  };
};
