import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { setOpenModal } from "~/state/slices/ui.slice";
import { SettingsModal } from "../modals/";
import { fetchUserInfo } from "~/state/slices/user.slice";

const HeaderRightSignedIn = props => {
  const { user, onSignout } = props;
  const dispatch = useDispatch();
  const { openModal } = useSelector(state => state.ui);
  const isModalOpen = openModal === "settings";
  const arrowIconClass = classnames("siteiconsdropdown", {
    downdirection: !isModalOpen,
    updirection: isModalOpen,
  });

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  const toggleSettingsModal = () => {
    if (isModalOpen) clearOpenModals();
    else dispatch(setOpenModal("settings"));
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <div className="header-right-signedin pr-2">
      <Button className="useraccountarea" onClick={toggleSettingsModal}>
        <div className="useraccountarea-avatar rounded-pill">
          <IconSet sprite="sprtlgclrd" size="50gray" name="user" />
        </div>
        <h3 className="useraccountarea-name">
          {user?.info?.displayname || null}
        </h3>
        <i className={arrowIconClass}></i>
      </Button>
      <SettingsModal
        isOpen={isModalOpen}
        clearModals={clearOpenModals}
        User={user}
        onSignout={onSignout}
      />
    </div>
  );
};

export default HeaderRightSignedIn;
