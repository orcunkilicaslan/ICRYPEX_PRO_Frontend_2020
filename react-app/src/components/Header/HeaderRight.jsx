import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LanguageButtons } from "../LanguageButtons.jsx";
import HeaderRightTheme from "./HeaderRightTheme.jsx";
import HeaderRightIcons from "./HeaderRightIcons.jsx";
// import HeaderRightSignedInNot from "./HeaderRightSignedInNot.jsx";
import HeaderRightSignedIn from "./HeaderRightSignedIn.jsx";
import {
  signupUser,
  signinUser,
  signoutUser,
  fetchUserInfo,
} from "~/state/slices/user.slice";
import { signinWithSms } from "~/state/slices/api.slice";

const HeaderRight = props => {
  const { setLanguage } = props;
  const dispatch = useDispatch();
  const User = useSelector(state => state.user);
  const { settings: Settings, accesstoken } = useSelector(state => state.api);
  const { lang: currentLanguage } = useSelector(state => state.ui);

  useEffect(() => {
    if (accesstoken) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, accesstoken]);

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

  const onSignout = useCallback(async () => {
    const { payload } = await dispatch(signoutUser());

    return payload;
  }, [dispatch]);

  return (
    <div className="header-right col-auto">
      <HeaderRightTheme />
      <HeaderRightIcons />
      {accesstoken ? (
        <HeaderRightSignedIn
          user={User}
          settings={Settings}
          onSignout={onSignout}
        />
      ) : (
        <HeaderRightSignedInNot
          user={User}
          countryCodes={Settings?.countryCodes}
          onSignup={onSignup}
          onSignin={onSignin}
          onSigninSMS={onSigninSMS}
        />
      )}
      <div className="header-right-lang">
        <LanguageButtons
          languages={Settings?.languages}
          currentLanguage={currentLanguage}
          setLanguage={setLanguage}
        />
      </div>
    </div>
  );
};

export default HeaderRight;
