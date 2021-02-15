import { useState } from "react";
import { Col, Input, Row } from "reactstrap";
import { format } from "date-fns";
import { useClientRect } from "~/state/hooks";
import classnames from "classnames";

import { Button } from "../Button.jsx";
import Table from "../Table.jsx";

const activityTypes = ["İşlem Tipi", "Stop Limit", "Market", "Limit"];
const paymentMethods = ["Yöntem", "Havale-EFT", "Papara", "Kripto"];
const activityStates = ["Durum", "Gerçekleşti", "Beklemede"];
const activityCurrencies = ["Para Birimi", "TRY", "USD"];
const historytable = [
  {
    transactionno: "MR-99999",
    transactiondate: "21.02.2020",
    transactiontime: "18:23",
    transactiontypeid: "2",
    transactiontypetxt: "Çekme",
    transactionmethod: "Havale-EFT",
    transactionbank: "Vakıfbank",
    transactionamount: "23,456,865.56 TRY",
    transactionstatusid: "2",
    transactiontxid: "-",
    transactionstatustxt: "İptal Edildi",
  },
];

const OpenOrderAccountActivitiesHistory = props => {

  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();

  const today = format(new Date(), "yyyy-MM-dd");
  const [activityType, setActivityType] = useState(activityTypes[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [activityState, setActivityState] = useState(activityStates[0]);
  const [activityCurrency, setActivityCurrency] = useState(
    activityCurrencies[0]
  );
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <div className="activities-history">
      <Row className="tabcont tabcont-filterbar siteformui">
        <Col>
          <Input
            className="custom-select custom-select-sm"
            type="select"
            value={activityType}
            onChange={({ target }) => {
              setActivityType(target.value);
            }}
          >
            {activityTypes.map((el, idx) => {
              return (
                <option disabled={idx === 0} key={`${el}_${idx}`}>
                  {el}
                </option>
              );
            })}
          </Input>
        </Col>
        <Col>
          <Input
            className="custom-select custom-select-sm"
            type="select"
            value={paymentMethod}
            onChange={({ target }) => {
              setPaymentMethod(target.value);
            }}
          >
            {paymentMethods.map((el, idx) => {
              return (
                <option disabled={idx === 0} key={`${el}_${idx}`}>
                  {el}
                </option>
              );
            })}
          </Input>
        </Col>
        <Col>
          <Input
            className="custom-select custom-select-sm"
            type="select"
            value={activityState}
            onChange={({ target }) => {
              setActivityState(target.value);
            }}
          >
            {activityStates.map((el, idx) => {
              return (
                <option disabled={idx === 0} key={`${el}_${idx}`}>
                  {el}
                </option>
              );
            })}
          </Input>
        </Col>
        <Col>
          <Input
            className="custom-select custom-select-sm"
            type="select"
            value={activityCurrency}
            onChange={({ target }) => {
              setActivityCurrency(target.value);
            }}
          >
            {activityCurrencies.map((el, idx) => {
              return (
                <option disabled={idx === 0} key={`${el}_${idx}`}>
                  {el}
                </option>
              );
            })}
          </Input>
        </Col>
        <Col xs="auto">
          <Input
            type="date"
            bsSize="sm"
            value={selectedDate}
            onChange={({ target }) => setSelectedDate(target.value)}
            placeholder="Başlangıç - Bitiş Tarihi"
          />
        </Col>
        <Col xs="auto">
          <Button type="button" size="sm" variant="outline-primary">
            Filtrele
          </Button>
        </Col>
        <Col xs="auto">
          <Button type="button" size="sm" variant="outline-danger">
            Sıfırla
          </Button>
        </Col>
      </Row>
      <div className="activitieshistorytable scrollbar" ref={tableCanvasRef}>
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="nmbr">
                İşlem No
              </Table.Th>
              <Table.Th sizeauto className="date">
                Tarih
              </Table.Th>
              <Table.Th sizeauto className="type">
                İşlem Tipi
              </Table.Th>
              <Table.Th sizeauto className="mthd">
                Yöntem
              </Table.Th>
              <Table.Th sizeauto className="bank">
                Banka
              </Table.Th>
              <Table.Th sizefixed className="amnt">
                Miktar
              </Table.Th>
              <Table.Th sizeauto className="txid">
                Referans Kodu / TX ID
              </Table.Th>
              <Table.Th sizeauto className="stts">
                Durum
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody
              striped
              hovered
              scrollbar
              scrollbarstyles={{ height: `${tableHeight - 36}px` }}
          >
            {historytable.map(
              ({
                transactionno,
                transactiondate,
                transactiontime,
                transactiontypeid,
                transactiontypetxt,
                transactionmethod,
                transactionbank,
                transactionamount,
                transactionstatusid,
                transactiontxid,
                transactionstatustxt,
              }) => {
                const typecls = classnames({
                  sitecolorgreen: transactiontypeid === "1",
                  sitecolorred: transactiontypeid === "2",
                });

                const statuscls = classnames({
                  sitecolorgreen: transactionstatusid === "1",
                  sitecolorred: transactionstatusid === "2",
                });

                return (
                  <Table.Tr key={transactionno}>
                    <Table.Td sizeauto className="nmbr">
                      {transactionno}
                    </Table.Td>
                    <Table.Td sizeauto className="date">
                      {transactiondate} - {transactiontime}
                    </Table.Td>
                    <Table.Td sizeauto className="type">
                      <span className={typecls}>{transactiontypetxt}</span>
                    </Table.Td>
                    <Table.Td sizeauto className="mthd">
                      {transactionmethod}
                    </Table.Td>
                    <Table.Td sizeauto className="bank">
                      {transactionbank}
                    </Table.Td>
                    <Table.Td sizefixed className="amnt">
                      {transactionamount}
                    </Table.Td>
                    <Table.Td sizeauto className="txid">
                      {transactiontxid}
                    </Table.Td>
                    <Table.Td sizeauto className="stts">
                      <span className={statuscls}>{transactionstatustxt}</span>
                    </Table.Td>
                  </Table.Tr>
                );
              }
            )}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default OpenOrderAccountActivitiesHistory;
