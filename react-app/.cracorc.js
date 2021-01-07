require = require("esm")(module);
const path = require("path");
const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
} = require("@craco/craco");

const { SUPPORTED_LANGUAGES } = require("./src/setupI18n");

module.exports = {
  // babel: {
  //   plugins: [
  //     [
  //       "i18next-extract",
  //       {
  //         locales: SUPPORTED_LANGUAGES,
  //         outputPath: "translations/{{locale}}/{{ns}}.json",
  //       },
  //     ],
  //   ],
  // },
  webpack: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^~(.*)$": "<rootDir>/src$1",
      },
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "https://localhost:3443",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
