import React from "react";
import qs from "qs";
import { RouteComponentProps } from "react-router-dom";
import LoginPage from "./LoginPage";

function Login42Return({ location }: RouteComponentProps) {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  if (query.code === undefined) return <LoginPage></LoginPage>;
  // login with backend server

  return <div>{JSON.stringify(query)}</div>;
}

export default Login42Return;
