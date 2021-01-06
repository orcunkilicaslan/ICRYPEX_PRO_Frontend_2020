const path = require("path");
const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
} = require("@craco/craco");

module.exports = {
  // babel: {
  //   plugins: ["i18next-extract"],
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
};
