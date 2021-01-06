import classNames from "classnames";

export const IconSet = props => {
  const { className, sprite, size, name, children, ...rest } = props;

  const cls = classNames(className, {
    [`icon-${sprite}`]: Boolean(sprite),
    [`icon-${size}`]: Boolean(size),
    [`icon-${name}`]: Boolean(name),
  });

  return (
    <i className={cls} {...rest}>
      {children}
    </i>
  );
};
