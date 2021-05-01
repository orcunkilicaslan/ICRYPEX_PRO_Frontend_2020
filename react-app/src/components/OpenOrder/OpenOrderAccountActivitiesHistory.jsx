import { useState, useMemo, useEffect, memo } from "react";
import { Row, Col, Form } from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { sub, isWithinInterval } from "date-fns";

import { Button } from "../Button.jsx";
import Table from "../Table.jsx";
import { useClientRect, useCurrencies } from "~/state/hooks/";
import { fetchTransactionHistories } from "~/state/slices/transaction.slice";
import { formatDate, formatDateDistance } from "~/util/";
import { ActivitiesHistoryFilter } from "~/components/modals/";
import { setOpenModal } from "~/state/slices/ui.slice";
import ButtonGroupRadio from "~/components/ButtonGroupRadio";
import CustomSelect from "~/components/CustomSelect";

const periodBy = [
  { name: "1G", duration: { days: 1 } },
  { name: "1H", duration: { weeks: 1 } },
  { name: "2H", duration: { weeks: 2 } },
  { name: "1A", duration: { months: 1 } },
  { name: "3A", duration: { months: 3 } },
];

const OpenOrderAccountActivitiesHistory = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "app"]);
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const { activeCurrencies } = useCurrencies();
  const { lang, openModal } = useSelector(state => state.ui);
  const accountHistory = useSelector(state => state.transaction.histories);
  const isFetching = useSelector(
    state => state.transaction.isFetchingHistories
  );
  const requestTypes = useSelector(
    state => state.api.settings?.moneyRequestTypes
  );
  const orderStatuses = useSelector(state => state.api.settings?.orderStatuses);
  const [periodbyIndex, setPeriodbyIndex] = useState(0);
  const [requestTypeIdx, setRequestTypeIdx] = useState(-1);
  const [orderStatusIdx, setOrderStatusIdx] = useState(-1);

  const defaultValues = useMemo(() => {
    const today = formatDate(new Date(), "yyyy-MM-dd", { locale: lang });
    const threeMonthsAgo = formatDate(
      sub(new Date(), { months: 3 }),
      "yyyy-MM-dd",
      { locale: lang }
    );

    return {
      currencyids: [],
      orderby: 1,
      isdeposit: true,
      iswithdraw: true,
      isrealized: true,
      iscanceled: true,
      startdate: threeMonthsAgo,
      enddate: today,
    };
  }, [lang]);

  const visibleHistories = useMemo(() => {
    let histories = accountHistory;
    const interval = periodBy[periodbyIndex]?.duration;
    const typeIdx = parseInt(requestTypeIdx, 10);
    const statusIdx = parseInt(orderStatusIdx, 10);

    if (typeIdx !== -1) {
      histories = histories?.filter?.(
        ({ request_type_id }) => request_type_id === typeIdx
      );
    }

    if (statusIdx !== -1) {
      histories = histories?.filter?.(({ status }) => status === statusIdx);
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
  }, [accountHistory, orderStatusIdx, periodbyIndex, requestTypeIdx]);

  useEffect(() => {
    const currencyids = activeCurrencies
      .filter(({ symbol }) => symbol !== "EUR")
      .map(({ id }) => Number(id));
    const toSubmit = {
      ...defaultValues,
      currencyids: JSON.stringify(currencyids),
    };

    dispatch(fetchTransactionHistories(toSubmit));
  }, [activeCurrencies, defaultValues, dispatch]);

  const openFiltersModal = () => {
    dispatch(setOpenModal("activitieshistoryfilter"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  const getOrderStatusText = (statusId = 1) => {
    const status = orderStatuses?.find?.(({ id }) => id === statusId);
    const key = status?.name?.toLowerCase?.();

    return t(`app:${key}`);
  };

  return (
    <div className="activities-history">
      <Form className="siteformui" autoComplete="off" noValidate>
        <Row className="tabcont tabcont-filterbar">
          <Col xs="auto">
            <CustomSelect
              list={requestTypes}
              title={"İşlem Tipi"}
              index={requestTypeIdx}
              setIndex={setRequestTypeIdx}
              namespace="finance"
            />
          </Col>
          <Col xs="auto">
            <CustomSelect
                list={orderStatuses}
                namespace="app"
                title={"İşlem Durumu"}
                index={orderStatusIdx}
                setIndex={setOrderStatusIdx}
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
              Detaylı Filtreleme
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="activitieshistorytable scrollbar" ref={tableCanvasRef}>
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
              <Table.Th sizeauto className="txid">
                Referans Kodu / TX ID
              </Table.Th>
              <Table.Th sizeauto className="stts">
                Durum
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
                      ---
                    </Table.Td>
                    <Table.Td sizefixed className="amnt">
                      {amount} {currencysymbol}
                    </Table.Td>
                    <Table.Td sizeauto className="txid">
                      ---
                    </Table.Td>
                    <Table.Td sizeauto className="stts">
                      <span className={statuscls}>
                        {getOrderStatusText(status)}
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
