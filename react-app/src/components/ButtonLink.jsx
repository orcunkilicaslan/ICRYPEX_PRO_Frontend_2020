import classNames from "classnames";
import { NavLink } from "react-router-dom";

export const ButtonLink = props => {
  const {
    className,
    href = "",
    title = "",
    size,
    variant,
    children,
    ...rest
  } = props;

  const cls = classNames("btn", className, {
    [`btn-${size}`]: Boolean(size),
    [`btn-${variant}`]: Boolean(variant),
  });

  return (
    <NavLink className={cls} to={href} title={title} {...rest}>
      {children}
    </NavLink>
  );
};
