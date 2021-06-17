import { forwardRef } from "react";
import { Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import { nanoid } from "@reduxjs/toolkit";
import { isObject } from "lodash";
import classNames from "classnames";

const CustomSelect = forwardRef((props, ref) => {
  const {
    children,
    className,
    size,
    list,
    title,
    index,
    setIndex,
    buttonProps,
    namespace = "common",
    ...rest
  } = props;

  const cls = classNames("custom-select", className, {
    [`custom-select-${size}`]: Boolean(size),
  });

  const { t } = useTranslation(namespace);

  return (
    <Input
      className={cls}
      type="select"
      onChange={evt => setIndex && setIndex(parseInt(evt?.target?.value, 10))}
      value={index}
      innerRef={ref}
      {...rest}
    >
      {title && <option value={-1}>{title}</option>}
      {list?.map?.((item, idx) => {
        return (
          <option value={item?.id ? item.id : idx} key={nanoid()}>
            {isObject(item) ? t(item?.name) : t(item)}
          </option>
        );
      })}
    </Input>
  );
});

export default CustomSelect;
