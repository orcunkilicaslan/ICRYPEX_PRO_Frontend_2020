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
import { useDispatch, useSelector } from "react-redux";
import { merge } from "lodash";

import { Button } from "../Button.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { usePrices } from "~/state/hooks";
import { fetchOpenOrders } from "~/state/slices/order.slice";
import CustomSelect from "~/components/CustomSelect";

const orderBy = [
  "Önce Yeni Tarihli",
  "Önce Eski Tarihli",
  "Önce Alış",
  "Önce Satış",
  "Alfabetik",
];

const OrderOpenOrdersFilter = props => {
  const { isOpen, clearModals, defaultValues, isFetching, ...rest } = props;
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState("");
  const { allPairs } = usePrices();
  const orderSides = useSelector(state => state.api.settings?.orderSides);
  const { register, handleSubmit, watch, setValue } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async data => {
    setApiError("");
    const { typeID, pairids, ...rest } = data;
    const typeIdx = parseInt(typeID, 10);
    const toSubmit = {
      ...rest,
      isbuyorders: true,
      issellorders: true,
    };

    const _pairids = [];
    pairids?.forEach?.((bool, idx) => {
      if (bool) _pairids.push(allPairs?.[idx]?.id);
    });
    merge(toSubmit, { pairids: JSON.stringify(_pairids) });

    if (typeIdx !== -1) {
      merge(toSubmit, {
        isbuyorders: typeIdx === 1,
        issellorders: typeIdx === 2,
      });
    }

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
            <FormGroup>
              <CustomSelect
                list={orderSides}
                title={"İşlem Tipi"}
                name="typeID"
                index={watch("typeID")}
                setIndex={id => setValue("typeID", id)}
                ref={register}
              />
            </FormGroup>{" "}
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
