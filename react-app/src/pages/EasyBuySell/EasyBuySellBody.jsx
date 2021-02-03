import { Container, Row } from "reactstrap";
import MarketData from "~/components/MarketData/MarketData.jsx";

const EasyBuySellBody = props => {
  return (
      <section className="main-body main-h100">
          <Container fluid>
              <Row>
                  <aside className="main-body-leftside col-auto">
                      <MarketData />
                  </aside>
                  <section className="main-body-rightcont col">
                      TEST
                  </section>
              </Row>
          </Container>
      </section>
  );
};

export default EasyBuySellBody;