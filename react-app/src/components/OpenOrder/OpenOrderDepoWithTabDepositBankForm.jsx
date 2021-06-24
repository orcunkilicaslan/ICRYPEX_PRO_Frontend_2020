import { useMemo, useRef, useState } from "react";
import {
  Row,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Tooltip,
} from "reactstrap";
import { uniq, groupBy } from "lodash";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { IconSet } from "~/components/IconSet.jsx";
import { Button } from "~/components/Button.jsx";

const OpenOrderDepoWithTabDepositBankForm = props => {
  const { accounts } = props;
  const { t } = useTranslation(["common", "finance"]);
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

  const [tooltipOpen, setTooltipOpen] = useState({
    iban: false,
    accountName: false,
  });

  const copyToClipboard = ref => async () => {
    switch (ref) {
      case "ibanInputRef":
        return navigator.clipboard
          .writeText(ibanInputRef.current.innerText)
          .then(r => {
            setTooltipOpen({ ...tooltipOpen, iban: true });
            setTimeout(
              async () => await setTooltipOpen({ ...tooltipOpen, iban: false }),
              2000
            );
          });
      case "accountNameRef":
        return navigator.clipboard
          .writeText(accountNameRef.current.innerText)
          .then(r => {
            setTooltipOpen({ ...tooltipOpen, accountName: true });
            setTimeout(
              async () =>
                await setTooltipOpen({ ...tooltipOpen, accountName: false }),
              2000
            );
          });
      default:
        return "";
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
            <div
              className="form-control textoverflowellipsis"
              ref={ibanInputRef}
            >
              {account?.iban || null}
            </div>
            <InputGroupAddon addonType="append">
              <Button
                variant="secondary"
                className="active"
                type="button"
                onClick={copyToClipboard("ibanInputRef")}
                id="iban"
              >
                <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
              </Button>
              <Tooltip
                placement="right"
                isOpen={tooltipOpen.iban}
                target="iban"
              >
                {t("common:copied")}
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </Row>
        <InputGroup className="form-group">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{t("finance:accountOwner")}</InputGroupText>
          </InputGroupAddon>
          <div
            className="form-control textoverflowellipsis"
            ref={accountNameRef}
          >
            {account?.name || null}
          </div>
          <InputGroupAddon addonType="append">
            <Button
              variant="secondary"
              className="active"
              type="button"
              onClick={copyToClipboard("accountNameRef")}
              id="accountName"
            >
              <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
            </Button>
            <Tooltip
              placement="right"
              isOpen={tooltipOpen.accountName}
              target="accountName"
            >
              {t("common:copied")}
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    </div>
  );
};

export default OpenOrderDepoWithTabDepositBankForm;
