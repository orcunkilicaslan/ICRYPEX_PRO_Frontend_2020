import { useState, useMemo } from "react";
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
import { fetchTransactionHistories } from "~/state/slices/transaction.slice";
import { useCurrencies } from "~/state/hooks/";
import { formatDate } from "~/util/";

const orderBy = [
  "Önce Yeni Tarihli",
  "Önce Eski Tarihli",
  "Önce Para Yatırma",
  "Önce Para Çekme",
  "Önce TRY",
  "Önce USD",
  "Önce Kripto Para",
  "Önce Banka",
  "Önce Papara",
];

const activityStatuses = [
  { label: "Realized", name: "isrealized" },
  { label: "Canceled", name: "iscanceled" },
];

const ActivitiesHistoryFilter = props => {
  const { isOpen, clearModals, defaultValues, isFetching, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "finance"]);
  const [apiError, setApiError] = useState("");
  const { lang } = useSelector(state => state.ui);
  const requestTypes = useSelector(
    state => state.api.settings?.moneyRequestTypes
  );
  const { activeCurrencies } = useCurrencies();
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const validCurrencies = useMemo(() => {
    return activeCurrencies.filter(({ symbol }) => symbol !== "EUR");
  }, [activeCurrencies]);

  const onSubmit = async data => {
    setApiError("");
    const currencyids = [];

    data?.currencyids?.forEach?.((bool, idx) => {
      if (bool) currencyids.push(validCurrencies?.[idx]?.id);
    });

    const startdate = formatDate(data?.startdate, "yyyy-MM-dd", {
      locale: lang,
    });
    const enddate = formatDate(data?.enddate, "yyyy-MM-dd", { locale: lang });
    const toSubmit = {
      ...data,
      currencyids: JSON.stringify(currencyids),
      startdate,
      enddate,
    };

    const { payload } = await dispatch(fetchTransactionHistories(toSubmit));

    if (!payload?.status) {
      setApiError(payload?.errormessage);
    } else {
      setApiError("");
    }
  };

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
      <ModalHeader toggle={clearModals}>TRANSFER GEÇMİŞİ FİLTRE</ModalHeader>
      <ModalBody className="modalcomp modalcomp-filters">
        {apiError && <AlertResult error>{apiError}</AlertResult>}
        <Form
          className="modalfiltersform siteformui"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup tag="fieldset">
            <legend>Para Birimleri</legend>
            <FormGroup className="checkradioboxed">
              {validCurrencies?.map?.(({ symbol }, idx) => {
                const inputId = nanoid();

                return (
                  <div
                    key={symbol}
                    className="custom-control custom-checkbox custom-control-inline"
                  >
                    <Input
                      className="custom-control-input"
                      type="checkbox"
                      id={inputId}
                      name={`currencyids.${idx}`}
                      innerRef={register}
                    />
                    <Label
                      className="custom-control-label btn btn-sm btn-primary"
                      htmlFor={inputId}
                    >
                      {symbol}
                    </Label>
                  </div>
                );
              })}
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>İşlem Tipi</legend>
            <FormGroup className="checkradioboxed">
              {requestTypes.map(({ name, id }) => {
                const inputId = nanoid();
                const fieldName = id === 1 ? "isdeposit" : "iswithdraw";

                return (
                  <div
                    key={name}
                    className="custom-control custom-checkbox custom-control-inline"
                  >
                    <Input
                      className="custom-control-input"
                      type="checkbox"
                      id={inputId}
                      name={fieldName}
                      innerRef={register}
                    />
                    <Label
                      className="custom-control-label btn btn-sm btn-primary"
                      htmlFor={inputId}
                    >
                      {t(`finance:${name?.toLowerCase?.()}`)}
                    </Label>
                  </div>
                );
              })}
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>İşlem Durumu</legend>
            <FormGroup className="checkradioboxed">
              {activityStatuses.map(({ label, name }) => {
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
                      className="custom-control-label btn btn-sm btn-primary"
                      htmlFor={inputId}
                    >
                      {t(`finance:${label?.toLowerCase?.()}`)}
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
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ActivitiesHistoryFilter;
