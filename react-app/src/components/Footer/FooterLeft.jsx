import { useTranslation } from "react-i18next";

const FooterLeft = props => {
  const { t } = useTranslation(["app"]);

  return (
    <div className="col">
      {t("rightsReserved")} © 2018-{new Date().getFullYear()} {t("companyName")}
    </div>
  );
};

export default FooterLeft;
