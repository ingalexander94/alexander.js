import thunk from "redux-thunk";
import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import { aboutReducer } from "./reducers/about.reducer";
import { appReducer } from "./reducers/app.reducer";
import { authReducer } from "./reducers/auth.reducer";
import { testimonialReducer } from "./reducers/testimonial.reducer";
import { uiReducer } from "./reducers/ui.reducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  about: aboutReducer,
  testimonials: testimonialReducer,
  apps: appReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
