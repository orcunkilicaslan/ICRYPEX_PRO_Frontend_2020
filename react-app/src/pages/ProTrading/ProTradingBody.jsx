import { Container, Row } from "reactstrap";

import MarketData from "~/components/MarketData/MarketData.jsx";
import TopCoinBar from "~/components/Sections/TopCoinBar.jsx";
import TradingViewBig from "~/components/Sections/TradingViewBig.jsx";

const ProTradingBody = props => {
  return (
    <section className="main-body main-h100">
      <Container fluid>
        <Row>
          <aside className="main-body-leftside col-auto">
            <MarketData />
          </aside>
          <section className="main-body-rightcont col">
            <TopCoinBar />
            <TradingViewBig />
          </section>
        </Row>
      </Container>
    </section>
  );
};

export default ProTradingBody;