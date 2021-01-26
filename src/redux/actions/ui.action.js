import { types } from "../types";

export const startLoading = () => ({
  type: types.startLoading,
});

export const finishLoading = () => ({
  type: types.finishLoading,
});
