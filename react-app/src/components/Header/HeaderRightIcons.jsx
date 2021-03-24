import { useDispatch, useSelector } from "react-redux";
import { UncontrolledTooltip, Badge } from "reactstrap";
import { useState, Fragment } from "react";
import { inRange, random } from "lodash";
import { produce } from "immer";
import uuid from "uuid";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { NotifModal } from "~/components/modals";
import { setOpenModal } from "~/state/slices/ui.slice";

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
                <Badge color={unreadCount ? "danger" : "secondary"} pill>
                  {unreadCount || 0}
                </Badge>
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
      <NotifModal
        notifications={notifs}
        unread={unreadCount}
        isOpen={openModal === "notifications"}
        clearModals={clearOpenModals}
        onMarkRead={onMarkRead}
        onMarkAllRead={onMarkAllRead}
      />
    </div>
  );
};

export default HeaderRightIcons;
