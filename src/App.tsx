import Home from "./Home";
import { Route } from "react-router-dom";
import Login42Return from "./42LoginReturn";

const App = () => {
  return (
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/login/42/return/" component={Login42Return} />
    </div>
  );
};

export default App;
