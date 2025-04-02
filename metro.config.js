// Modify metro.config.js in your project root (create if it doesn't exist)
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add any custom resolver settings if needed
config.resolver = {
  ...config.resolver,
  assetExts: [...config.resolver.assetExts, "ttf", "otf", "woff"],
  sourceExts: [...config.resolver.sourceExts, "cjs"],
};

module.exports = config;
