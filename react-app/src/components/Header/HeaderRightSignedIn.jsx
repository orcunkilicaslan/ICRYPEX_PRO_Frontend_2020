import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { setOpenModal } from "~/state/slices/ui.slice";
import { SettingsModal } from "../modals/";

const HeaderRightSignedIn = props => {
  const { user, onSignout } = props;
  const dispatch = useDispatch();
  const { openModal } = useSelector(state => state.ui);

  const openSettingsModal = () => {
    dispatch(setOpenModal("settings"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  return (
    <div className="header-right-signedin pr-2">
      <Button className="useraccountarea" onClick={openSettingsModal}>
        <div className="useraccountarea-avatar rounded-pill">
          <IconSet sprite="sprtlgclrd" size="50gray" name="user" />
        </div>
        <h3 className="useraccountarea-name">
          {user?.info?.displayname || null}
        </h3>
        <i className="siteiconsdropdown downdirection"></i>
      </Button>
      <SettingsModal
        isOpen={openModal === "settings"}
        clearModals={clearOpenModals}
        User={user}
        onSignout={onSignout}
      />
    </div>
  );
};

export default HeaderRightSignedIn;
