import * as React from "react";
import styled from "styled-components";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../../../_reducer/user";

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    Axios.get("/hello").then(response => console.log(response));
  }, []);

  const onLogOut = React.useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    });
  }, []);

  return (
    <Main>
      LandingPage
      <button onClick={onLogOut}>Log out</button>
    </Main>
  );
};

export default LandingPage;
