import { Tooltip } from "reactstrap";
import classNames from "classnames";
import {NavLink} from "react-router-dom";

export function TooltipResult(props) {

  const { className, error, warning, success, children, ...rest } = props;

  const tooltipResultClass = classNames("tooltip-result", className, {
    "tooltip-danger": Boolean(error),
    "tooltip-warning": Boolean(warning),
    "tooltip-success": Boolean(success),
  });

  return (
      <Tooltip className={tooltipResultClass} placement="top" {...rest}>
        {children}
      </Tooltip>
  );
}
