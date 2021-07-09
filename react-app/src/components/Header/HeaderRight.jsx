import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";

import { LanguageButtons } from "../LanguageButtons.jsx";
// import HeaderRightTheme from "./HeaderRightTheme.jsx";
import HeaderRightIcons from "./HeaderRightIcons.jsx";
import HeaderRightSignedInNot from "./HeaderRightSignedInNot.jsx";
import HeaderRightSignedIn from "./HeaderRightSignedIn.jsx";
import {
  signupUser,
  signinUser,
  signoutUser,
  forgotPassword,
} from "~/state/slices/user.slice";
import { signinWithSms, signinWith2FA } from "~/state/slices/api.slice";

const HeaderRight = props => {
  const { setLanguage } = props;
  const dispatch = useDispatch();
  const User = useSelector(state => state.user);
  const { settings: Settings, accesstoken } = useSelector(state => state.api);
  const { lang: currentLanguage } = useSelector(state => state.ui);

  const onForgotPassword = useCallback(
    async data => {
      const { payload } = await dispatch(forgotPassword(data));

      return payload;
    },
    [dispatch]
  );

  const onSignup = useCallback(
    async data => {
      const { payload } = await dispatch(signupUser(data));

      return payload;
    },
    [dispatch]
  );

  const onSignin = useCallback(
    async data => {
      const { payload } = await dispatch(signinUser(data));

      return payload;
    },
    [dispatch]
  );

  const onSigninSMS = useCallback(
    async code => {
      const { payload } = await dispatch(signinWithSms(code));

      return payload;
    },
    [dispatch]
  );

  const onSignin2FA = useCallback(
    async code => {
      const { payload } = await dispatch(signinWith2FA(code));

      return payload;
    },
    [dispatch]
  );

  const onSignout = useCallback(async () => {
    const { payload } = await dispatch(signoutUser());

    return payload;
  }, [dispatch]);

  return (
    <Col xs="auto" className="header-right">
      <HeaderRightIcons />
      {accesstoken ? (
        <HeaderRightSignedIn user={User} onSignout={onSignout} />
      ) : (
        <HeaderRightSignedInNot
          user={User}
          countryCodes={Settings?.countryCodes}
          onSignup={onSignup}
          onSignin={onSignin}
          onSigninSMS={onSigninSMS}
          onSignin2FA={onSignin2FA}
          onForgotPassword={onForgotPassword}
        />
      )}
      <div className="header-right-lang">
        <LanguageButtons
          languages={Settings?.languages}
          currentLanguage={currentLanguage}
          setLanguage={setLanguage}
        />
      </div>
    </Col>
  );
};

export default HeaderRight;
