import classnames from "classnames";
import { ButtonGroup } from "reactstrap";
import { useTranslation } from "react-i18next";
import { nanoid } from "nanoid";
import { isObject } from "lodash";

import { Button } from "./Button";
import { toggleBit, isBitOn } from "~/util/";

const ButtonGroupCheckbox = props => {
  const {
    children,
    className,
    list,
    mask,
    setMask,
    buttonProps,
    namespace = "common",
    ...rest
  } = props;
  const { t } = useTranslation(namespace);
  const MASK = mask || "1".repeat(list.length);

  return (
    <ButtonGroup size="sm" className="w-100" {...rest}>
      {list?.map?.((item, idx) => {
        const cls = classnames({ active: isBitOn(MASK, idx) });

        return (
          <Button
            key={nanoid()}
            type="button"
            size="sm"
            className={cls}
            variant="secondary"
            onClick={() => {
              if (setMask) setMask(toggleBit(MASK, idx));
            }}
            {...buttonProps}
          >
            {isObject(item) ? t(item.name?.toLowerCase?.()) : item}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default ButtonGroupCheckbox;
