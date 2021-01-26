import { Redirect, Route, Switch } from "react-router-dom";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { NewPassword } from "../auth/NewPassword";
import { ForgotPassword } from "../auth/ForgotPassword";
import "../../styles/auth.css";

export const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/auth/login">
          <Login />
        </Route>
        <Route path="/auth/register">
          <Register />
        </Route>
        <Route path="/auth/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/auth/new-password/:token">
          <NewPassword />
        </Route>
        <Redirect to="/auth/login" />
      </Switch>
    </div>
  );
};
