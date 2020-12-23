import classNames from "classnames";
import MainLayoutCryptocoinbar from "./MainLayoutCryptocoinbar.jsx";
import MainLayoutBody from "./MainLayoutBody.jsx";

export const Main = props => {
  const { className } = props;

  return (
      <main className={classNames("main", className)}>
          <MainLayoutCryptocoinbar />
          <MainLayoutBody />
      </main>
  );
};
