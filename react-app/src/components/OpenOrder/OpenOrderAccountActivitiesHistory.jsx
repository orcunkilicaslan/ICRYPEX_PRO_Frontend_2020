import { useState, useMemo, useEffect, memo } from "react";
import { Row, Col, Form } from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { sub, isWithinInterval, addDays } from "date-fns";
import NumberFormat from "react-number-format";

import { Button } from "../Button.jsx";
import Table from "../Table.jsx";
import { useClientRect, useCurrencies } from "~/state/hooks/";
import { fetchTransactionHistories } from "~/state/slices/transaction.slice";
import { formatDate, formatDateDistance } from "~/util/";
import { ActivitiesHistoryFilter } from "~/components/modals/";
import { setOpenModal } from "~/state/slices/ui.slice";
import ButtonGroupRadio from "~/components/ButtonGroupRadio";
import CustomSelect from "~/components/CustomSelect";
import { periodBy } from "./OpenOrder";

const OpenOrderAccountActivitiesHistory = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation([
    "form",
    "app",
    "openorder",
    "common",
    "finance",
  ]);
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const { activeCurrencies, findCurrencyBySymbol } = useCurrencies();
  const { lang, openModal } = useSelector(state => state.ui);
  const accountHistory = useSelector(state => state.transaction.histories);
  const isFetching = useSelector(
    state => state.transaction.isFetchingHistories
  );
  const requestTypes = useSelector(
    state => state.api.settings?.moneyRequestTypes
  );
  const moneyRequestStatuses = useSelector(
    state => state.api.settings?.moneyRequestStatuses
  );
  const [periodbyIndex, setPeriodbyIndex] = useState(0);
  const [requestTypeIdx, setRequestTypeIdx] = useState(-1);
  const [requestStatusIdx, setRequestStatusIdx] = useState(-1);

  const defaultValues = useMemo(() => {
    const tomorrow = formatDate(addDays(Date.now(), 1), "yyyy-MM-dd", {
      locale: lang,
    });
    const threeMonthsAgo = formatDate(
      sub(new Date(), { months: 3 }),
      "yyyy-MM-dd",
      { locale: lang }
    );

    return {
      currencyids: [],
      orderby: 0,
      isdeposit: true,
      iswithdraw: true,
      isrealized: true,
      iscanceled: true,
      startdate: threeMonthsAgo,
      enddate: tomorrow,
    };
  }, [lang]);

  const visibleHistories = useMemo(() => {
    let histories = accountHistory;
    const interval = periodBy[periodbyIndex]?.duration;
    const typeIdx = parseInt(requestTypeIdx, 10);
    const statusIdx = parseInt(requestStatusIdx, 10);

    if (typeIdx !== -1) {
      histories = histories?.filter?.(
        ({ request_type_id }) => request_type_id === typeIdx
      );
    }

    if (statusIdx !== -1) {
      histories = histories?.filter?.(({ status }) => status === statusIdx + 1);
    }

    if (interval) {
      histories = histories?.filter?.(({ datetime }) => {
        return isWithinInterval(new Date(datetime), {
          start: sub(new Date(), interval),
          end: new Date(),
        });
      });
    }

    return histories;
  }, [accountHistory, requestStatusIdx, periodbyIndex, requestTypeIdx]);

  const requestStatuses = useMemo(() => {
    return moneyRequestStatuses.map(({ id }) => `requestStatus${id}`);
  }, [moneyRequestStatuses]);

  useEffect(() => {
    const currencyids = activeCurrencies
      .filter(({ symbol }) => symbol !== "EUR")
      .map(({ id }) => Number(id));
    const toSubmit = {
      ...defaultValues,
      currencyids: JSON.stringify(currencyids),
      orderby: 1,
    };

    dispatch(fetchTransactionHistories(toSubmit));
  }, [activeCurrencies, defaultValues, dispatch]);

  const openFiltersModal = () => {
    dispatch(setOpenModal("activitieshistoryfilter"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  return (
    <div className="activities-history">
      <Form className="siteformui" autoComplete="off" noValidate>
        <Row className="tabcont tabcont-filterbar">
          <Col xs="auto">
            <CustomSelect
              size="sm"
              list={requestTypes}
              title={t("openorder:tradeType")}
              index={requestTypeIdx}
              setIndex={setRequestTypeIdx}
              namespace="finance"
            />
          </Col>
          <Col xs="auto">
            <CustomSelect
              size="sm"
              list={requestStatuses}
              title={t("openorder:tradeStatus")}
              index={requestStatusIdx}
              setIndex={setRequestStatusIdx}
              namespace="openorder"
            />
          </Col>
          <Col xs="auto">
            <ButtonGroupRadio
              list={periodBy}
              index={periodbyIndex}
              setIndex={setPeriodbyIndex}
            />
          </Col>
          <Col xs="auto">
            <Button variant="secondary" size="sm" onClick={openFiltersModal}>
              {t("openorder:detailedFilter")}
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="activitieshistorytable scrollbar" ref={tableCanvasRef}>
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="nmbr">
                {t("openorder:tradeNo")}
              </Table.Th>
              <Table.Th sizeauto className="date">
                {t("common:date")}
              </Table.Th>
              <Table.Th sizeauto className="type">
                {t("openorder:tradeType")}
              </Table.Th>
              <Table.Th sizeauto className="mthd">
                {t("common:method")}
              </Table.Th>
              <Table.Th sizeauto className="bank">
                {t("common:bank")}
              </Table.Th>
              <Table.Th sizefixed className="amnt">
                {t("common:amount")}
              </Table.Th>
              <Table.Th sizeauto className="txid">
                {t("openorder:reference")}
              </Table.Th>
              <Table.Th sizeauto className="stts">
                {t("common:status")}
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody
            striped
            hovered
            scrollbar
            scrollbarstyles={{ height: `${tableHeight - 36}px` }}
          >
            {visibleHistories.map(
              ({
                amount,
                currencysymbol,
                datetime,
                id,
                request_type_id,
                requesttype,
                requst_method_id,
                requstmethod,
                status,
              }) => {
                const typecls = classnames({
                  sitecolorgreen: request_type_id === 1,
                  sitecolorred: request_type_id === 2,
                });
                const statuscls = classnames({
                  sitecolorgreen: status === 4,
                  sitecolorred: status === 5,
                });
                const currency = findCurrencyBySymbol(currencysymbol);
                const { digit, digit_show } = currency;

                const requestType = t(
                  `openorder:requestType${request_type_id}`
                );
                const requestMethod = t(
                  `openorder:requestMethod${requst_method_id}`
                );
                const requestStatus = t(`openorder:requestStatus${status}`);

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
                      <span className={typecls}>{requestType}</span>
                    </Table.Td>
                    <Table.Td sizeauto className="mthd">
                      {requestMethod}
                    </Table.Td>
                    <Table.Td sizeauto className="bank">
                      ---
                    </Table.Td>
                    <Table.Td sizefixed className="amnt" title={amount}>
                      <NumberFormat
                        value={amount}
                        displayType={"text"}
                        thousandSeparator={true}
                        decimalScale={digit_show || digit}
                        fixedDecimalScale
                        suffix={` ${currencysymbol}`}
                      />
                    </Table.Td>
                    <Table.Td sizeauto className="txid">
                      ---
                    </Table.Td>
                    <Table.Td sizeauto className="stts">
                      <span className={statuscls} title={requestStatus}>
                        {requestStatus}
                      </span>
                    </Table.Td>
                  </Table.Tr>
                );
              }
            )}
          </Table.Tbody>
        </Table>
      </div>
      <ActivitiesHistoryFilter
        isOpen={openModal === "activitieshistoryfilter"}
        clearModals={clearOpenModals}
        defaultValues={defaultValues}
        isFetching={isFetching}
      />
    </div>
  );
};

export default memo(OpenOrderAccountActivitiesHistory);
