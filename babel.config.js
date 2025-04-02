// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      "@babel/preset-react", // Add this line to enable JSX transformation
    ],
    plugins: [
      "react-native-reanimated/plugin",
      "@babel/plugin-syntax-jsx", // Add this for JSX parsing
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
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-private-methods",
      "@babel/plugin-proposal-private-property-in-object",
    ],
  };
};
