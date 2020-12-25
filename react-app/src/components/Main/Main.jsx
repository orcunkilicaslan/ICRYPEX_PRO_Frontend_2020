import classNames from "classnames";
import MainLayoutBody from "./MainLayoutBody.jsx";
import MainLayoutFoot from "./MainLayoutFoot.jsx";

export const Main = props => {
  const { className } = props;

  return (
      <main className={classNames("main", className)}>
          <MainLayoutBody />
          <MainLayoutFoot />
      </main>
  );
};
