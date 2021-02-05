import { useTranslation } from "react-i18next";
import { IconSet } from "~/components/IconSet.jsx";
import { Button } from "~/components/Button.jsx";

const UserNotLoginBox = props => {

    const { openSignupModal, openSigninModal, ...rest } = props;
    const { t } = useTranslation("common");

    return (
        <div className="usernotloginbox">
            <div className="usernotloginbox-content">
                <IconSet sprite="sprtlgclrd" size="50gray" name="close" />
                <h4>Bu Alanı Görüntüleyemiyorsunuz</h4>
                <p>Görüntüleyebilmeniz için Üye Girişi yada Kayıt Olun.</p>
                <div className="contbtn">
                    <Button size="sm" variant="secondary" className="active" onClick={openSigninModal}>
                        {t("signin")}
                    </Button>
                    <Button size="sm" variant="success" onClick={openSignupModal}>
                        {t("signup")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserNotLoginBox;