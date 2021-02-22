import { ButtonGroup } from "reactstrap";
import { useTranslation } from "react-i18next";

import { Button } from "./Button";

export const LoginButtons = props => {
  const { openSignupModal, openSigninModal, ...rest } = props;
  const { t } = useTranslation(["login"]);

  return (
    <ButtonGroup {...rest}>
      <Button size="sm" variant="secondary" onClick={openSigninModal}>
        {t("signin")}
      </Button>
      <Button size="sm" variant="success" onClick={openSignupModal}>
        {t("signup")}
      </Button>
    </ButtonGroup>
  );
};
