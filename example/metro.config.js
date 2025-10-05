/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const path = require("path");
const { getDefaultConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,

  // Следим за изменениями в корне библиотеки
  watchFolders: [path.resolve(__dirname, "..")],

  resolver: {
    ...defaultConfig.resolver,

    // Разрешаем модули из корневой директории
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          if (name === "react-native-typed-config") {
            return path.resolve(__dirname, "..");
          }
          return path.join(__dirname, "node_modules", name);
        },
      }
    ),
  },
};
