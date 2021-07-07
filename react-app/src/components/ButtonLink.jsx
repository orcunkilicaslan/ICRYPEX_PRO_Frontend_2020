import classNames from "classnames";
import { NavLink } from "react-router-dom";

export const ButtonLink = props => {
  const { className, title = "", size, variant, children, ...rest } = props;

  const cls = classNames("btn", className, {
    [`btn-${size}`]: Boolean(size),
    [`btn-${variant}`]: Boolean(variant),
  });

  return (
    <NavLink className={cls} title={title} {...rest}>
      {children}
    </NavLink>
  );
};
