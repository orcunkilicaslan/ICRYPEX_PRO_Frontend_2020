import { useDispatch, useSelector } from "react-redux";
import {
  UncontrolledTooltip,
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useState, Fragment } from "react";
import { inRange, random } from "lodash";
import { produce } from "immer";
import uuid from "uuid";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import AccordionCollapse from "~/components/AccordionCollapse.jsx";
import { setOpenModal } from "~/state/slices/ui.slice";
import { formatDate } from "~/util/";

const NOTIFICATIONS = Array.from({ length: 25 }, () => ({
  id: uuid(),
  title: "Gentle Reminder ：BTC Halving",
  message:
    "3NzYxpmhDGc6dhaXwZB4t2KUhUECy2 no’lu BTC adresine 0.19500000 BTC tutarında onaylanmamış giriş olmuştur.",
  datetime: Date.now(),
  isreaded: random(1),
}));

const HeaderRightIcons = props => {
  const dispatch = useDispatch();
  const { accesstoken } = useSelector(state => state.api);
  const { openModal } = useSelector(state => state.ui);
  const { lang: locale } = useSelector(state => state.ui);
  const [openIdx, setOpenIdx] = useState(-1);
  const [{ data: notifs, unread: unreadCount }, setNotifs] = useState({
    data: NOTIFICATIONS,
    unread: NOTIFICATIONS.filter(({ isreaded }) => !isreaded).length,
  });

  const openNotificationsModal = () => {
    dispatch(setOpenModal("notifications"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  const onMarkRead = idx => {
    if (inRange(idx, 0, notifs.length)) {
      setNotifs(prev => {
        const data = produce(prev.data, draft => {
          draft[idx].isreaded = true;
        });
        const unread = data.filter(({ isreaded }) => !isreaded).length;

        return { data, unread };
      });
    }
  };

  const onMarkAllRead = () => {
    setNotifs(prev => {
      const data = produce(prev.data, draft => {
        draft.forEach(item => {
          item.isreaded = true;
        });
      });

      return { data, unread: 0 };
    });
  };

  const onClickItem = idx => {
    if (idx === openIdx) setOpenIdx(-1);
    else setOpenIdx(idx);
  };

  return (
    <div className="header-right-icons">
      <Button
        className="headsignedinicon fullscreen"
        data-toggle="fullscreenbtn"
      >
        <IconSet sprite="sprtsmclrd" size="20" name="pagefullscreen" />
      </Button>
      {accesstoken ? (
        <Fragment>
          <Button className="headsignedinicon support">
            <IconSet sprite="sprtsmclrd" size="20" name="support" />
          </Button>
          <Button
            className="headsignedinicon notif"
            onClick={openNotificationsModal}
          >
            <span id="headTooltipNotif">
              <IconSet sprite="sprtsmclrd" size="20" name="notif">
                {Boolean(unreadCount) ? (
                  <Badge color="danger" pill>
                    {unreadCount}
                  </Badge>
                ) : null}
              </IconSet>
            </span>
            {Boolean(unreadCount) ? (
              <UncontrolledTooltip placement="bottom" target="headTooltipNotif">
                {unreadCount} Yeni Bildiriminiz Var
              </UncontrolledTooltip>
            ) : null}
          </Button>
        </Fragment>
      ) : null}
      <Modal
        wrapClassName=""
        modalClassName="modal-rightside"
        size="sm"
        isOpen={openModal === "notifications"}
        toggle={clearOpenModals}
        keyboard={false}
        fade={false}
        autoFocus={false}
        backdrop="static"
      >
        <ModalHeader toggle={clearOpenModals}>BİLDİRİMLER</ModalHeader>
        <ModalBody className="modalcomp modalcomp-notif">
          {unreadCount ? (
            <div className="headsmtitle">
              <div className="headsmtitle-col">
                <h6>{unreadCount} Okunmamış Mesaj</h6>
              </div>
            </div>
          ) : null}
          <div className="modalcomp-notif-wrp modalcomp-psright">
            <AccordionCollapse scrollbar className="modalcomp-notif-list">
              {notifs.map((notification, index) => {
                const { id, title, message, datetime, isreaded } = notification;
                const isOpen = openIdx === index;

                return (
                  <AccordionCollapse.Item
                    className={isreaded ? "notifread" : "notifnotread"}
                    open={index === 1}
                    key={id}
                  >
                    <AccordionCollapse.Head
                      onClick={() => onClickItem(index)}
                      aria-expanded={isOpen ? "true" : "false"}
                    >
                      {title}
                    </AccordionCollapse.Head>
                    <AccordionCollapse.Body isOpen={isOpen}>
                      <p>{message}</p>
                      <div className="collapsefoot">
                        <span className="collapsefoot-date">
                          {formatDate(datetime, "dd MMM yyyy HH:mm", {
                            locale,
                          })}
                        </span>
                        {Boolean(isreaded) ? null : (
                          <Button
                            className="collapsefoot-btn"
                            size="sm"
                            onClick={() => onMarkRead(index)}
                          >
                            Okundu Olarak İşaretle
                          </Button>
                        )}
                      </div>
                    </AccordionCollapse.Body>
                  </AccordionCollapse.Item>
                );
              })}
            </AccordionCollapse>
          </div>
          <div className="footbtns">
            {Boolean(unreadCount) ? (
              <Button
                variant="danger"
                className="w-100"
                onClick={onMarkAllRead}
              >
                TÜMÜNÜ OKUNDU OLARAK İŞARETLE
              </Button>
            ) : null}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default HeaderRightIcons;
