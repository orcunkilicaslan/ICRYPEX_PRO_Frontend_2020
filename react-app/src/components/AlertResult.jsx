import { useTranslation } from "react-i18next";
import { Alert } from "reactstrap";
import classNames from "classnames";

export function AlertResult(props) {
  const { t } = useTranslation("alertResult");

  const { className, error, warning, success, children, ...rest } = props;

  const alertResultClass = classNames("alert-sweet", className, {
    "alert-danger": Boolean(error),
    "alert-warning": Boolean(warning),
    "alert-success": Boolean(success),
  });

  const alertResult = (
    <Alert className={alertResultClass} {...rest}>
      <div className="alert-flex">
        {error ? (
          <div className="alert-icon">
            <div className="animation-alert-icons">
              <div className="alert-icons alert-icons-error">
                <div className="alert-icons-error-x">
                  <div className="alert-icons-error-x-left"></div>
                  <div className="alert-icons-error-x-right"></div>
                </div>
              </div>
            </div>
          </div>
        ) : warning ? (
          <div className="alert-icon">
            <div className="animation-alert-icons">
              <div className="alert-icons alert-icons-warning">
                <div className="alert-icons-warning-body"></div>
                <div className="alert-icons-warning-dot"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="alert-icon">
            <div className="animation-alert-icons">
              <div className="alert-icons alert-icons-success">
                <div className="alert-icons-success-tip"></div>
                <div className="alert-icons-success-long"></div>
              </div>
            </div>
          </div>
        )}
        <div className="alert-desc">
          {error ? (
            <h6 className="alert-heading">{t("error")}</h6>
          ) : warning ? (
            <h6 className="alert-heading">{t("warning")}</h6>
          ) : (
            <h6 className="alert-heading">{t("success")}</h6>
          )}
          <p>{children}</p>
        </div>
      </div>
    </Alert>
  );

  return alertResult;
}
