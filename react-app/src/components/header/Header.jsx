import classNames from "classnames";

import HeaderLeft from "./HeaderLeft.jsx";
import HeaderCenter from "./HeaderCenter.jsx";
import HeaderRight from "./HeaderRight.jsx";

export const Header = props => {
  const { className } = props;

  return (
    <header className={classNames("header", className)}>
      <div className="container-fluid">
        <div className="row">
          <HeaderLeft />
          <HeaderCenter />
          <HeaderRight />
        </div>
      </div>
    </header>
  );
};
