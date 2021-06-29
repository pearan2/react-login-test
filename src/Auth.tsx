import React from "react";
import { useCookies } from "react-cookie";
import LoginPage from "./LoginPage";

export default function withHocAuth<P extends Object>(
  InputCommponent: React.ComponentType<P>
): React.FC<P> {
  const Ret: React.FC<P> = props => {
    return <LoginPage></LoginPage>;
    return <InputCommponent {...(props as P)}></InputCommponent>;
  };
  return Ret;
}
