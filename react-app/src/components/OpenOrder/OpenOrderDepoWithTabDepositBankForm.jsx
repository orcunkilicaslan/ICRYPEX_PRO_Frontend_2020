import { useMemo, useRef } from "react";
import {
  Row,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";
import { uniq, groupBy } from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { IconSet } from "~/components/IconSet.jsx";
import { Button } from "~/components/Button.jsx";
import { setOpenModal } from "~/state/slices/ui.slice";
import DepositWithdrawalTermsModal from "~/components/modals/DepositWithdrawalTermsModal.jsx";

const OpenOrderDepoWithTabDepositBankForm = props => {
  const { accounts, bankCode } = props;
  const [bankCurrencies, accountsBySymbol] = useMemo(() => {
    const currencies = uniq(
      accounts?.map?.(({ currency }) => currency?.symbol)
    );
    const grouped = groupBy(accounts, ({ currency }) => currency?.symbol);

    return [currencies, grouped];
  }, [accounts]);

  const ibanInputRef = useRef(null);
  const accountNameRef = useRef(null);

  const { register, watch } = useForm({
    defaultValues: {
      symbol: bankCurrencies[0],
    },
  });
  const bankAccounts = accountsBySymbol[watch("symbol")];
  const account = bankAccounts?.[0];

  const { openModal } = useSelector(state => state.ui);

  const dispatch = useDispatch();

  const openTermsModal = () => {
    dispatch(setOpenModal("depositwithdrawalterms"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };


  const  copyToClipboard = ref => () => {
    switch(ref) {

      case "ibanInputRef":   return navigator.clipboard.writeText(ibanInputRef.current.innerText).then(r => {});
      case "accountNameRef":   return navigator.clipboard.writeText(accountNameRef.current.innerText).then(r => {});
      default:      return ""
    }
  };

  return (
    <div className="dandwtab-form">
      <Form
        className="depositbankform siteformui"
        autoComplete="off"
        noValidate
      >
        <Row form>
          <FormGroup className="col-auto">
            <Input
              className="custom-select"
              type="select"
              name="symbol"
              innerRef={register}
            >
              {bankCurrencies.map(symbol => {
                return <option key={symbol}>{symbol}</option>;
              })}
            </Input>
          </FormGroup>
          <InputGroup className="form-group col">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>IBAN</InputGroupText>
            </InputGroupAddon>
            <div className="form-control textoverflowellipsis" ref={ibanInputRef}>
              {account?.iban || null}
            </div>
            <InputGroupAddon addonType="append">
              <Button variant="secondary" className="active" type="button" onClick={copyToClipboard('ibanInputRef')}>
                <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Row>
        <InputGroup className="form-group">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Hesap Sahibi</InputGroupText>
          </InputGroupAddon>
          <div className="form-control textoverflowellipsis"  ref={accountNameRef}>
            {account?.name || null}
          </div>
          <InputGroupAddon addonType="append">
            <Button variant="secondary" className="active" type="button" onClick={copyToClipboard('accountNameRef')}>
              <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <div className="confirmcheckbox">
          <div className="custom-control custom-checkbox">
            <Input
              className="custom-control-input"
              id={`${bankCode}_depositBankTabIhaveRead`}
              type="checkbox"
              defaultChecked
            />
            <Label
              className="custom-control-label"
              htmlFor={`${bankCode}_depositBankTabIhaveRead`}
            >
              <Button onClick={openTermsModal}>Kural ve Şartları</Button> okudum
              onaylıyorum.
            </Label>
          </div>
        </div>
      </Form>
      <DepositWithdrawalTermsModal
        isOpen={openModal === "depositwithdrawalterms"}
        clearModals={clearOpenModals}
      />
    </div>
  );
};

export default OpenOrderDepoWithTabDepositBankForm;
