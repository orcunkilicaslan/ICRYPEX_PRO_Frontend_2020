import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LoginButtons } from "../LoginButtons";
import { setOpenModal } from "~/state/slices/ui.slice";
import {
  SigninModal,
  VerifyModal,
  SignupModal,
  ForgotPasswordModal,
} from "~/components/modals/";

const HeaderRightSignedInNot = props => {
  const dispatch = useDispatch();
  const {
    user,
    countryCodes,
    onSignup,
    onSignin,
    onSigninSMS,
    onForgotPassword,
    onSignin2FA,
  } = props;
  const {
    openModal,
    isSigningin,
    isSigningup,
    isVerifying,
    isResetingPassword,
  } = useSelector(state => state.ui);

  const [signinError, setSigninError] = useState(null);
  const [verifyError, setVerifyError] = useState(null);
  const [forgotPassError, setForgotPassError] = useState(null);
  const [signupError, setSignupError] = useState(null);

  const countryPhoneCode = countryCodes?.map(
    ({ country_code }) => country_code
  );
  // moving code "90" to the front of the array
  const index = countryPhoneCode.findIndex(el => el === "90");
  countryPhoneCode.unshift(countryPhoneCode.splice(index, 1)[0]);

  const openSignupModal = () => {
    setSignupError(null);
    dispatch(setOpenModal("signup"));
  };

  const openSigninModal = () => {
    setSigninError(null);
    dispatch(setOpenModal("signin"));
  };

  const openForgotPassConfirmModal = () => {
    setForgotPassError(null);
    dispatch(setOpenModal("forgotpassword"));
  };

  const openVerifyModal = () => {
    setVerifyError(null);
    dispatch(setOpenModal("verify"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  const submitSignup = async data => {
    setSignupError(null);
    const { phoneno, countrycode, ...rest } = data;
    const payload = await onSignup({
      ...rest,
      phone: `${countrycode}${phoneno}`,
      mediumid: 1,
    });

    if (payload?.status) {
      openVerifyModal();
    } else {
      setSignupError(payload?.errormessage);
    }
  };

  const submitVerify = async data => {
    let payload;
    const { code } = data;
    setVerifyError(null);

    if (user?.logintype === 2) {
      payload = await onSignin2FA(code);
    } else {
      payload = await onSigninSMS(code);
    }

    if (!payload?.status) {
      setVerifyError(payload?.errormessage);
    }
  };

  const submitSignin = async data => {
    setSigninError(null);
    const payload = await onSignin(data);

    if (payload?.status) {
      setSigninError(null);
      openVerifyModal();
    } else {
      setSigninError(payload?.errormessage);
    }
  };

  const submitForgotPassword = async data => {
    setForgotPassError(null);
    const payload = await onForgotPassword(data);

    if (payload?.status) {
      setForgotPassError(null);
    } else {
      setForgotPassError(payload?.errormessage);
    }
  };

  return (
    <div className="header-right-notsignedin">
      <LoginButtons
        openSigninModal={openSigninModal}
        openSignupModal={openSignupModal}
      />
      <SigninModal
        isOpen={openModal === "signin"}
        submit={submitSignin}
        userEmail={user?.info?.email}
        clearModals={clearOpenModals}
        errorMessage={signinError}
        isSigningin={isSigningin}
        openForgotPassConfirmModal={openForgotPassConfirmModal}
      />
      <VerifyModal
        isOpen={openModal === "verify"}
        submit={submitVerify}
        clearModals={clearOpenModals}
        errorMessage={verifyError}
        isVerifying={isVerifying}
      />
      <ForgotPasswordModal
        isOpen={openModal === "forgotpassword"}
        submit={submitForgotPassword}
        clearModals={clearOpenModals}
        errorMessage={forgotPassError}
        isResetingPassword={isResetingPassword}
        openSigninModal={openSigninModal}
        userEmail={user?.info?.email}
      />
      <SignupModal
        isOpen={openModal === "signup"}
        submit={submitSignup}
        clearModals={clearOpenModals}
        errorMessage={signupError}
        isSigningup={isSigningup}
        countryPhoneCode={countryPhoneCode}
      />
    </div>
  );
};

export default HeaderRightSignedInNot;
