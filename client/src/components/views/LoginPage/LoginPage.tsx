import * as React from "react";
import { Main } from "../LandingPage/LandingPage";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { LOG_IN_REQUEST } from "../../../_reducer/user";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export type UseInputType = [string, (e: React.FormEvent<EventTarget>) => void];

export const useInput = (initialValue: string): UseInputType => {
  const [value, setter] = React.useState<string>(initialValue);
  const handler = React.useCallback((e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    setter(target.value);
  }, []);
  return [value, handler];
};

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail]: UseInputType = useInput("");
  const [password, onChangePassword]: UseInputType = useInput("");

  const onSubmitForm = React.useCallback(
    (e: React.FormEvent<EventTarget>): void => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          email,
          password
        }
      });
    },
    [email, password]
  );

  return (
    <Main>
      <Form onSubmit={onSubmitForm}>
        <label>Email</label>
        <input type='email' value={email} onChange={onChangeEmail} />
        <label>Password</label>
        <input type='password' value={password} onChange={onChangePassword} />
        <br />
        <button>Login</button>
      </Form>
    </Main>
  );
};

export default LoginPage;
