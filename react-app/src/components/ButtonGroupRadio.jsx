import classnames from "classnames";
import { ButtonGroup } from "reactstrap";
import { useTranslation } from "react-i18next";
import { nanoid } from "nanoid";
import { isObject } from "lodash";

import { Button } from "./Button";

const ButtonGroupRadio = props => {
  const {
    children,
    className,
    list,
    index,
    setIndex,
    buttonProps,
    namespace = "common",
    ...rest
  } = props;
  const { t } = useTranslation(namespace);

  return (
    <ButtonGroup size="sm" className="w-100" {...rest}>
      {list?.map?.((item, idx) => {
        const cls = classnames({ active: idx === index });

        return (
          <Button
            key={nanoid()}
            type="button"
            size="sm"
            className={cls}
            variant="secondary"
            onClick={() => setIndex && setIndex(idx)}
            {...buttonProps}
          >
            {isObject(item) ? t(item.name?.toLowerCase?.()) : item}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default ButtonGroupRadio;
