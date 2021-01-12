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
  // devServer: whenDev(() => ({
  //   https: true,
  //   pfx: fs.readFileSync(path.resolve("./localhost.pfx")),
  //   pfxPassphrase: "temp123!",
  //   proxy: {
  //     "/api": {
  //       target: "https://mobile.guvenlibtc.com:443/api",
  //       // changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // })),
};
