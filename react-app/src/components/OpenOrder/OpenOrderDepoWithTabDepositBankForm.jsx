import { useMemo } from "react";
import {
  Row,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { uniq, groupBy } from "lodash";
import { useForm } from "react-hook-form";

import { IconSet } from "~/components/IconSet.jsx";
import { Button } from "~/components/Button.jsx";

const OpenOrderDepoWithTabDepositBankAkbank = props => {
  const { accounts } = props;
  const [bankCurrencies, accountsBySymbol] = useMemo(() => {
    const currencies = uniq(accounts.map(({ currency }) => currency?.symbol));
    const grouped = groupBy(accounts, ({ currency }) => currency?.symbol);

    return [currencies, grouped];
  }, [accounts]);

  const { register, watch } = useForm({
    defaultValues: {
      symbol: bankCurrencies[0],
    },
  });
  const [account] = accountsBySymbol[watch("symbol")];

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
            <div className="form-control textoverflowellipsis">
              {account?.iban || null}
            </div>
            <InputGroupAddon addonType="append">
              <Button variant="secondary" className="active">
                <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Row>
        <InputGroup className="form-group">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Hesap Sahibi</InputGroupText>
          </InputGroupAddon>
          <div className="form-control textoverflowellipsis">
            {account?.name || null}
          </div>
          <InputGroupAddon addonType="append">
            <Button variant="secondary" className="active">
              <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    </div>
  );
};

export default OpenOrderDepoWithTabDepositBankAkbank;
