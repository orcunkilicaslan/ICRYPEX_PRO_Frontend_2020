import classNames from "classnames";
import { connect } from "react-redux";
import { setLanguage } from "../../state/ui.slice";

import HeaderLeft from "./HeaderLeft.jsx";
import HeaderCenter from "./HeaderCenter.jsx";
import HeaderRight from "./HeaderRight.jsx";

const Header = props => {
  const { className, setLanguage } = props;

  return (
    <header className={classNames("header", className)}>
      <div className="container-fluid">
        <div className="row">
          <HeaderLeft />
          <HeaderCenter />
          <HeaderRight setLanguage={setLanguage} />
        </div>
      </div>
    </header>
  );
};

export default connect(null, { setLanguage })(Header);
