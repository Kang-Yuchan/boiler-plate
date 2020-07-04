import * as React from "react";
import styled from "styled-components";
import Axios from "axios";

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const LandingPage: React.FC = () => {
  React.useEffect(() => {
    Axios.get("http://localhost:8080/api/hello").then(response =>
      console.log(response)
    );
  }, []);
  return <Main>LandingPage</Main>;
};

export default LandingPage;
