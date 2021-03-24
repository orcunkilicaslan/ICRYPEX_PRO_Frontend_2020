
import { useState } from "react";
import {
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Input, Label,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";
import { useCurrencies } from "~/state/hooks/";
import { depositCrypto } from "~/state/slices/deposit.slice";

import { setOpenModal } from "~/state/slices/ui.slice";
import DepositWithdrawalTermsModal from "~/components/modals/DepositWithdrawalTermsModal.jsx";

const OpenOrderDepoWithTabDepositCrypto = props => {
  const dispatch = useDispatch();
  const { cryptoCurrencies = [], tokenCurrencies = [] } = useCurrencies();
  const { isDepositingCrypto } = useSelector(state => state.deposit);
  const { groupedCryptoAddresses = {} } = useSelector(state => state.assets);
  const [apiError, setApiError] = useState("");
  const { register, handleSubmit, watch, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: {
      symbol: "",
    },
  });
  const visibleCurrencies = cryptoCurrencies.concat(tokenCurrencies);

  const getAddress = () => {
    const watchedSymbol = watch("symbol");

    if (watchedSymbol) {
      const [address] = groupedCryptoAddresses[watchedSymbol];

      return address;
    }
  };

  const onSubmit = async data => {
    const { symbol: _symbol } = data;
    const currency = visibleCurrencies.find(({ symbol }) => symbol === _symbol);
    const currencyid = parseInt(currency?.id, 10);

    if (currencyid) {
      setApiError("");
      const { payload } = await dispatch(depositCrypto({ currencyid }));

      if (!payload?.status) {
        setApiError(payload?.errormessage);
      } else {
        clearErrors();
        setApiError("");
      }
    }
  };

  const { openModal } = useSelector(state => state.ui);

  const openTermsModal = () => {
    dispatch(setOpenModal("depositwithdrawalterms"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  return (
    <div className="dandwtab-crypto">
      <div className="dandwtab-form">
        <Form
          className="depositcryptoform siteformui"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="formfieldset">
            <Row form>
              <FormGroup className="col-auto">
                <Input
                  className="custom-select"
                  type="select"
                  name="symbol"
                  innerRef={register()}
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
                <div className="form-control textoverflowellipsis text-right">
                  {getAddress()?.address || null}
                </div>
                <InputGroupAddon addonType="append">
                  <Button variant="secondary" className="active">
                    <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
                  </Button>
                  <Button variant="secondary" className="active">
                    <IconSet sprite="sprtsmclrd" size="16" name="qrcode" />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Row>
            <p className="sitecolorred">
              Bu adrese sadece BTC gönderin. Farklı bir coin göndermek
              yatırdıklarınızın kaybolmasına neden olur.
            </p>
          </div>
          <div className="confirmcheckbox">
            <div className="custom-control custom-checkbox">
              <Input
                  className="custom-control-input"
                  id="depositTabIhaveRead"
                  type="checkbox"
                  defaultChecked
              />
              <Label
                  className="custom-control-label"
                  htmlFor="depositTabIhaveRead"
              >
                <Button
                    onClick={openTermsModal}
                >
                  Kural ve Şartları
                </Button>{" "}
                okudum onaylıyorum.
              </Label>
            </div>
          </div>
          <div className="formbttm">
            {apiError && (
              <span style={{ color: "red", fontSize: "1rem" }}>{apiError}</span>
            )}
            <Button
              type="submit"
              disabled={isDepositingCrypto}
              variant="secondary"
              className="active"
            >
              GÖNDER
            </Button>
          </div>
        </Form>
        <DepositWithdrawalTermsModal
            isOpen={openModal === "depositwithdrawalterms"}
            clearModals={clearOpenModals}
        />
        <div className="bttminfolist">
          <ul>
            <li>
              Kopyaladığınız adresin yapıştırdığınız alanda doğruluğunu mutlaka
              kontrol ediniz.
            </li>
            <li>
              Yatırılabilen en az tutar 0.0001 BTC’dir. 0.0001 BTC altındaki
              yatırma işlemleri iade edilmeyecektir.
            </li>
            <li>Gönderdiğiniz tutar otomatik olarak hesabınıza geçecektir.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OpenOrderDepoWithTabDepositCrypto;
