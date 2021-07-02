import { Tooltip } from "reactstrap";
import classNames from "classnames";

export function TooltipResult(props) {

  const { className, error, warning, success, children, ...rest } = props;

  const tooltipResultClass = classNames("tooltip-result", className, {
    "tooltip-danger": Boolean(error),
    "tooltip-warning": Boolean(warning),
    "tooltip-success": Boolean(success),
  });

  const tooltipResult = (
    <Tooltip className={tooltipResultClass} placement="top" {...rest}>
      {children}
    </Tooltip>
  );

  return tooltipResult;
}
