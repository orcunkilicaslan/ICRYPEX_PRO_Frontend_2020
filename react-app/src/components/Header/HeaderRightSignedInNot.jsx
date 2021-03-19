import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LoginButtons } from "../LoginButtons";
import { setOpenModal } from "~/state/slices/ui.slice";
import {
  SigninModal,
  VerifyModal,
  ForgotPassModal,
  SignupModal,
} from "../modals/";

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
    dispatch(setOpenModal("forgotpassconfirm"));
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
    const { status, errormessage } = await onSignup({
      ...rest,
      phone: `${countrycode}${phoneno}`,
      mediumid: 1,
    });

    if (status) {
      openVerifyModal();
    } else {
      setSignupError(errormessage);
    }
  };

  const submitVerify = async data => {
    let result;
    const { code } = data;
    setVerifyError(null);

    if (user?.logintype === 2) {
      result = await onSignin2FA(code);
    } else {
      result = await onSigninSMS(code);
    }

    const { status, errormessage } = result;

    if (!status) {
      setVerifyError(errormessage);
    }
  };

  const submitSignin = async data => {
    setSigninError(null);

    const { status, errormessage } = await onSignin(data);

    if (status) {
      setSigninError(null);
      openVerifyModal();
    } else {
      setSigninError(errormessage);
    }
  };

  const submitForgotPassword = async email => {
    setForgotPassError(null);

    const { status, errormessage } = await onForgotPassword({ email });

    if (status) {
      setForgotPassError(null);
    } else {
      setForgotPassError(errormessage);
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
      <ForgotPassModal
        isOpen={openModal === "forgotpassconfirm"}
        submit={submitForgotPassword}
        clearModals={clearOpenModals}
        errorMessage={forgotPassError}
        isResetingPassword={isResetingPassword}
        openSigninModal={openSigninModal}
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
