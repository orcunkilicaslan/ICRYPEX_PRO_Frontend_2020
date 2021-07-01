import { forwardRef } from "react";
import { Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import { nanoid } from "@reduxjs/toolkit";
import { isObject } from "lodash";
import classNames from "classnames";

const CustomSelect = forwardRef((props, ref) => {
  const {
    className,
    size,
    list,
    title,
    index,
    setIndex,
    namespace = "common",
    dontTranslate = false,
    useID = false,
    prefix = "",
    ...rest
  } = props;
  const { t } = useTranslation(namespace);
  const cls = classNames("custom-select", className, {
    [`custom-select-${size}`]: Boolean(size),
  });

  const getLabel = item => {
    if (dontTranslate) return item;
    else if (isObject(item)) {
      if (useID && prefix) return t(`${prefix}${item.id}`);
      return t(item.name);
    } else return t(item);
  };

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
            {getLabel(item)}
          </option>
        );
      })}
    </Input>
  );
});

export default CustomSelect;
