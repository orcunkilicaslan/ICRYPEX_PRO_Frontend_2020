import { useSelector } from "react-redux";
import { Row, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

import { ReactComponent as TildeSmIcon } from "~/assets/images/icons/path_icon_tildesm.svg";
import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";
import Table from "~/components/Table.jsx";

const EasyBuySellFormSell = props => {

    const { fiatCurrency, cryptoCurrency } = useSelector(state => state.pair);

    return (
        <div className="easybuysell-cont">
            <Form className="siteformui" autoComplete="off" noValidate>
                <Row className="easybuysell-form-inputs">
                    <FormGroup className="col">
                        <div className="formflexlabel">
                            <Label>MİKTAR {cryptoCurrency}</Label>
                            <div className="labelassets">
                                <p>Kullanılabilir: <span>1.41811575 {cryptoCurrency}</span></p>
                                <Button type="button" className="ml-1">
                                    <IconSet sprite="sprtsmclrd" size="16" name="addbtn" />
                                </Button>
                            </div>
                        </div>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Miktar</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>{cryptoCurrency}</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup className="col-auto">
                        <div className="inputchangeicon">
                            <IconSet sprite="sprtsmclrd" size="16" name="change" />
                        </div>
                    </FormGroup>
                    <FormGroup className="col">
                        <div className="formflexlabel">
                            <Label>MİKTAR {fiatCurrency}</Label>
                            <div className="labelprice">
                                <p>{cryptoCurrency} Fiyat: <TildeSmIcon className="tildesm" /> <span>66,238.89 {fiatCurrency}</span></p>
                            </div>
                        </div>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Miktar</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>{fiatCurrency}</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </Row>
                <div className="easybuysell-form-btns">
                    <Button variant="danger" className="w-50">{cryptoCurrency} SAT</Button>
                </div>
            </Form>
            <div className="easybuysell-confirm">
                <div className="easybuysell-confirm-title">
                    <h4>İŞLEM ONAYI</h4>
                </div>
                <div className="easybuysell-confirm-table">
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th sizeauto className="type">
                                    İşlem Tipi
                                </Table.Th>
                                <Table.Th sizeauto className="symb">
                                    Çift
                                </Table.Th>
                                <Table.Th sizefixed className="amtc">
                                    Miktar <span>TRY</span>
                                </Table.Th>
                                <Table.Th sizefixed className="amts">
                                    Miktar <span>BTC</span>
                                </Table.Th>
                                <Table.Th sizeauto className="comm">
                                    Komisyon
                                </Table.Th>
                                <Table.Th sizefixed className="totl">
                                    Toplam Tutar
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody striped>
                            <Table.Tr>
                                <Table.Td sizeauto className="type">
                                    Stop Limit - <span className="sitecolorred">Satış</span>
                                </Table.Td>
                                <Table.Td sizeauto className="symb">
                                    BTC/TRY
                                </Table.Td>
                                <Table.Td sizefixed className="amtc">
                                    999,999.99 TRY
                                </Table.Td>
                                <Table.Td sizefixed className="amts">
                                    1.48000000 BTC
                                </Table.Td>
                                <Table.Td sizeauto className="comm">
                                    999.99 TRY
                                </Table.Td>
                                <Table.Td sizefixed className="totl">
                                    449.887546 TRY
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </div>
                <div className="easybuysell-confirm-btns">
                    <Button variant="secondary" className="active">İPTAL ET</Button>
                    <Button variant="success">İŞLEMİ ONAYLA</Button>
                </div>
            </div>
            <div className="easybuysell-confirm resultsuccess">
                <div className="easybuysell-confirm-title">
                    <h4>
                        <IconSet sprite="sprtsmclrd" size="16" name="check" />
                        İŞLEMİNİZ BAŞARIYLA GERÇEKLEŞTİ
                    </h4>
                    <p>
                        Bitcoin satış işleminiz başarıyla tamamlanmıştır. <a className="urllink" href="#"><u>İşlem Geçmişi</u></a> ya da <a className="urllink" href="#"><u>Varlıklar</u></a> bölümünden kontrol edebilirsiniz.
                    </p>
                </div>
                <div className="easybuysell-confirm-table">
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th sizeauto className="type">
                                    İşlem Tipi
                                </Table.Th>
                                <Table.Th sizeauto className="symb">
                                    Çift
                                </Table.Th>
                                <Table.Th sizefixed className="amtc">
                                    Miktar <span>TRY</span>
                                </Table.Th>
                                <Table.Th sizefixed className="amts">
                                    Miktar <span>BTC</span>
                                </Table.Th>
                                <Table.Th sizeauto className="comm">
                                    Komisyon
                                </Table.Th>
                                <Table.Th sizefixed className="totl">
                                    Toplam Tutar
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody striped>
                            <Table.Tr>
                                <Table.Td sizeauto className="type">
                                    Stop Limit - <span className="sitecolorred">Satış</span>
                                </Table.Td>
                                <Table.Td sizeauto className="symb">
                                    BTC/TRY
                                </Table.Td>
                                <Table.Td sizefixed className="amtc">
                                    999,999.99 TRY
                                </Table.Td>
                                <Table.Td sizefixed className="amts">
                                    1.48000000 BTC
                                </Table.Td>
                                <Table.Td sizeauto className="comm">
                                    999.99 TRY
                                </Table.Td>
                                <Table.Td sizefixed className="totl">
                                    449.887546 TRY
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default EasyBuySellFormSell;