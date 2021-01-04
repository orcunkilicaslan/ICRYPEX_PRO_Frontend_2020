import { Row, Col, Label, Input, ButtonGroup } from "reactstrap";
import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import {Tab} from "bootstrap/js/src";

const historytable = [

    {
        id          : "01",
        idnmbr      : "MR-99999",
        date        : "21.02.2020",
        time        : "18:23",
        pair        : "BTC/TRY",
        typetext    : "Stop Limit",
        typeresult1 : "1",
        typeresult2 : "Alış",
        average     : "22,430 TRY",
        price       : "22,430 TRY",
        transaction : "1,43004833 BTC",
        amount      : "1,43004833 BTC",
        total       : "50.98588353 TRY",
        commission  : "10.98 TRY",
        statustype  : "1",
        statustext  : "Onaylandı"
    },
    {
        id          : "02",
        idnmbr      : "MR-99999",
        date        : "21.02.2020",
        time        : "18:23",
        pair        : "BTC/ETH",
        typetext    : "Market Limit",
        typeresult1 : "1",
        typeresult2 : "Alış",
        average     : "35,120 TRY",
        price       : "35,120 TRY",
        transaction : "1,47050968 BTC",
        amount      : "1,47050968 BTC",
        total       : "43,99958890 TRY",
        commission  : "9.99 TRY",
        statustype  : "1",
        statustext  : "Onaylandı"
    },
    {
        id          : "03",
        idnmbr      : "MR-99999",
        date        : "21.02.2020",
        time        : "18:23",
        pair        : "BTC/EOS",
        typetext    : "Stop Limit",
        typeresult1 : "0",
        typeresult2 : "Satış",
        average     : "3.469 TRY",
        price       : "3.469 TRY",
        transaction : "1,28947736 BTC",
        amount      : "1,28947736 BTC",
        total       : "23,74630933 TRY",
        commission  : "3,74 TRY",
        statustype  : "1",
        statustext  : "Onaylandı"
    },
    {
        id          : "04",
        idnmbr      : "MR-99999",
        date        : "21.02.2020",
        time        : "18:23",
        pair        : "BTC/XRP",
        typetext    : "Market Limit",
        typeresult1 : "1",
        typeresult2 : "Satış",
        average     : "41,956 TRY",
        price       : "41,956 TRY",
        transaction : "1,29846500 BTC",
        amount      : "1,29846500 BTC",
        total       : "65,84947640 TRY",
        commission  : "5,84 TRY",
        statustype  : "1",
        statustext  : "Onaylandı"
    },
    {
        id          : "05",
        idnmbr      : "MR-99999",
        date        : "21.02.2020",
        time        : "18:23",
        pair        : "BTC/XRP",
        typetext    : "Market Limit",
        typeresult1 : "1",
        typeresult2 : "Alış",
        average     : "1.029 TRY",
        price       : "1.029 TRY",
        transaction : "1,75893923 BTC",
        amount      : "1,75893923 BTC",
        total       : "76,74638908 TRY",
        commission  : "7,74 TRY",
        statustype  : "1",
        statustext  : "Onaylandı"
    },

];

