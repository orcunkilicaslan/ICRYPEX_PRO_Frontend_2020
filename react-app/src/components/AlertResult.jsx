import { useTranslation } from "react-i18next";
import { Alert } from 'reactstrap';
import classNames from "classnames";

export function AlertResult(props) {

    const { t } = useTranslation("alertResult");

    const { className, success, warning, error, children, ...rest } = props;

    const alertResultClass = classNames("alert-sweet", className, {
        "alert-success": Boolean(success),
        "alert-warning": Boolean(warning),
        "alert-danger": Boolean(error),
    });

    const alertResult = (
        <Alert className={alertResultClass} {...rest}>
            <div className="alert-flex">
                <div className="alert-icon">
                    <div className="animation-alert-icons">
                        {success ? (
                            <div className="alert-icons alert-icons-success">
                                <div className="alert-icons-success-tip"></div>
                                <div className="alert-icons-success-long"></div>
                            </div>
                        ) : error ? (
                            <div className="alert-icons alert-icons-error">
                                <div className="alert-icons-error-x">
                                    <div className="alert-icons-error-x-left"></div>
                                    <div className="alert-icons-error-x-right"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="alert-icons alert-icons-warning">
                                <div className="alert-icons-warning-body"></div>
                                <div className="alert-icons-warning-dot"></div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="alert-desc">
                    {success ? (
                        <h6 className="alert-heading">{t("success")}</h6>
                    ) : error ? (
                        <h6 className="alert-heading">{t("error")}</h6>
                    ) : (
                        <h6 className="alert-heading">{t("warning")}</h6>
                    )}
                    <p>{children}</p>
                </div>
            </div>
        </Alert>
    );

    return alertResult;
}