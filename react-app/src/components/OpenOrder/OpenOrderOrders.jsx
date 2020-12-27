import { Row, Col, Label, Input, ButtonGroup } from "reactstrap";
import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";

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
                            <div className="tbl-tr">
                                <div className="tbl-td aut symb">BTC/TRY</div>
                                <div className="tbl-td aut date">10.06.2020-21:54:57</div>
                                <div className="tbl-td fxd type">Stop Limit - <span className="sitecolorgreen">Alış</span></div>
                                <div className="tbl-td fxd pric">32464.25 TRY</div>
                                <div className="tbl-td fxd amnt">22,430.124 TRY</div>
                                <div className="tbl-td fxd hppn">1,43004833 BTC</div>
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
                            <div className="tbl-tr">
                                <div className="tbl-td aut symb">ETH/TRY</div>
                                <div className="tbl-td aut date">08.06.2020-18:23:12</div>
                                <div className="tbl-td fxd type">Market - <span className="sitecolorgreen">Alış</span>
                                </div>
                                <div className="tbl-td fxd pric">45.505931 TRY</div>
                                <div className="tbl-td fxd amnt">35,120.985 TRY</div>
                                <div className="tbl-td fxd hppn">2.3000000 BTC</div>
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
                            <div className="tbl-tr">
                                <div className="tbl-td aut symb">MPAY/TRY</div>
                                <div className="tbl-td aut date">02.06.2020-12:45:52</div>
                                <div className="tbl-td fxd type">Limit - <span className="sitecolorred">Satış</span>
                                </div>
                                <div className="tbl-td fxd pric">27.87390 TRY</div>
                                <div className="tbl-td fxd amnt">27.87390 TRY</div>
                                <div className="tbl-td fxd hppn">0.8000000 BTC</div>
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
                            <div className="tbl-tr">
                                <div className="tbl-td aut symb">BAB/USD</div>
                                <div className="tbl-td aut date">29.05.2020-13:21:19</div>
                                <div className="tbl-td fxd type">Market - <span className="sitecolorred">Satış</span>
                                </div>
                                <div className="tbl-td fxd pric">12.4647833 TRY</div>
                                <div className="tbl-td fxd amnt">12.4647833 TRY</div>
                                <div className="tbl-td fxd hppn">1.70000000 BTC</div>
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
                            <div className="tbl-tr">
                                <div className="tbl-td aut symb">XRP/USDT</div>
                                <div className="tbl-td aut date">18.05.2020-10:18:43</div>
                                <div className="tbl-td fxd type">Market - <span className="sitecolorgreen">Alış</span>
                                </div>
                                <div className="tbl-td fxd pric">23.4938 TRY</div>
                                <div className="tbl-td fxd amnt">23.4938 TRY</div>
                                <div className="tbl-td fxd hppn">6.45000000 BTC</div>
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
                            <div className="tbl-tr">
                                <div className="tbl-td aut symb">NEO/TRY</div>
                                <div className="tbl-td aut date">02.05.2020-12:23:20</div>
                                <div className="tbl-td fxd type">Limit - <span className="sitecolorred">Satış</span>
                                </div>
                                <div className="tbl-td fxd pric">13.99032 TRY</div>
                                <div className="tbl-td fxd amnt">13.99032 TRY</div>
                                <div className="tbl-td fxd hppn">0.45000000 BTC</div>
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
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default OpenOrderOrders;