import {useState, useContext, useEffect, useMemo, Fragment, useRef} from "react";
import {
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Input,
  Label,
  FormText, Tooltip,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";
import { useCurrencies } from "~/state/hooks/";
import { depositCrypto } from "~/state/slices/deposit.slice";
import { cryptoAddressCreate } from "~/state/slices/cryptoaddress.slice";
import { setOpenModal } from "~/state/slices/ui.slice";
import DepositWithdrawalTermsModal from "~/components/modals/DepositWithdrawalTermsModal.jsx";
import { openOrderContext } from "./OpenOrder";
import {QrCodeModal} from "~/components/modals";
import classnames from "classnames";

const OpenOrderDepoWithTabDepositCrypto = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "finance", "common", "login"]);
  const [apiError, setApiError] = useState("");
  const { isDepositingCrypto } = useSelector(state => state.deposit);
  const { groupedCryptoAddresses = {} } = useSelector(state => state.assets);
  const {openModal} = useSelector(state => state.ui);
  const { cryptoCurrencies = [], tokenCurrencies = [] } = useCurrencies();
  const {
    register,
    watch,
    clearErrors,
    errors,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      symbol: cryptoCurrencies?.[0]?.symbol,
      read: false,
    },
  });

  const [read, setRead] = useState({click: false, show: false, new: false, init: true});
  const [tooltipOpen, setTooltipOpen] = useState({selectedAddress:false});
  const { lang: currentLanguage } = useSelector(state => state.ui);
  const selectedAddressRef = useRef(null);
  const [visibleCurrencies, visibleSymbols] = useMemo(() => {
    const currencies = cryptoCurrencies.concat(tokenCurrencies);
    const symbols = currencies.map(({ symbol }) => symbol);

    return [currencies, symbols];
  }, [cryptoCurrencies, tokenCurrencies]);

  const btnClass  = classnames({ 'disabled': read.click === false,'w-100': true });

  const { state: orderContext } = useContext(openOrderContext);

  const { symbol: watchedSymbol } = watch();

  const {selectedAddress:selectedAddress} = useMemo(
      () => {
        const selectedAddress = groupedCryptoAddresses[watchedSymbol]

        if(read.init) {
          if(selectedAddress && selectedAddress[0].address) {
            setRead({ click: false, show: true, new: false, init: false})
          }
          else {
            setRead({click: false, show: false, new: true, init: false})
          }
        }else {

        }

        return {selectedAddress}
      },
      [watchedSymbol]
  );

  const showForm = async () => {
    if (read.click) {
      setRead({click: true, show: false, new: false, init: false})
      const currencyid = visibleCurrencies.find(
          ({symbol}) => symbol === watchedSymbol
      )?.id;

      if (currencyid) {
        setApiError("");
        const {payload} = await dispatch(
            depositCrypto({currencyid, read: JSON.stringify(read)})
        );

        if (!payload?.status) {
          setApiError(payload?.errormessage);
        } else {
          clearErrors();
          setApiError("");
          console.log(read)
          setRead({...read,show: !read.show})}
        }
      }
    }

    useEffect(() => {
      const {symbol, mode} = orderContext;

      if (mode === "deposit" && symbol && visibleSymbols.includes(symbol)) {
        setValue("symbol", symbol);
      }
    }, [orderContext, setValue, visibleSymbols]);


    const openTermsModal = () => {
      dispatch(setOpenModal("depositwithdrawalterms"));
    };

    const openQrCodeModal = () => {
      dispatch(setOpenModal("qrcode"));
    };

    const clearOpenModals = () => {
      dispatch(setOpenModal("none"));
    };

    const sendTicket = async () => {
      const currencyid = visibleCurrencies.find(
          ({symbol}) => symbol === watchedSymbol
      )?.id;

      const {payload} = await dispatch(cryptoAddressCreate({currencyid: currencyid}))
      console.log(currencyid)
      console.log(payload)
    }

    const copyToClipboard = ref => async () => {

      switch (ref) {
        case "selectedAddressRef":
          return navigator.clipboard.writeText(selectedAddressRef.current.innerText).then(r => {
            setTooltipOpen({...tooltipOpen, selectedAddress: true})
            setTimeout(async () => await setTooltipOpen({...tooltipOpen, selectedAddress: false}), 2000)
          });
        default:
          return ""
      }
    };


    return (
        <Fragment>
          {read.show ? (
              <div className="dandwinforesult resultbox">
                <div className="modal-content text-center">
                  <div className="modal-body modal-confirm">
                    <IconSet sprite="sprtlgclrd" size="50clrd" name="warning"/>
                    <h6>{t("finance:depositWithCryptocurrency")}</h6>
                    <p>İşleminize devam edebilmek için lütfen <a className="urllink"><u onClick={() => {
                      openTermsModal()
                    }}>Kural ve Şartları</u></a> dikkatle okuyup onaylayınız.</p>
                    <div className="contcheckbox">
                      <div className="custom-control custom-checkbox">
                        <Input
                            className="custom-control-input"
                            id="depositTabCryptoIhaveRead"
                            type="checkbox"
                            onClick={() => setRead && setRead({...read, click: !read.click})}
                        />
                        <Label
                            className="custom-control-label"
                            htmlFor="depositTabCryptoIhaveRead"
                        >
                          {t("login:readAndAgreeCapital")}
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <Button variant="primary" className={btnClass} onClick={() => showForm()}>
                      {t("finance:createATicket")}
                    </Button>
                  </div>
                </div>
              </div>
          ) : (
              <div className="dandwtab-crypto">
                <div className="dandwtab-form">
                  <Form
                      className="depositcryptoform siteformui"
                      autoComplete="off"
                      noValidate
                  >
                    <div className="formfieldset">
                      <Row form>
                        <FormGroup className="col-auto">
                          <Input
                              className="custom-select"
                              type="select"
                              name="symbol"
                              innerRef={register}
                          >
                            {visibleCurrencies.map(({symbol}) => {
                              return (
                                  <option key={symbol} value={symbol}>
                                    {symbol}
                                  </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                        <InputGroup className="form-group col">
                          <div className="form-control textoverflowellipsis text-right" ref={selectedAddressRef}>
                            {selectedAddress && selectedAddress[0].address || null}
                          </div>
                          <InputGroupAddon addonType="append">
                            <Button variant="secondary" className="active"
                                    onClick={copyToClipboard('selectedAddressRef')} id="selectedAddress">
                              <IconSet sprite="sprtsmclrd" size="16" name="copybtn"/>
                            </Button>
                            <Tooltip placement="right" isOpen={tooltipOpen.selectedAddress} target="selectedAddress">
                              {t("common:copied")}
                            </Tooltip>
                            <Button variant="secondary" className="active">
                              <IconSet sprite="sprtsmclrd" size="16" name="qrcode" onClick={() => {
                                openQrCodeModal()
                              }}/>
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </Row>
                      <p className="sitecolorred">
                        {t("finance:depositCryptoWarning", { watchedSymbol: watchedSymbol })}
                      </p>
                    </div>
                    {read.new ? (
                        <div className="formbttm">
                          <Button
                              type="button"
                              variant="secondary"
                              className="active"
                              onClick={() => sendTicket()}
                          >
                            {t("finance:watchedSymbolCreateAKey")}
                          </Button>
                        </div>
                    ) : (<div>
                          <div className="confirmcheckbox">
                            {errors.read && (
                                <FormText className="inputresult resulterror">
                                  {errors.read?.message}
                                </FormText>
                            )}
                          </div>
                          <div className="formbttm">
                            {apiError && (
                                <span style={{color: "red", fontSize: "1rem"}}>{apiError}</span>
                            )}
                          </div>
                          <div className="bttminfolist">
                            {currentLanguage === "en" ?
                                (
                                    <ul>
                                      <li>
                                        Be sure to check that the address you copied is correct
                                        in the area you pasted.
                                      </li>
                                      <li>The amount you send will be automatically credited to your account.</li>
                                    </ul>
                                ): (
                                    <ul>
                                      <li>
                                        Kopyaladığınız adresin yapıştırdığınız alanda doğruluğunu mutlaka
                                        kontrol ediniz.
                                      </li>
                                      <li>Gönderdiğiniz tutar otomatik olarak hesabınıza geçecektir.</li>
                                    </ul>
                                )}
                          </div>
                        </div>
                    )}
                  </Form>
                  <DepositWithdrawalTermsModal
                      isOpen={openModal === "depositwithdrawalterms"}
                      clearModals={clearOpenModals}
                  />
                  <QrCodeModal
                      isOpen={openModal === "qrcode"}
                      value={selectedAddress && selectedAddress[0].address || null}
                      clearModals={clearOpenModals}
                  />

                </div>
              </div>
          )}
        </Fragment>
    );
  };

export default OpenOrderDepoWithTabDepositCrypto;
