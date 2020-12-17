import classNames from "classnames";

import HeaderLeft from "./HeaderLeft";
import HeaderCenter from "./HeaderCenter";

export const Header = props => {
  const { className } = props;

  return (
    <header className={classNames("header", className)}>
      <div className="container-fluid">
        <div className="row">
          <HeaderLeft />
          <HeaderCenter />
        </div>
      </div>
    </header>
  );
};
