import { useState } from "react";
import {
  Col,
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
import { nanoid } from "nanoid";
import { useTranslation } from "react-i18next";

import { Button } from "../Button.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { usePrices } from "~/state/hooks";
import { fetchOrderHistory } from "~/state/slices/order.slice";
import { formatDate } from "~/util/";

const orderBy = [
  "Önce Yeni Tarihli",
  "Önce Eski Tarihli",
  "Önce Alış",
  "Önce Satış",
  "Alfabetik",
];

export default function OrderHistoryFilter(props) {
  const { isOpen, clearModals, defaultValues, isFetching, ...rest } = props;
  const { t } = useTranslation(["app", "finance"]);
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState("");
  const { lang } = useSelector(state => state.ui);
  const orderSides = useSelector(state => state.api.settings?.orderSides);
  const orderStatuses = useSelector(state => state.api.settings?.orderStatuses);
  const { allPairs } = usePrices();
  const { register, handleSubmit, reset, clearErrors } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async data => {
    setApiError("");
    const pairids = [];

    data.pairids?.forEach?.((bool, idx) => {
      if (bool) pairids.push(allPairs?.[idx]?.id);
    });

    const startdate = formatDate(data.startdate, "yyyy-MM-dd", {
      locale: lang,
    });
    const enddate = formatDate(data.enddate, "yyyy-MM-dd", { locale: lang });

    const toSubmit = {
      ...data,
      pairids: JSON.stringify(pairids),
      startdate,
      enddate,
    };

    const { payload } = await dispatch(fetchOrderHistory(toSubmit));

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
      <ModalHeader toggle={clearModals}>İŞLEM GEÇMİŞİ FİLTRE</ModalHeader>
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
            <FormGroup className="checkradioboxed" check inline>
              {allPairs?.map?.((pair, idx) => {
                const id = nanoid();

                return (
                  <div
                    key={pair?.symbol}
                    className="custom-control custom-checkbox custom-control-inline"
                  >
                    <Input
                      className="custom-control-input"
                      type="checkbox"
                      id={id}
                      name={`pairids.${idx}`}
                      innerRef={register}
                    />
                    <Label
                      className="custom-control-label btn btn-sm btn-primary active"
                      htmlFor={id}
                    >
                      {pair?.name}
                    </Label>
                  </div>
                );
              })}
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>İşlem Tipi</legend>
            <FormGroup className="checkradioboxed" check inline>
              {orderSides?.map?.(({ id, name: _name }) => {
                const inputId = nanoid();
                const name = id === 1 ? "isbuyorders" : "issellorders";

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
                      className="custom-control-label btn btn-md btn-primary active"
                      htmlFor={inputId}
                    >
                      {t(`common:${_name?.toLowerCase?.()}`)}
                    </Label>
                  </div>
                );
              })}
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>İşlem Durumu</legend>
            <FormGroup className="checkradioboxed" check inline>
              {orderStatuses
                ?.filter(({ id }) => id === 2 || id === 3)
                ?.map?.(({ id, name: _name }) => {
                  const inputId = nanoid();
                  const name = id === 2 ? "isfilledorders" : "iscanceledorders";

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
                        className="custom-control-label btn btn-md btn-primary active"
                        htmlFor={inputId}
                      >
                        {t(`app:${_name?.toLowerCase?.()}`)}
                      </Label>
                    </div>
                  );
                })}
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Tarih Aralığı</legend>
            <FormGroup row>
              <Col>
                <Input
                  type="date"
                  title="Start Date"
                  name="startdate"
                  innerRef={register({
                    valueAsDate: true,
                  })}
                />
              </Col>
              <Col>
                <Input
                  type="date"
                  name="enddate"
                  title="End Date"
                  innerRef={register({
                    valueAsDate: true,
                  })}
                />{" "}
              </Col>
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Sıralama</legend>
            <FormGroup>
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
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <Button
              variant="primary"
              className="w-100"
              type="submit"
              disabled={isFetching}
            >
              İŞLEMLERİ FİLTRELE
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
}
