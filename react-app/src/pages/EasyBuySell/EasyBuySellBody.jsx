import { Container, Row } from "reactstrap";
import MarketData from "~/components/MarketData/MarketData.jsx";
import MainCont from "~/components/MainCont.jsx";

const EasyBuySellBody = props => {
  return (
      <section className="main-body main-h100">
          <Container fluid>
              <Row>
                  <aside className="main-body-leftside col-auto">
                      <MarketData />
                  </aside>
                  <section className="main-body-rightcont col">
                      <MainCont box>
                          <MainCont.Title titleName="Kolay Al Sat" />
                          <MainCont.Content contentName="easybuysell">
                              Kolay Al Sat Content
                          </MainCont.Content>
                      </MainCont>
                  </section>
              </Row>
          </Container>
      </section>
  );
};

export default EasyBuySellBody;