import { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

import { Button } from "../Button.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { usePrices } from "~/state/hooks";
import { fetchOpenOrders } from "~/state/slices/order.slice";

const orderBy = [
  "Önce Yeni Tarihli",
  "Önce Eski Tarihli",
  "Önce Alış",
  "Önce Satış",
  "Alfabetik",
];

const orderTypes = [
  { label: "Alış", name: "isbuyorders" },
  { label: "Satış", name: "issellorders" },
];

const OrderOpenOrdersFilter = props => {
  const { isOpen, clearModals, defaultValues, isFetching, ...rest } = props;
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState("");
  const { allPairs } = usePrices();
  const { register, handleSubmit, reset, clearErrors } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async data => {
    setApiError("");
    const pairids = [];

    data?.pairids?.forEach?.((bool, idx) => {
      if (bool) pairids.push(allPairs?.[idx]?.id);
    });

    const toSubmit = {
      ...data,
      pairids: JSON.stringify(pairids),
    };
    const { payload } = await dispatch(fetchOpenOrders(toSubmit));

    if (!payload?.status) {
      setApiError(payload?.errormessage);
    } else {
      setApiError("");
    }
  };

  // const onReset = () => {
  //   reset(defaultValues);
  //   setApiError("");
  //   clearErrors();
  // };

  return (
    <Modal
      wrapClassName=""
      modalClassName="modal-rightside"
      size="sm"
      isOpen={isOpen}
      toggle={clearModals}
      keyboard={false}
      fade={false}
      autoFocus={false}
      backdrop="static"
      {...rest}
    >
      <ModalHeader toggle={clearModals}>AÇIK EMİRLER FİLTRE</ModalHeader>
      <ModalBody className="modalcomp modalcomp-filters">
        {apiError && <AlertResult error>{apiError}</AlertResult>}
        <Form
          className="modalfiltersform siteformui"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup tag="fieldset">
            <legend>İşlem Çiftleri</legend>
            <FormGroup className="checkradioboxed">
              {allPairs?.map?.((pair, idx) => {
                return (
                  <div
                    key={pair?.symbol}
                    className="custom-control custom-checkbox custom-control-inline"
                  >
                    <Input
                      className="custom-control-input"
                      type="checkbox"
                      id={`filterPair${pair?.symbol}`}
                      name={`pairids.${idx}`}
                      innerRef={register}
                    />
                    <Label
                      className="custom-control-label btn btn-sm btn-secondary"
                      htmlFor={`filterPair${pair?.symbol}`}
                    >
                      {pair?.name.replace(/\s/g, "")}
                    </Label>
                  </div>
                );
              })}
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>İşlem Tipi</legend>
            <FormGroup className="checkradioboxed">
              {orderTypes.map(({ label, name }) => {
                const inputId = nanoid();
                return (
                  <div
                    key={name}
                    className="custom-control custom-checkbox custom-control-inline"
                  >
                    <Input
                      className="custom-control-input"
                      type="checkbox"
                      id={inputId}
                      name={name}
                      innerRef={register}
                    />
                    <Label
                      className="custom-control-label btn btn-sm btn-secondary"
                      htmlFor={inputId}
                    >
                      {label}
                    </Label>
                  </div>
                );
              })}
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Sıralama</legend>
            <FormGroup>
              <Input
                className="custom-select"
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
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <Button
              variant="primary"
              className="w-100"
              disabled={isFetching}
              type="submit"
            >
              İŞLEMLERİ FİLTRELE
            </Button>
            {/* <Button
                variant="secondary"
                size="sm"
                className="active"
                onClick={onReset}
              >
                Sıfırla
              </Button> */}
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default OrderOpenOrdersFilter;
