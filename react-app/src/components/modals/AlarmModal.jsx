import { useState, useEffect, useMemo } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  Progress,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import classnames from "classnames";
import { inRange, groupBy } from "lodash";

import { ReactComponent as PerLineIcon } from "~/assets/images/icons/path_icon_pericon.svg";
import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { AlertResult } from "../AlertResult.jsx";
import Table from "../Table";
import { getFormattedPrice, getPairTuple } from "~/util/";
import { useCurrencies } from "~/state/hooks/";

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
    ...rest
  } = props;
  const { t } = useTranslation(["coinbar", "common", "form"]);
  const { all: allAlarms, isCreating, hideOthers, isDeleting } = useSelector(
    state => state.alarm
  );
  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      amount: selectedPriceData?.price,
    },
  });
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
  const { activeCurrencies } = useCurrencies();

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
    const parsed = parseFloat(selectedPriceData?.price);

    if (rangeAlarmPortfolio !== 0) {
      const adjusted = parsed + parsed * (rangeAlarmPortfolio / 100);
      setValue("amount", adjusted);
    } else {
      setValue("amount", parsed);
    }
  }, [rangeAlarmPortfolio, selectedPriceData, setValue]);

  const onAmountStep = int => {
    const amount = getValues("amount");
    const newAmount = amount + int;

    if (newAmount >= spinnerMin && newAmount <= spinnerMax) {
      setValue("amount", newAmount);
    }
  };

  const onSubmit = async ({ amount }) => {
    const data = {
      pairname: currentPair?.name,
      pricealarmtypeid: rangeAlarmPortfolio > 0 ? 1 : 2,
      price: amount,
    };

    await createAlarm(data);
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
        {selectedPriceData ? (
          <div className="modalcomp-setalarm-data">
            <div className="databigger">
              <PerLineIcon className={`mdper mdper-${upOrDown}`} />
              <span className={siteColorClass} title={selectedPriceData?.price}>
                {getFormattedPrice(
                  selectedPriceData?.price,
                  selectedFiatCurrency?.digit
                )}
              </span>
            </div>
            <div className="datasmall">
              <span title={selectedPriceData?.pricechange}>
                {getFormattedPrice(
                  selectedPriceData?.pricechange,
                  selectedFiatCurrency?.digit
                )}
              </span>
              <span className={siteColorClass}>
                {upOrDown === "up" ? "+" : "-"}
                {selectedPriceData?.changepercent?.toFixed?.(2)}%
              </span>
            </div>
          </div>
        ) : null}

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
                <Input
                  type="number"
                  className="text-right"
                  name="amount"
                  innerRef={register({
                    valueAsNumber: true,
                    required: t("form:isRequired"),
                    min: {
                      value: 0,
                      message: t("form:shouldBeMin", { value: 0 }),
                    },
                    max: {
                      value: 999999,
                      message: t("form:shouldBeMax", { value: 999999 }),
                    },
                  })}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    {selectedFiatCurrency?.symbol}
                  </InputGroupText>
                </InputGroupAddon>
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
                onChange={({ target }) => {
                  const int = parseInt(target.value, 10);
                  setRangeAlarmPortfolio(int);
                }}
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
                    {t("common:amount")}
                  </Table.Th>
                  <Table.Th sizeauto className="adlt" />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody striped hovered scrollbar>
                {visibleAlarms.map(({ id, pairname, price, mdper }) => {
                  const [_, fiatCurrencySymbol] = getPairTuple(pairname);
                  const fiatCurrency = activeCurrencies?.find?.(
                    ({ symbol }) => symbol === fiatCurrencySymbol
                  );

                  return (
                    <Table.Tr key={id}>
                      <Table.Td sizeauto className="symb">
                        {pairname}
                      </Table.Td>
                      <Table.Td sizefixed className="amnt">
                        <span title={price}>
                          {getFormattedPrice(price, fiatCurrency?.digit)}
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
