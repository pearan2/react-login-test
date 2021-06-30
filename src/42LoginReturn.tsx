import qs from "qs";
import { RouteComponentProps } from "react-router-dom";
import { useAsync } from "react-async";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

async function tryLogin({ code }: any) {
  const response = await axios.post("http://10.13.7.3:4000/auth/login", {
    loginType: "42",
    code: code
  });
  return response.data;
}

function Login42Return({ location }: RouteComponentProps) {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const [cookie, setCookie] = useCookies(["jwtToken"]);

  const { data, error, isLoading } = useAsync({
    promiseFn: tryLogin,
    code: query.code
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!data) return null;

  const date = new Date();
  date.setDate(date.getMinutes() + 60);
  setCookie("jwtToken", data.access_token, { path: "/", expires: date });

  return <Redirect to="/" />;
}

export default Login42Return;
