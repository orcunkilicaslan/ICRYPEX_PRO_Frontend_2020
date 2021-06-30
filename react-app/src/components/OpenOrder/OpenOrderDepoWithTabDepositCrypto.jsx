import {
  useState,
  useContext,
  useEffect,
  useMemo,
  Fragment,
  useRef,
} from "react";
import {
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Input,
  Label,
  Tooltip,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
import ms from "ms";

import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";
import { useCurrencies, useLocaleUpperCase } from "~/state/hooks/";
import { addSeenSymbol } from "~/state/slices/deposit.slice";
import { cryptoAddressCreate } from "~/state/slices/cryptoaddress.slice";
import { setOpenModal } from "~/state/slices/ui.slice";
import { openOrderContext } from "./OpenOrder";
import {
  QrCodeModal,
  DepositWithdrawalTermsModal,
  ResultSweetModal,
} from "~/components/modals";

const OpenOrderDepoWithTabDepositCrypto = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation([
    "form",
    "finance",
    "common",
    "login",
    "openorder",
  ]);
  const toUpperCase = useLocaleUpperCase();
  const { seenSymbols } = useSelector(state => state.deposit);
  const { groupedCryptoAddresses = {} } = useSelector(state => state.assets);
  const { openModal } = useSelector(state => state.ui);
  const { cryptoCurrencies = [], tokenCurrencies = [] } = useCurrencies();
  const { register, watch, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      symbol: cryptoCurrencies?.[0]?.symbol,
    },
  });
  const { state: orderContext } = useContext(openOrderContext);
  const { symbol: watchedSymbol } = watch();

  const [read, setRead] = useState({ click: false, show: false });
  const [tooltipOpen, setTooltipOpen] = useState({ selectedAddress: false });
  const [isSuccess, setIsSuccess] = useState(false);
  const { lang: currentLanguage } = useSelector(state => state.ui);
  const selectedAddressRef = useRef(null);
  const [visibleCurrencies, visibleSymbols] = useMemo(() => {
    const currencies = cryptoCurrencies.concat(tokenCurrencies);
    const symbols = currencies.map(({ symbol }) => symbol);

    return [currencies, symbols];
  }, [cryptoCurrencies, tokenCurrencies]);

  const btnClass = classnames({
    disabled: read.click === false,
    "w-100": true,
  });

  const { selectedAddress } = useMemo(() => {
    const selectedAddress = groupedCryptoAddresses[watchedSymbol];

    if (read.init) {
      if (selectedAddress?.[0]?.address) {
        setRead({ click: false, show: true });
      } else {
        setRead({ click: false, show: false });
      }
    } else {
    }

    return { selectedAddress };
  }, [watchedSymbol]);

  useEffect(() => {
    if (watchedSymbol && !seenSymbols.includes(watchedSymbol)) {
      dispatch(addSeenSymbol(watchedSymbol));
      setRead({ click: false, show: false });
    }
  }, [dispatch, watchedSymbol]);

  useEffect(() => {
    if (read.show) {
      const mostRecent = seenSymbols?.[seenSymbols.length - 1];
      setValue("symbol", mostRecent);
    }
  }, [read, seenSymbols]);

  const showForm = () => {
    if (read.click) {
      setRead({ ...read, show: !read.show });
    }
  };

  useEffect(() => {
    const { symbol, mode } = orderContext;

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

  const openResultModal = () => {
    dispatch(setOpenModal("resultsweetmodal"));
  };

  const onCreateAddress = async currencyid => {
    const { payload } = await dispatch(cryptoAddressCreate({ currencyid }));

    if (payload.status) setIsSuccess(true);
    else setIsSuccess(false);

    openResultModal();
  };

  const copyToClipboard = ref => async () => {
    const text = ref?.current?.innerText;

    if (!text) return;

    return navigator.clipboard.writeText(text).then(r => {
      setTooltipOpen({ ...tooltipOpen, selectedAddress: true });
      setTimeout(
        () =>
          setTooltipOpen({
            ...tooltipOpen,
            selectedAddress: false,
          }),
        ms("2s")
      );
    });
  };

  return (
    <Fragment>
      {!read.show ? (
        <div className="dandwinforesult resultbox">
          <div className="modal-content text-center">
            <div className="modal-body modal-confirm">
              <IconSet sprite="sprtlgclrd" size="50clrd" name="warning" />
              <h6>{t("finance:depositWithCryptocurrency")}</h6>
              <p>
                {`${t("finance:rulesNotice1")} `}
                <span className="urllink">
                  <u onClick={() => openTermsModal()}>
                    {t("finance:rulesNotice2")}
                  </u>
                </span>
                {` ${t("finance:rulesNotice3")}`}
              </p>
              <div className="contcheckbox">
                <div className="custom-control custom-checkbox">
                  <Input
                    className="custom-control-input"
                    id="depositTabCryptoIhaveRead"
                    type="checkbox"
                    onClick={() =>
                      setRead && setRead({ ...read, click: !read.click })
                    }
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
              <Button
                variant="primary"
                className={btnClass}
                onClick={() => showForm()}
              >
                {t("common:continue")}
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
                      {visibleCurrencies.map(({ symbol }) => {
                        return (
                          <option key={symbol} value={symbol}>
                            {symbol}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                  <InputGroup className="form-group col">
                    <div
                      className="form-control textoverflowellipsis text-right"
                      ref={selectedAddressRef}
                    >
                      {(selectedAddress && selectedAddress[0].address) || null}
                    </div>
                    <InputGroupAddon addonType="append">
                      <Button
                        variant="secondary"
                        className="active"
                        onClick={copyToClipboard(selectedAddressRef)}
                        id="selectedAddress"
                      >
                        <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
                      </Button>
                      <Tooltip
                        placement="right"
                        isOpen={tooltipOpen.selectedAddress}
                        target="selectedAddress"
                      >
                        {t("common:copied")}
                      </Tooltip>
                      <Button variant="secondary" className="active">
                        <IconSet
                          sprite="sprtsmclrd"
                          size="16"
                          name="qrcode"
                          onClick={() => openQrCodeModal()}
                        />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Row>
                {selectedAddress?.[0]?.address ? (
                  <Fragment>
                    <p className="sitecolorred">
                      {t("finance:depositCryptoWarning", {
                        watchedSymbol: watchedSymbol,
                      })}
                    </p>
                    <div className="bttminfolist">
                      {currentLanguage === "en" ? (
                        <ul>
                          <li>
                            Be sure to check that the address you copied is
                            correct in the area you pasted.
                          </li>
                          <li>
                            The amount you send will be automatically credited
                            to your account.
                          </li>
                        </ul>
                      ) : (
                        <ul>
                          <li>
                            Kopyaladığınız adresin yapıştırdığınız alanda
                            doğruluğunu mutlaka kontrol ediniz.
                          </li>
                          <li>
                            Gönderdiğiniz tutar otomatik olarak hesabınıza
                            geçecektir.
                          </li>
                        </ul>
                      )}
                    </div>
                  </Fragment>
                ) : (
                  <div className="resultbox">
                    <div className="modal-content text-center">
                      <div className="modal-body modal-confirm">
                        <h6>
                          {t("openorder:createNewAddressSymbol", {
                            symbol: selectedAddress?.[0]?.symbol,
                          })}
                        </h6>
                        <p>{t("openorder:confirmCreateAddress")}</p>
                      </div>
                      <div className="modal-footer">
                        <Button
                          variant="primary"
                          onClick={() =>
                            onCreateAddress(selectedAddress?.[0]?.currency_id)
                          }
                        >
                          {toUpperCase(t("finance:createNewAddress"))}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Form>
            <DepositWithdrawalTermsModal
              isOpen={openModal === "depositwithdrawalterms"}
              clearModals={clearOpenModals}
            />
            <QrCodeModal
              isOpen={openModal === "qrcode"}
              value={(selectedAddress && selectedAddress[0].address) || ""}
              clearModals={clearOpenModals}
            />
            <ResultSweetModal
              isOpen={openModal === "resultsweetmodal"}
              clearModals={clearOpenModals}
              isSuccess={isSuccess}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OpenOrderDepoWithTabDepositCrypto;
