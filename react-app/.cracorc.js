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
const webpack = require("webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const gitRevisionPlugin = new GitRevisionPlugin();

const { SUPPORTED_LANGUAGES } = require("./src/setupI18n");

module.exports = {
  webpack: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    plugins: {
      add: [
        new webpack.DefinePlugin({
          "__env.HEAD": JSON.stringify(gitRevisionPlugin.commithash()),
        }),
      ],
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
  // devServer: {
    // https: true,
    // proxy: [
    //   {
    //     context: ["/socket", "/socket.io", "/api"],
    //     target: "https://mobile.guvenlibtc.com:443",
    //     changeOrigin: true,
    //     secure: false,
    //     ws: true,
    //   },
    // ],
  // },
};
