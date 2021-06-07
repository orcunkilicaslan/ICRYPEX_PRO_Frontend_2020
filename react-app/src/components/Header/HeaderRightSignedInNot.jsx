import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LoginButtons } from "../LoginButtons";
import { setOpenModal } from "~/state/slices/ui.slice";
import { setUserEmail } from "~/state/slices/user.slice";
import {
  SigninModal,
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
  const [hasSentCode, setHasSentCode] = useState(false);
  const [forgotPassError, setForgotPassError] = useState(null);
  const [signupError, setSignupError] = useState(null);

  const countryPhoneCode = countryCodes?.map(
    ({ country_code }) => country_code
  );
  // moving code "90" to the front of the array
  const index = countryPhoneCode?.findIndex?.(el => el === "90");
  countryPhoneCode?.unshift?.(countryPhoneCode?.splice?.(index, 1)[0]);

  const openSignupModal = useCallback(() => {
    setSignupError(null);
    dispatch(setOpenModal("signup"));
  }, [dispatch]);

  const openSigninModal = useCallback(() => {
    setSigninError(null);
    dispatch(setOpenModal("signin"));
  }, [dispatch]);

  const openForgotPassConfirmModal = useCallback(() => {
    setForgotPassError(null);
    dispatch(setOpenModal("forgotpassword"));
  }, [dispatch]);

  const clearOpenModals = useCallback(() => {
    dispatch(setOpenModal("none"));
  }, [dispatch]);

  const setEmail = useCallback(
    email => {
      dispatch(setUserEmail(email));
    },
    [dispatch]
  );

  const submitSignup = useCallback(
    async data => {
      const { phoneno, countrycode, ...rest } = data;
      const payload = await onSignup({
        ...rest,
        phone: `${countrycode}${phoneno}`,
        mediumid: 1,
      });

      setSignupError(null);

      if (payload?.status) {
        openSigninModal();
        setHasSentCode(true);
      } else {
        setSignupError(payload?.errormessage);
      }
    },
    [onSignup, openSigninModal]
  );

  const submitVerify = useCallback(
    async data => {
      let payload;
      const { code } = data;
      setSigninError(null);

      if (user.loginType === 2) {
        payload = await onSignin2FA(code);
      } else {
        payload = await onSigninSMS(code);
      }

      if (!payload?.status) {
        setSigninError(payload?.errormessage);
      }
    },
    [onSignin2FA, onSigninSMS, user]
  );

  const submitSignin = useCallback(
    async data => {
      const payload = await onSignin(data);
      setSigninError(null);

      if (payload?.status) {
        setHasSentCode(true);
      } else {
        setSigninError(payload?.errormessage);
      }

      return payload;
    },
    [onSignin]
  );

  const submitForgotPassword = useCallback(
    async data => {
      const payload = await onForgotPassword(data);
      setForgotPassError(null);

      if (!payload?.status) {
        setForgotPassError(payload?.errormessage);
      }
    },
    [onForgotPassword]
  );

  return (
    <div className="header-right-notsignedin">
      <LoginButtons
        openSigninModal={openSigninModal}
        openSignupModal={openSignupModal}
      />
      <SigninModal
        isOpen={openModal === "signin"}
        handleSignin={submitSignin}
        handleVerify={submitVerify}
        user={user}
        clearModals={clearOpenModals}
        errorMessage={signinError}
        isSigningin={isSigningin}
        isVerifying={isVerifying}
        openForgotPassConfirmModal={openForgotPassConfirmModal}
        hasSentCode={hasSentCode}
        setEmail={setEmail}
        setHasSentCode={setHasSentCode}
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
