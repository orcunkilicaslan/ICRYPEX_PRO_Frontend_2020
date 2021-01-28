import { useSelector } from "react-redux";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";

const HeaderRightSignedIn = props => {

  const User = useSelector(state => state.user);

  return (
      <div className="header-right-signedin pr-2">
        <Button className="useraccountarea">
          <div className="useraccountarea-avatar rounded-pill">
            <IconSet sprite="sprtlgclrd" size="50gray" name="user" />
          </div>
          <h3 className="useraccountarea-name">
            {User.firstname} {String(User.lastname).toUpperCase()}
          </h3>
          <i className="siteiconsdropdown downdirection"></i>
        </Button>
      </div>
  );
};

export default HeaderRightSignedIn;