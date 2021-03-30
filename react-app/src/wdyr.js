import React from "react";

const { NODE_ENV, REACT_APP_DEBUG } = process.env;

if (Boolean(REACT_APP_DEBUG) && NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  const ReactRedux = require("react-redux");

  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[ReactRedux, "useSelector"]],
  });
}
