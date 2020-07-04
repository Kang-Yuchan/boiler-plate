import * as React from "react";
import { useDispatch } from "react-redux";
import { AUTH_REQUEST } from "../_reducer/user";

const Auth = (
  SpecificComponent: React.FC,
  option: boolean | null, // null: 아무나 출입 가능, true: 로그인한 유저만 출입 가능, false: 로그인한 유저는 출입 불가능
  adminRoute: boolean | null = null
) => {
  const AuthenticationCheck = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
      dispatch({
        type: AUTH_REQUEST
      });
    }, []);

    return <SpecificComponent />;
  };

  return AuthenticationCheck;
};

export default Auth;
