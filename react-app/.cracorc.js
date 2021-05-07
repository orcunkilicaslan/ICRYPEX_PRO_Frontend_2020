require = require("esm")(module);
const path = require("path");
const fs = require("fs");
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
const presetReact = require("@babel/preset-react").default;
const presetCRA = require("babel-preset-react-app");

const { SUPPORTED_LANGUAGES } = require("./src/setupI18n");

let gitRevisionPlugin;
if (fs.existsSync(path.resolve(".git"))) {
  gitRevisionPlugin = new GitRevisionPlugin();
}
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  webpack: {
    alias: {
      "~": path.resolve(__dirname, "src"),
      "react-redux": isProd ? "react-redux" : "react-redux/lib",
    },
    plugins: {
      add: [
        new webpack.DefinePlugin({
          "__env.HEAD": JSON.stringify(gitRevisionPlugin?.commithash()),
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
  babel: {
    loaderOptions: babelLoaderOptions => {
      const origBabelPresetCRAIndex = babelLoaderOptions.presets.findIndex(
        preset => {
          return preset[0].includes("babel-preset-react-app");
        }
      );

      const origBabelPresetCRA =
        babelLoaderOptions.presets[origBabelPresetCRAIndex];

      babelLoaderOptions.presets[
        origBabelPresetCRAIndex
      ] = function overridenPresetCRA(api, opts, env) {
        const babelPresetCRAResult = require(origBabelPresetCRA[0])(
          api,
          origBabelPresetCRA[1],
          env
        );

        babelPresetCRAResult.presets.forEach(preset => {
          // detect @babel/preset-react with {development: true, runtime: 'automatic'}
          const isReactPreset =
            preset &&
            preset[1] &&
            preset[1].runtime === "automatic" &&
            preset[1].development === true;
          if (isReactPreset) {
            preset[1].importSource = "@welldone-software/why-did-you-render";
          }
        });

        return babelPresetCRAResult;
      };

      return babelLoaderOptions;
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
