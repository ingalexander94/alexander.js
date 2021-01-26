import { types } from "../types";

const initState = {
  loading: false,
};

export const uiReducer = (state = initState, actions) => {
  switch (actions.type) {
    case types.startLoading:
      return {
        ...state,
        loading: true,
      };

    case types.finishLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
