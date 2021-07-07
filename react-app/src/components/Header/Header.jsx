import { useCallback } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";

import { setLanguage } from "~/state/slices/ui.slice";
import HeaderLeft from "./HeaderLeft.jsx";
import HeaderCenter from "./HeaderCenter.jsx";
import HeaderRight from "./HeaderRight.jsx";
import { getLocalePath } from "~/routes";

const Header = props => {
  const { className } = props;
  const dispatch = useDispatch();

  const changeLanguage = useCallback(
    async lang => {
      await dispatch(setLanguage(lang));

      const newPath = getLocalePath(window.location.pathname, lang);

      if (newPath) window.location.pathname = newPath;
    },
    [dispatch]
  );

  return (
    <header className={classNames("header", className)}>
      <div className="container-fluid">
        <div className="row">
          <HeaderLeft />
          <HeaderCenter />
          <HeaderRight setLanguage={changeLanguage} />
        </div>
      </div>
    </header>
  );
};

export default Header;
