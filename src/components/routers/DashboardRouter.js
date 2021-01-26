import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  startLoadGoals,
  startLoadServices,
  startLoadSkill,
} from "../../redux/actions/about.action";
import { startLoadFilters } from "../../redux/actions/app.actions";
import { startLoadTestimonials } from "../../redux/actions/testimonial.action";
import { About } from "../pages/About";
import { AddReview } from "../pages/AddReview";
import { AppDetail } from "../pages/AppDetail";
import { Contact } from "../pages/Contact";
import { Home } from "../pages/Home";
import { Portfolio } from "../pages/Portfolio";
import { Services } from "../pages/Services";
import { Testimonials } from "../pages/Testimonials";
import { Navbar } from "../ui/Navbar";
import { AdminRouter } from "./AdminRouter";
import PrivateRouter from "./PrivateRouter";

export const DashboardRouter = ({ isAuthenticated }) => {
  // Hooks
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadServices());
    dispatch(startLoadSkill());
    dispatch(startLoadGoals());
    dispatch(startLoadTestimonials());
    dispatch(startLoadFilters());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div id="app-container">
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/services">
            <Services />
          </Route>
          <Route exact path="/testimonials">
            <Testimonials />
          </Route>
          <Route exact path="/about-me">
            <About />
          </Route>
          <Route exact path="/portfolio">
            <Portfolio />
          </Route>
          <Route exact path="/add-review/:token">
            <AddReview />
          </Route>
          <Route exact path="/detail-app/:id">
            <AppDetail />
          </Route>
          <PrivateRouter
            path="/admin"
            isAuthenticated={isAuthenticated}
            component={AdminRouter}
          />
          <Redirect to="/home" />
        </Switch>
      </div>
    </>
  );
};
