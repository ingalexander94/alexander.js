import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { startIsAuth } from "../../redux/actions/auth.action";
import PublicRouter from "./PublicRouter";
import { Loading } from "../ui/Loading";
import { AuthRouter } from "./AuthRouter";
import { DashboardRouter } from "./DashboardRouter";

export const AppRouter = () => {
  // Hooks
  const dispatch = useDispatch();
  const { cheking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      dispatch(startIsAuth());
    }, 1000);
  }, [dispatch]);

  if (cheking) return <Loading />;

  return (
    <Router>
      <Switch>
        <PublicRouter
          path="/auth"
          isAuthenticated={!!uid}
          component={AuthRouter}
        />
        <Route path="/">
          <DashboardRouter isAuthenticated={!!uid} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
