import { types } from "../types";

const initState = {
  filters: [],
  apps: [],
  active: null,
  totalPages: 0,
  currentPage: 1,
};

export const appReducer = (state = initState, actions) => {
  switch (actions.type) {
    case types.loadApps:
      return {
        ...state,
        apps: [...actions.payload.docs],
        totalPages: actions.payload.totalPages,
        currentPage: 1,
      };
    case types.refreshApps:
      return {
        ...state,
        apps: [...state.apps, ...actions.payload.docs],
        totalPages: actions.payload.totalPages,
        currentPage: actions.payload.currentPage,
      };
    case types.deleteApp:
      return {
        ...state,
        apps: state.apps.filter((app) => app._id !== actions.payload),
      };
    case types.updateApp:
      return {
        ...state,
        apps: state.apps.map((app) =>
          app._id === actions.payload._id ? actions.payload : app
        ),
      };
    case types.resetApps:
      return {
        ...state,
        apps: [],
        currentPage: 1,
      };
    case types.setActive:
      return {
        ...state,
        active: { ...actions.payload },
      };
    case types.unsetActive:
      return {
        ...state,
        active: null,
      };
    case types.loadFilters:
      return {
        ...state,
        filters: [...actions.payload],
      };
    case types.addFilter:
      return {
        ...state,
        filters: [actions.payload, ...state.filters],
      };

    default:
      return state;
  }
};
