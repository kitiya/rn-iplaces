module.exports = function (api) {
  api.cache(true);
  return {
    // presets: ["module:babel-preset-expo", "module:react-native-dotenv"],
    presets: ["babel-preset-expo"],
  };
};
