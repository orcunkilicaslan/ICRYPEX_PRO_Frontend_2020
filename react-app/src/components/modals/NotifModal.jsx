import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import { Button } from "../Button.jsx";
import AccordionCollapse from "~/components/AccordionCollapse.jsx";
import { formatDate } from "~/util/";

export default function NotifModal(props) {
  const {
    notifications,
    unread,
    isOpen,
    clearModals,
    onMarkRead,
    onMarkAllRead,
    ...rest
  } = props;
  const { lang: locale } = useSelector(state => state.ui);
  const [openIdx, setOpenIdx] = useState(-1);

  const onClickItem = idx => {
    if (idx === openIdx) setOpenIdx(-1);
    else setOpenIdx(idx);
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
      <ModalHeader toggle={clearModals}>BİLDİRİMLER</ModalHeader>
      <ModalBody className="modalcomp modalcomp-notif">
        {unread ? (
          <div className="headsmtitle">
            <div className="headsmtitle-col">
              <h6>{unread} Okunmamış Mesaj</h6>
            </div>
          </div>
        ) : null}
        <div className="modalcomp-notif-wrp modalcomp-psright">
          <AccordionCollapse scrollbar className="modalcomp-notif-list">
            {notifications.map((notification, index) => {
              const { id, title, message, datetime, isreaded } = notification;
              const isOpen = openIdx === index;

              return (
                <AccordionCollapse.Item
                  className={isreaded ? "notifread" : "notifnotread"}
                  // open={index === 1}
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
          {Boolean(unread) ? (
            <Button variant="danger" className="w-100" onClick={onMarkAllRead}>
              TÜMÜNÜ OKUNDU OLARAK İŞARETLE
            </Button>
          ) : null}
        </div>
      </ModalBody>
    </Modal>
  );
}
