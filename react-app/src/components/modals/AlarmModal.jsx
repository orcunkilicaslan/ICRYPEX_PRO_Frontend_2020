import { useState, useEffect, useMemo } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  Progress,
  FormText,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import classnames from "classnames";
import { inRange, groupBy } from "lodash";
import NumberFormat from "react-number-format";

import { ReactComponent as PerLineIcon } from "~/assets/images/icons/path_icon_pericon.svg";
import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { AlertResult } from "../AlertResult.jsx";
import Table from "../Table";
import { getPairTuple } from "~/util/";
import { useCurrencies } from "~/state/hooks/";
import NumberInput from "../NumberInput";

const rangeAlarmPercent = [-100, -75, -50, -25, 0, 25, 50, 75, 100];
const spinnerStep = 10;
const spinnerMin = 0;
const spinnerMax = 999999999;

export default function AlarmModal(props) {
  const {
    isOpen,
    clearModals,
    errorMessage,
    selectedPriceData,
    selectedFiatCurrency,
    currentPair,
    createAlarm,
    deleteAlarm,
    deleteAlarms,
    onToggleHideOthers,
    setErrorMessage,
    ...rest
  } = props;
  const { t } = useTranslation(["coinbar", "common", "form"]);
  const { findCurrencyBySymbol } = useCurrencies();
  const { all: allAlarms, isCreating, hideOthers, isDeleting } = useSelector(
    state => state.alarm
  );
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    reset: resetForm,
    errors,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const [userInput, setUserInput] = useState(null);
  const [rangeAlarmPortfolio, setRangeAlarmPortfolio] = useState(
    rangeAlarmPercent[4]
  );
  const visibleAlarms = useMemo(() => {
    if (!hideOthers) {
      return allAlarms;
    } else {
      const byPair = groupBy(allAlarms, ({ pairname }) => pairname);

      return byPair[currentPair?.name] || [];
    }
  }, [allAlarms, currentPair, hideOthers]);

  const upOrDown = selectedPriceData?.changepercent > 0 ? "up" : "down";
  const siteColorClass = `sitecolor${upOrDown === "up" ? "green" : "red"}`;
  const rangeAlarmPortfolioValPositive = rangeAlarmPortfolio;
  const rangeAlarmPortfolioValNegative = rangeAlarmPortfolio * -1;

  const rangeAlarmCircleCls = classnames({
    percstepa00: inRange(rangeAlarmPortfolio, 1, 25),
    percstepa25: inRange(rangeAlarmPortfolio, 25, 50),
    percstepa50: inRange(rangeAlarmPortfolio, 50, 75),
    percstepa75: inRange(rangeAlarmPortfolio, 75, 100),
    percstepa100: rangeAlarmPortfolio === 100,
    percstepp00: inRange(rangeAlarmPortfolio, -1, -25),
    percstepp25: inRange(rangeAlarmPortfolio, -25, -50),
    percstepp50: inRange(rangeAlarmPortfolio, -50, -75),
    percstepp75: inRange(rangeAlarmPortfolio, -75, -99),
    percstepp100: rangeAlarmPortfolio === -100,
  });

  useEffect(() => {
    if (isOpen) {
      let amount;

      if (userInput) {
        setRangeAlarmPortfolio(0);
        amount = userInput;
      } else amount = selectedPriceData?.price;

      if (amount) {
        if (rangeAlarmPortfolio !== 0) {
          const adjusted = amount + amount * (rangeAlarmPortfolio / 100);
          setValue("amount", adjusted);
        } else {
          setValue("amount", amount);
        }
      }
    } else {
      setErrorMessage(null);
      setUserInput(null);
      setRangeAlarmPortfolio(0);
      resetForm();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, rangeAlarmPortfolio, selectedPriceData, userInput]);

  const onAmountStep = int => {
    const amount = getValues("amount");
    const newAmount = amount + int;

    if (newAmount >= spinnerMin && newAmount <= spinnerMax) {
      setValue("amount", newAmount);
      setUserInput(newAmount);
    }
  };

  const onValueChange = target => {
    let amount = target.floatValue;
    setValue("amount", amount);
  };

  const onChange = () => {
    const amount = watch("amount");
    setUserInput(amount);
  };

  const onSubmit = async ({ amount }) => {
    const data = {
      pairname: currentPair?.name,
      pricealarmtypeid: rangeAlarmPortfolio > 0 ? 1 : 2,
      price: amount,
    };

    await createAlarm(data);
  };

  const onRangeChange = event => {
    const int = parseInt(event?.target?.value, 10);
    setRangeAlarmPortfolio(int);
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
      {...rest}
    >
      <ModalHeader toggle={clearModals}>{t("setAlarm")}</ModalHeader>
      <ModalBody className="modalcomp modalcomp-setalarm">
        <div className="modalcomp-setalarm-data">
          {selectedPriceData?.price && (
            <div className="databigger">
              <PerLineIcon className={`mdper mdper-${upOrDown}`} />
              <span className={siteColorClass} title={selectedPriceData?.price}>
                <NumberFormat
                  value={selectedPriceData?.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={selectedFiatCurrency?.digit}
                  fixedDecimalScale
                />
              </span>
            </div>
          )}
          <div className="datasmall">
            <span title={selectedPriceData?.pricechange}>
              <NumberFormat
                value={selectedPriceData?.pricechange}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={selectedFiatCurrency?.digit}
                fixedDecimalScale
              />
            </span>
            <span
              className={siteColorClass}
              title={selectedPriceData?.changepercent}
            >
              {upOrDown === "up" ? "+" : "-"}
              <NumberFormat
                value={selectedPriceData?.changepercent}
                displayType={"text"}
                thousandSeparator={false}
                decimalScale={2}
                suffix="%"
              />
            </span>
          </div>
        </div>

        <div className="modalcomp-setalarm-form">
          {errorMessage ? (
            <AlertResult error>{errorMessage}</AlertResult>
          ) : null}
          <Form
            className="siteformui"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="setalarmspinner">
              {errors.amount && (
                <FormText className="inputresult resulterror inputintext">
                  {errors.amount?.message}
                </FormText>
              )}
              <FormGroup className="input-group">
                <InputGroupAddon addonType="prepend">
                  <Button
                    variant="secondary"
                    className="active"
                    onClick={() => onAmountStep(-spinnerStep)}
                  >
                    -
                  </Button>
                </InputGroupAddon>
                <NumberInput
                  control={control}
                  name="amount"
                  defaultValue={selectedPriceData?.price}
                  rules={{
                    required: t("form:isRequired"),
                    min: {
                      value: spinnerMin,
                      message: t("form:shouldBeMin", { value: spinnerMin }),
                    },
                    max: {
                      value: spinnerMax,
                      message: t("form:shouldBeMax", { value: spinnerMax }),
                    },
                  }}
                  inputProps={{
                    className: "text-right",
                    thousandSeparator: true,
                    decimalScale: selectedFiatCurrency?.digit,
                    fixedDecimalScale: true,
                    suffix: ` ${selectedFiatCurrency?.symbol}`,
                    onValueChange,
                    onChange,
                  }}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    variant="secondary"
                    className="active"
                    onClick={() => onAmountStep(spinnerStep)}
                  >
                    +
                  </Button>
                </InputGroupAddon>
              </FormGroup>
            </div>
            <div className="setalarmrange">
              <div className="setalarmrange-progress">
                <Progress
                  className="barnegative"
                  barClassName={
                    rangeAlarmPortfolio >= 0 ? "opacity-0" : "opacity-1"
                  }
                  value={rangeAlarmPortfolioValNegative}
                />
                <Progress
                  className="barpositive"
                  barClassName={
                    rangeAlarmPortfolio <= 0 ? "opacity-0" : "opacity-1"
                  }
                  value={rangeAlarmPortfolioValPositive}
                />
              </div>
              <div
                className={`setalarmrange-circle ${rangeAlarmCircleCls}`}
                data-val={rangeAlarmPortfolio}
              >
                {rangeAlarmPercent.map((el, idx) => {
                  return (
                    <span key={`${el}_${idx}`} className={`val-${el}`}></span>
                  );
                })}
              </div>
              <div className="setalarmrange-perc">
                <span className="sitecolorred">-100%</span>
                <span className="sitecolorgreen">+100%</span>
              </div>
              <output
                className={`setalarmrange-bubble ${
                  rangeAlarmPortfolio > 0 ? "valpositive" : "valnegative"
                }`}
              >
                {rangeAlarmPortfolio}%
              </output>
              <Input
                className={`setalarmrange-range custom-range ${
                  rangeAlarmPortfolio > 0 ? "valpositive" : "valnegative"
                }`}
                type="range"
                min={-100}
                max={100}
                step={1}
                value={rangeAlarmPortfolio}
                onChange={onRangeChange}
              />
            </div>
            <div className="setalarmbtn">
              <Button
                type="submit"
                variant="warning"
                className="w-100"
                disabled={isCreating}
              >
                {t("createAlarm")}
              </Button>
            </div>
          </Form>
        </div>
        <div
          className={`modalcomp-setalarm-table ${
            !allAlarms?.length ? "d-none" : ""
          }`}
        >
          <div className="headsmtitle">
            <div className="headsmtitle-col">
              <h6>{hideOthers ? currentPair?.name : t("common:all")}</h6>
            </div>
            <div className="headsmtitle-col">
              <div className="custom-control custom-checkbox">
                <Input
                  className="custom-control-input"
                  type="checkbox"
                  id="setalarmsHideOtherPairs"
                  checked={hideOthers}
                  onChange={onToggleHideOthers}
                />
                <Label
                  className="custom-control-label"
                  htmlFor="setalarmsHideOtherPairs"
                  check
                >
                  {t("hidePairs")}
                </Label>
              </div>
            </div>
          </div>
          <div className="setalarmtable scrollbar">
            <Table>
              <Table.Thead scrollbar>
                <Table.Tr>
                  <Table.Th sizeauto className="symb">
                    {t("common:pair")}
                  </Table.Th>
                  <Table.Th sizefixed className="amnt">
                    {t("common:price")}
                  </Table.Th>
                  <Table.Th sizeauto className="adlt" />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody striped hovered scrollbar>
                {visibleAlarms.map(({ id, pairname, price, mdper }) => {
                  const [_, fiatCurrencySymbol] = getPairTuple(pairname);
                  const fiatCurrency = findCurrencyBySymbol(fiatCurrencySymbol);

                  return (
                    <Table.Tr key={id}>
                      <Table.Td sizeauto className="symb">
                        {pairname}
                      </Table.Td>
                      <Table.Td sizefixed className="amnt">
                        <span title={price}>
                          <NumberFormat
                            value={price}
                            displayType={"text"}
                            thousandSeparator={true}
                            decimalScale={fiatCurrency?.digit}
                            fixedDecimalScale
                          />
                        </span>
                        <PerLineIcon className={`mdper mdper-${mdper}`} />
                      </Table.Td>
                      <Table.Td sizeauto className="adlt">
                        <Button type="button" onClick={() => deleteAlarm(id)}>
                          <IconSet
                            sprite="sprtsmclrd"
                            size="14"
                            name="delete"
                          />
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </div>
          <div className="deletealarmbtn">
            <Button
              variant="danger"
              className="w-100"
              onClick={deleteAlarms}
              disabled={!allAlarms?.length || isDeleting}
            >
              {t("deleteAllAlarms")}
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
