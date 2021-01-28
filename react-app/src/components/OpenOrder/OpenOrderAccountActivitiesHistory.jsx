import { useState } from "react";
import { Col, Input, Row } from "reactstrap";
import { Button } from "../Button.jsx";
import Table from "../Table.jsx";
import classnames from "classnames";

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

  const [selected1, setSelected1] = useState("");
  const [selected2, setSelected2] = useState("");
  const [selected3, setSelected3] = useState("");
  const [selected4, setSelected4] = useState("");

  return (
      <div className="activities-history">
        <Row className="tabcont tabcont-filterbar siteformui">
          <Col>
            <Input
                className="custom-select custom-select-sm"
                type="select"
                value={selected1}
                onChange={({ target }) => {
                  setSelected1(target.value);
                }}
            >
              {["İşlem Tipi", "Stop Limit", "Market", "Limit"].map((el, idx) => {
                return <option disabled={idx === 0} key={`${el}_${idx}`}>{el}</option>;
              })}
            </Input>
          </Col>
          <Col>
            <Input
                className="custom-select custom-select-sm"
                type="select"
                value={selected2}
                onChange={({ target }) => {
                  setSelected2(target.value);
                }}
            >
              {["Yöntem", "Havale-EFT", "Papara", "Kripto"].map((el, idx) => {
                return <option disabled={idx === 0} key={`${el}_${idx}`}>{el}</option>;
              })}
            </Input>
          </Col>
          <Col>
            <Input
                className="custom-select custom-select-sm"
                type="select"
                value={selected3}
                onChange={({ target }) => {
                  setSelected3(target.value);
                }}
            >
              {["Durum", "Gerçekleşti", "Beklemede"].map((el, idx) => {
                return <option selected={idx === 0} disabled={idx === 0} key={`${el}_${idx}`}>{el}</option>;
              })}
            </Input>
          </Col>
          <Col>
            <Input
                className="custom-select custom-select-sm"
                type="select"
                value={selected4}
                onChange={({ target }) => {
                  setSelected4(target.value);
                }}
            >
              {["Para Birimi", "TRY", "USD"].map((el, idx) => {
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
                type="text"
                bsSize="sm"
                placeholder="Başlangıç - Bitiş Tarihi"
            />
          </Col>
          <Col xs="auto">
            <Button type="button" size="sm" variant="outline-primary">
              Filitrele
            </Button>
          </Col>
          <Col xs="auto">
            <Button type="button" size="sm" variant="outline-danger">
              Sıfırla
            </Button>
          </Col>
        </Row>
        <div className="activitieshistorytable scrollbar">
          <Table scrollbar>
            <Table.Thead scrollbar>
              <Table.Tr>
                <Table.Th sizeauto className="nmbr">İşlem No</Table.Th>
                <Table.Th sizeauto className="date">Tarih</Table.Th>
                <Table.Th sizeauto className="type">İşlem Tipi</Table.Th>
                <Table.Th sizeauto className="mthd">Yöntem</Table.Th>
                <Table.Th sizeauto className="bank">Banka</Table.Th>
                <Table.Th sizefixed className="amnt">Miktar</Table.Th>
                <Table.Th sizeauto className="txid">Referans Kodu / TX ID</Table.Th>
                <Table.Th sizeauto className="stts">Durum</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody striped hovered scrollbar>
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
                     transactionstatustxt
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
