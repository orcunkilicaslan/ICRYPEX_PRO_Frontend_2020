import { useState, useEffect } from "react";
import classnames from "classnames";
import {
  Row,
  Col,
  Label,
  Input,
  ButtonGroup,
  Form,
  FormGroup,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { useClientRect } from "~/state/hooks";
import { fetchPendingTransactions } from "~/state/slices/transaction.slice";
import { formatDateDistance } from "~/util/";

const transactionTypes = [
  { label: "Yatırma", name: "isdeposit" },
  { label: "Çekme", name: "iswithdraw" },
];

const transactionMethods = [
  { label: "Havale/EFT", name: "isbank" },
  { label: "Papara", name: "ispapara" },
];

const transactionCurrencies = [
  { label: "TRY", name: "istry" },
  { label: "USD", name: "isusd" },
];

const orderBy = [
  "Önce Yeni Tarihli",
  "Önce Eski Tarihli",
  "Önce Para Yatırma",
  "Önce Para Çekme",
  "Önce TRY",
  "Önce USD",
  "Önce Banka",
  "Önce Papara",
];

const defaultValues = {
  isdeposit: true,
  iswithdraw: true,
  istry: true,
  isusd: true,
  isbank: true,
  ispapara: true,
  orderby: 1,
};

const OpenOrderAccountActivitiesPending = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form"]);
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const { pending: pendingTransactions } = useSelector(
    state => state.transaction
  );
  const { lang } = useSelector(state => state.ui);
  const [apiError, setApiError] = useState("");
  const { accesstoken } = useSelector(state => state.api);
  const { register, handleSubmit, errors, watch, reset, clearErrors } = useForm(
    {
      mode: "onChange",
      defaultValues,
    }
  );

  useEffect(() => {
    if (accesstoken) {
      dispatch(fetchPendingTransactions(defaultValues));
    }
  }, [accesstoken, dispatch]);

  const onSubmit = async data => {
    setApiError("");

    const { payload } = await dispatch(fetchPendingTransactions(data));

    if (!payload?.status) {
      setApiError(payload?.errormessage);
    } else {
      setApiError("");
    }
  };

  const onReset = () => {
    reset(defaultValues);
    setApiError("");
    clearErrors();
  };

  return (
    <div className="activities-pending">
      <Form
        className="tabcont tabcont-filterbar siteformui"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row className="tabcont tabcont-filterbar">
          <Col>
            <Input
              className="custom-select custom-select-sm"
              type="select"
              name="orderby"
              innerRef={register({
                valueAsNumber: true,
              })}
            >
              {orderBy.map((el, idx) => {
                return (
                  <option value={idx + 1} key={`${el}_${idx}`}>
                    {el}
                  </option>
                );
              })}
            </Input>
          </Col>
          <Col>
            <FormGroup check inline>
              {transactionTypes.map(({ label, name }) => {
                return (
                  <Label key={name} check>
                    <Input
                      name={name}
                      type="checkbox"
                      innerRef={register({ valueAsNumber: true })}
                    />
                    {label}{" "}
                  </Label>
                );
              })}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup check inline>
              {transactionMethods.map(({ label, name }) => {
                return (
                  <Label key={name} check>
                    <Input
                      name={name}
                      type="checkbox"
                      innerRef={register({ valueAsNumber: true })}
                    />
                    {label}{" "}
                  </Label>
                );
              })}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup check inline>
              {transactionCurrencies.map(({ label, name }) => {
                return (
                  <Label key={name} check>
                    <Input
                      name={name}
                      type="checkbox"
                      innerRef={register({ valueAsNumber: true })}
                    />
                    {label}{" "}
                  </Label>
                );
              })}
            </FormGroup>
          </Col>
        </Row>
        <ButtonGroup>
          <Button variant="secondary" className="w-100 active" type="submit">
            Filtrele
          </Button>
          <Button variant="secondary" className="active" onClick={onReset}>
            Sıfırla
          </Button>
        </ButtonGroup>
        {apiError && (
          <span style={{ color: "coral", fontSize: "1rem" }}>{apiError}</span>
        )}
      </Form>
      <div className="activitiespendingtable scrollbar" ref={tableCanvasRef}>
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="nmbr">
                İşlem No
              </Table.Th>
              <Table.Th sizeauto className="date">
                Tarih
              </Table.Th>
              <Table.Th sizeauto className="type">
                İşlem Tipi
              </Table.Th>
              <Table.Th sizeauto className="mthd">
                Yöntem
              </Table.Th>
              <Table.Th sizeauto className="bank">
                Banka
              </Table.Th>
              <Table.Th sizefixed className="amnt">
                Miktar
              </Table.Th>
              <Table.Th sizeauto className="stts">
                Durum
              </Table.Th>
              <Table.Th sizeauto className="bttn" />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody
            striped
            hovered
            scrollbar
            scrollbarstyles={{ height: `${tableHeight - 36}px` }}
          >
            {pendingTransactions.map(
              ({
                id,
                datetime,
                currencysymbol,
                amount,
                request_type_id,
                requesttype,
                requst_method_id,
                requstmethod,
                status,
              }) => {
                const typecls = classnames({
                  sitecolorgreen: request_type_id === "1",
                  sitecolorred: request_type_id === "2",
                });

                const statuscls = classnames({
                  sitecoloryellow: status === "1",
                  sitecolorgreen: status === "2",
                  sitecolorred: status === "3",
                });

                return (
                  <Table.Tr key={id}>
                    <Table.Td sizeauto className="nmbr">
                      {id}
                    </Table.Td>
                    <Table.Td sizeauto className="date">
                      <span title={datetime}>
                        {formatDateDistance(new Date(datetime), Date.now(), {
                          locale: lang,
                        })}
                      </span>
                    </Table.Td>
                    <Table.Td sizeauto className="type">
                      <span className={typecls}>{requesttype}</span>
                    </Table.Td>
                    <Table.Td sizeauto className="mthd">
                      {requstmethod}
                    </Table.Td>
                    <Table.Td sizeauto className="bank">
                      {currencysymbol}
                    </Table.Td>
                    <Table.Td sizefixed className="amnt">
                      {amount}
                    </Table.Td>
                    <Table.Td sizeauto className="stts">
                      <span className={statuscls}>----</span>
                    </Table.Td>
                    <Table.Td sizeauto className="bttn">
                      <Button type="button">
                        <IconSet sprite="sprtsmclrd" size="14" name="delete" />
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                );
              }
            )}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default OpenOrderAccountActivitiesPending;
