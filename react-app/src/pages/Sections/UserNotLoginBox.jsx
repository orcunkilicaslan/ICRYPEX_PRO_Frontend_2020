import { memo } from "react";
import { useTranslation } from "react-i18next";

import { IconSet } from "~/components/IconSet.jsx";
import { Button } from "~/components/Button.jsx";

const UserNotLoginBox = props => {
  const { openSignupModal, openSigninModal, ...rest } = props;
  const { t } = useTranslation("notLoginBox", "common");

  return (
    <div className="usernotloginbox" {...rest}>
      <div className="usernotloginbox-content">
        <IconSet sprite="sprtlgclrd" size="50gray" name="close" />
        <h4>{t("cantview")}</h4>
        <p>{t("toview")}</p>
        <div className="contbtn">
          <Button
            size="sm"
            variant="secondary"
            className="active"
            onClick={openSigninModal}
          >
            {t("common:signin")}
          </Button>
          <Button size="sm" variant="success" onClick={openSignupModal}>
            {t("common:signup")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(UserNotLoginBox);
