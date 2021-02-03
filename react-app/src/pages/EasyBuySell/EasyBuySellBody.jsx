import { Container, Row } from "reactstrap";
import MarketData from "~/components/MarketData/MarketData.jsx";
import PrimaryMainCont from "~/components/PrimaryMainCont.jsx";

const EasyBuySellBody = props => {
  return (
      <section className="main-body main-h100">
          <Container fluid>
              <Row>
                  <aside className="main-body-leftside col-auto">
                      <MarketData />
                  </aside>
                  <section className="main-body-rightcont col">
                      <PrimaryMainCont box>
                          <PrimaryMainCont.MainTitle titleName="Kolay Al Sat" />
                          <PrimaryMainCont.MainContent contentClassName="easybuysell">
                              <PrimaryMainCont.Sub className="easybuysell" titleName="Kolay Al Sat">
                                  <PrimaryMainCont.SubTitle titleName="Kolay Al Sat" />
                                  <PrimaryMainCont.SubContent>
                                      Content
                                  </PrimaryMainCont.SubContent>
                              </PrimaryMainCont.Sub>
                          </PrimaryMainCont.MainContent>
                      </PrimaryMainCont>
                  </section>
              </Row>
          </Container>
      </section>
  );
};

export default EasyBuySellBody;