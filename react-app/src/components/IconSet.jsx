import classNames from "classnames";

export const IconSet = props => {

  const {
    className,
    sprite,
    size,
    name,
    variant,
    children,
    ...rest
  } = props;

  const icncls = classNames(className, {
    [`${sprite}`]: Boolean(sprite),
    [`${size}`]: Boolean(size),
    [`${name}`]: Boolean(name),
    [`${variant}`]: Boolean(variant)
  });

  return (
  <i className={icncls} {...rest}>
    {children}
  </i>
  );

};
