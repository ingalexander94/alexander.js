import { Redirect, Route, Switch } from "react-router-dom";
import { CrudApps } from "../private/CrudApps";
import { CrudService } from "../private/CrudService";
import { CrudSkills } from "../private/CrudSkills";

export const AdminRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/admin/add-apps">
          <CrudApps />
        </Route>
        <Route exact path="/admin/add-services">
          <CrudService />
        </Route>
        <Route exact path="/admin/add-skills">
          <CrudSkills />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </div>
  );
};
