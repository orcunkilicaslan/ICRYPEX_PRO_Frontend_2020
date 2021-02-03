import classNames from "classnames";

import ProTradingBody from "./ProTradingBody.jsx";
import ProTradingFooter from "./ProTradingFooter.jsx";

export const ProTrading = props => {
  const { className } = props;

  return (
    <main className={classNames("main", className)}>
      <ProTradingBody />
      <ProTradingFooter />
    </main>
  );
};