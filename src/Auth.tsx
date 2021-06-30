import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import LoginPage from "./LoginPage";
import { useAsync } from "react-async";

async function isLogin({ jwtToken }: any) {
  const headers = {
    Authorization: "bearer " + jwtToken
  };

  const response = await axios.get("http://10.13.7.3:4000/auth/isLogined", {
    headers: headers
  });

  return response.data;
}

export default function withHocAuth<P extends Object>(
  InputCommponent: React.ComponentType<P>
): React.FC<P> {
  const Ret: React.FC<P> = props => {
    const [cookies] = useCookies(["jwtToken"]);

    const { data, error, isLoading } = useAsync({
      promiseFn: isLogin,
      jwtToken: cookies.jwtToken
    });

    if (cookies === undefined || cookies.jwtToken === undefined)
      return <LoginPage></LoginPage>;

    if (isLoading) return <div>Loading...</div>;
    if (error) {
      console.log(error);
      return <LoginPage></LoginPage>;
    }
    if (!data) return null;

    if (data !== true) return <LoginPage></LoginPage>;

    return <InputCommponent {...(props as P)}></InputCommponent>;
  };
  return Ret;
}