const OpenOrderTransactionHistory = props => {
    return (
        <div className="openorders-history">
            <Row className="tabcont tabcont-filterbar siteformui">
                <Col>
                    <Input className="custom-select custom-select-sm" type="select">
                        {["Çift", "...", "..."].map((el, idx) => {
                            return <option key={`${el}_${idx}`}>{el}</option>
                        })}
                    </Input>
                </Col>
                <Col>
                    <Input className="custom-select custom-select-sm" type="select">
                        <option selected disabled>İşlem Tipi</option>
                        {["Stop Limit", "Market", "Limit"].map((el, idx) => {
                            return <option key={`${el}_${idx}`}>{el}</option>
                        })}
                    </Input>
                </Col>
                <Col>
                    <Input className="custom-select custom-select-sm" type="select">
                        <option selected disabled>Durum</option>
                        {["Gerçekleşti", "Beklemede"].map((el, idx) => {
                            return <option key={`${el}_${idx}`}>{el}</option>
                        })}
                    </Input>
                </Col>
                <Col>
                    <ButtonGroup size="sm" className="w-100">
                        <Button
                            type="button"
                            size="sm"
                            variant="secondary active"
                        >
                            1G
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                        >
                            1H
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                        >
                            1A
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                        >
                            3A
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col xs="auto">
                    <Input type="text" bsSize="sm" placeholder="Başlangıç - Bitiş Tarihi" />
                </Col>
                <Col xs="auto">
                    <div className="custom-control custom-checkbox">
                        <Input className="custom-control-input" type="checkbox" id="ordersHideOtherPairs" defaultChecked />
                        <Label className="custom-control-label" htmlFor="ordersHideOtherPairs" check>Diğer Çiftleri Gizle</Label>
                    </div>
                </Col>
            </Row>
            <div className="ootransactionhistorytable scrollbar">
                <Table scrollbar>
                    <Table.Thead scrollbar>
                        <Table.Tr>
                            <Table.Th sizeauto className="brws"></Table.Th>
                            <Table.Th sizeauto className="nmbr">İşlem No</Table.Th>
                            <Table.Th sizeauto className="date">Tarih</Table.Th>
                            <Table.Th sizeauto className="symb">Çift</Table.Th>
                            <Table.Th sizeauto className="type">İşlem Tipi</Table.Th>
                            <Table.Th sizefixed className="avrg">Ortalama</Table.Th>
                            <Table.Th sizefixed className="pric">Fiyat</Table.Th>
                            <Table.Th sizefixed className="hppn">Gerçekleşen</Table.Th>
                            <Table.Th sizefixed className="amnt">Miktar</Table.Th>
                            <Table.Th sizefixed className="totl">Toplam</Table.Th>
                            <Table.Th sizeauto className="comm">Komisyon</Table.Th>
                            <Table.Th sizeauto className="stts">Durum</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody striped hovered scrollbar>

                        {historytable.map(({
                                               id,
                                               idnmbr,
                                               date,
                                               time,
                                               pair,
                                               typetext,
                                               typeresult1,
                                               typeresult2,
                                               average,
                                               price,
                                               transaction,
                                               amount,
                                               total,
                                               commission,
                                               statustype,
                                               statustext
                        }) => {
                            return (
                                <div className="hsttblbrwswrp" key={id}>
                                    <div className="hsttblbrwstr">
                                        <Table.Tr>
                                            <Table.Td sizeauto className="brws">
                                                <a href="#" title="İşlemi İnceleyin">
                                                    <IconSet
                                                        sprite="sprtsmclrd"
                                                        size="14"
                                                        name="browse"
                                                    />
                                                </a>
                                            </Table.Td>
                                            <Table.Td sizeauto className="nmbr">
                                                {idnmbr}
                                            </Table.Td>
                                            <Table.Td sizeauto className="date">
                                                {date} - {time}
                                            </Table.Td>
                                            <Table.Td sizeauto className="symb">
                                                {pair}
                                            </Table.Td>
                                            <Table.Td sizeauto className="type">
                                                {typetext} - <span className={ typeresult1 === "1" ? "sitecolorgreen" : "sitecolorred" }>{typeresult2}</span>
                                            </Table.Td>
                                            <Table.Td sizefixed className="avrg">
                                                {average}
                                            </Table.Td>
                                            <Table.Td sizefixed className="pric">
                                                {price}
                                            </Table.Td>
                                            <Table.Td sizefixed className="hppn">
                                                {transaction}
                                            </Table.Td>
                                            <Table.Td sizefixed className="amnt">
                                                {amount}
                                            </Table.Td>
                                            <Table.Td sizefixed className="totl">
                                                {total}
                                            </Table.Td>
                                            <Table.Td sizeauto className="comm">
                                                {commission}
                                            </Table.Td>
                                            <Table.Td sizeauto className="stts">
                                                <span className={ statustype === "1" ? "sitecolorgreen" : "sitecolorred" }>{statustext}</span>
                                            </Table.Td>
                                        </Table.Tr>
                                    </div>
                                    <div className="hsttblbrwstbl">
                                        <Table>
                                            <Table.Thead>
                                                <Table.Tr>
                                                    <Table.Th sizeauto className="date">Tarih</Table.Th>
                                                    <Table.Th sizefixed className="hppr">Gerçekleşen Fiyat</Table.Th>
                                                    <Table.Th sizefixed className="hppn">Gerçekleşen</Table.Th>
                                                    <Table.Th sizeauto className="comm">Komisyon</Table.Th>
                                                    <Table.Th sizefixed className="totl">Toplam</Table.Th>
                                                </Table.Tr>
                                            </Table.Thead>
                                            <Table.Tbody>
                                                <Table.Tr>
                                                    <Table.Td sizeauto className="date">21.02.2020 18:23</Table.Td>
                                                    <Table.Td sizefixed className="hppr">33,650 TRY</Table.Td>
                                                    <Table.Td sizefixed className="hppn">0,763282734 BTC</Table.Td>
                                                    <Table.Td sizeauto className="comm">45 TRY</Table.Td>
                                                    <Table.Td sizefixed className="totl">24,564 TRY</Table.Td>
                                                </Table.Tr>
                                            </Table.Tbody>
                                        </Table>
                                    </div>
                                </div>
                            );
                        })}

                    </Table.Tbody>
                </Table>
            </div>
        </div>
    );
};

export default OpenOrderTransactionHistory;