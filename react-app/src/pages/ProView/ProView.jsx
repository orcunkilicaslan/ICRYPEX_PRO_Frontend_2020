import classNames from "classnames";

import ProViewBody from "./ProViewBody.jsx";
import ProViewFooter from "./ProViewFooter.jsx";

export const ProView = props => {
  const { className } = props;

  return (
    <main className={classNames("main", className)}>
      <ProViewBody />
      <ProViewFooter />
    </main>
  );
};