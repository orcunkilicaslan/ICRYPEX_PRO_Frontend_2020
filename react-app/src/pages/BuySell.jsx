import { Row, Col, Container } from "reactstrap";

import MarketData from "../components/MarketData/MarketData";
import CoinBar from "../components/Main/CompCryptocoinbar";
import { Footer } from "../components/Footer/Footer";

const BuySell = props => {
  return (
    <section className="kolay-body">
      <Container fluid>
        <Row>
          <Col>
            <CoinBar />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <MarketData />
          </Col>
        </Row>
        <Footer />
      </Container>
    </section>
  );
};

export default BuySell;
