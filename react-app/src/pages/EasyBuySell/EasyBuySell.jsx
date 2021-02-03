import classNames from "classnames";
import SectionCoinBar from "~/pages/Sections/SectionCoinBar.jsx";
import EasyBuySellBody from "./EasyBuySellBody.jsx";
import { Footer } from "~/components/Footer/Footer.jsx";

export const EasyBuySell = props => {
  const { className } = props;

  return (
      <main className={classNames("main", className)}>
          <SectionCoinBar />
          <EasyBuySellBody />
          <Footer />
      </main>
  );
};