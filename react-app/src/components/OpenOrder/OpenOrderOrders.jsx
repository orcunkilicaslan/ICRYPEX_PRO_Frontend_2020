import { Row, Col, Label, Input, ButtonGroup } from "reactstrap";
import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";

const orderstable = [

    {
        id          : "01",
        pair        : "BTC/TRY",
        date        : "10.06.2020",
        time        : "21:54:57",
        typetext    : "Stop Limit",
        typeresult1 : "1",
        typeresult2 : "Alış",
        price       : "32464.25 TRY",
        amount      : "22,430.124 TRY",
        transaction : "1,43004833 BTC"
    },
    {
        id          : "02",
        pair        : "ETH/TRY",
        date        : "08.06.2020",
        time        : "18:23:12",
        typetext    : "Market",
        typeresult1 : "1",
        typeresult2 : "Alış",
        price       : "45.505931 TRY",
        amount      : "35,120.985 TRY",
        transaction : "2.3000000 BTC"
    },
    {
        id          : "03",
        pair        : "MPAY/TRY",
        date        : "02.06.2020",
        time        : "12:45:52",
        typetext    : "Limit",
        typeresult1 : "0",
        typeresult2 : "Satış",
        price       : "27.87390 TRY",
        amount      : "27.87390 TRY",
        transaction : "0.8000000 BTC"
    },
    {
        id          : "04",
        pair        : "BAB/USD",
        date        : "29.05.2020",
        time        : "13:21:19",
        typetext    : "Market",
        typeresult1 : "0",
        typeresult2 : "Satış",
        price       : "12.4647833 TRY",
        amount      : "12.4647833 TRY",
        transaction : "1.70000000 BTC"
    },
    {
        id          : "05",
        pair        : "XRP/USDT",
        date        : "18.05.2020",
        time        : "10:18:43",
        typetext    : "Market",
        typeresult1 : "1",
        typeresult2 : "Alış",
        price       : "23.4938 TRY",
        amount      : "23.4938 TRY",
        transaction : "6.45000000 BTC"
    }

];

const OpenOrderOrders = props => {
    return (
        <div className="openorders-orders">

            <Row className="tabcont tabcont-filterbar siteformui">
                <Col xs="auto">
                    <Input className="custom-select custom-select-sm" type="select">
                        <option>Çift</option>
                        <option>...</option>
                        <option>...</option>
                    </Input>
                </Col>
                <Col xs="auto">
                    <Input className="custom-select custom-select-sm" type="select">
                        <option selected disabled>İşlem Tipi</option>
                        <option>Stop Limit</option>
                        <option>Market</option>
                        <option>Limit</option>
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
            <div className="ooopenorderstable scrollbar">
                <div className="sitetablediv scrollbar-tbl">
                    <div className="scrollbar-tbl-th">
                        <div className="tbl-thead">
                            <div className="tbl-tr">
                                <div className="tbl-th aut symb">Çift</div>
                                <div className="tbl-th aut date">Tarih</div>
                                <div className="tbl-th fxd type">İşlem Tipi</div>
                                <div className="tbl-th fxd pric">Fiyat</div>
                                <div className="tbl-th fxd amnt">Miktar</div>
                                <div className="tbl-th fxd hppn">Gerçekleşen</div>
                                <div className="tbl-th aut bttn"></div>
                            </div>
                        </div>
                    </div>
                    <div className="scrollbar-tbl-tb">
                        <div className="tbl-tbody tbl-striped tbl-hovered">

                            {orderstable.map(({ id, pair, date, time, typetext, typeresult1, typeresult2, price,amount, transaction }) => {
                                return (
                                    <div className="tbl-tr" key={id}>
                                        <div className="tbl-td aut symb">{pair}</div>
                                        <div className="tbl-td aut date">{date} - {time}</div>
                                        <div className="tbl-td fxd type">{typetext} - <span className={ typeresult1 === "1" ? "sitecolorgreen" : "sitecolorred" }>{typeresult2}</span></div>
                                        <div className="tbl-td fxd pric">{price}</div>
                                        <div className="tbl-td fxd amnt">{amount}</div>
                                        <div className="tbl-td fxd hppn">{transaction}</div>
                                        <div className="tbl-td aut bttn">
                                            <Button type="button">
                                                <IconSet
                                                    sprite="sprtsmclrd"
                                                    size="14"
                                                    name="edit"
                                                />
                                            </Button>
                                            <Button type="button">
                                                <IconSet
                                                    sprite="sprtsmclrd"
                                                    size="14"
                                                    name="delete"
                                                    data-toggle="modal"
                                                    data-target="#ooModalDeleteOrder"
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default OpenOrderOrders;