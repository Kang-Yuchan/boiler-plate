import * as React from "react";
import Axios from "axios";

const LandingPage: React.FC = () => {
  React.useEffect(() => {
    Axios.get("http://localhost:8080/api/hello").then(response =>
      console.log(response)
    );
  }, []);
  return <div className='LandingPage'>LandingPage</div>;
};

export default LandingPage;
