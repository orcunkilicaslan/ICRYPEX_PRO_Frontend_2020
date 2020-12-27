import classNames from "classnames";

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
    <a className={cls} href={href} title={title} rel="bookmark" {...rest}>
      {children}
    </a>
  );

};
