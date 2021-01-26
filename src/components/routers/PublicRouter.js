import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const PublicRouter = ({ isAuthenticated, component: Component, ...res }) => {
  return (
    <Route
      {...res}
      component={(props) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/admin" />
      }
    />
  );
};

PublicRouter.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default PublicRouter;
