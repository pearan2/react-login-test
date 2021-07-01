//import React, { useEffect } from "react";

const LoginSelect = () => {
  const loginButtonOnClick = () => {
    window.location.href =
      "https://api.intra.42.fr/oauth/authorize?client_id=47fbd6cffe54e0178a6ed19e9e643aae0f9c09f761862d5d496166167597e803&redirect_uri=http%3A%2F%2F10.13.8.3%3A3000%2Flogin%2F42%2Freturn&response_type=code";
  };

  return (
    <div>
      <button onClick={loginButtonOnClick}>42 login</button>
    </div>
  );
};

export default LoginSelect;
