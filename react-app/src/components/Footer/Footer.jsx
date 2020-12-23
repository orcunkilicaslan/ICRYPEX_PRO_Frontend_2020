import classNames from "classnames";

import FooterLeft from "./FooterLeft.jsx";
import FooterRight from "./FooterRight.jsx";

export const Footer = props => {
  const { className } = props;

  return (
      <footer className={classNames("footer", className)}>
        <div className="container-fluid">
          <div className="row">

            <FooterLeft />
            <FooterRight/>

          </div>
        </div>
      </footer>
  );
};
