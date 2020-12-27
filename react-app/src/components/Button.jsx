import classNames from "classnames";

export const Button = props => {

  const {
    className,
    type = "button",
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
    <button className={cls} type={type} {...rest}>
      {children}
    </button>
  );

};
