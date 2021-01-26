import { types } from "../types";
import { showAlert } from "../../helpers/alerts";
import {
  fetchWithoutToken,
  fetchWithToken,
  fetchFormDataWithToken,
} from "../../helpers/fetch";
import { finishLoading, startLoading } from "./ui.action";

// Apps
export const startLoadApps = (
  type = "load",
  category = "todos",
  page = 1,
  limit = 6
) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const request = await fetchWithoutToken(
      `portfolio/apps/?limit=${limit}&page=${page}&category=${category}`
    );
    const body = await request.json();
    if (body.ok) {
      type === "load"
        ? dispatch(loadApps(body.apps.docs, body.apps.totalPages))
        : dispatch(refreshApps(body.apps.docs, body.apps.totalPages, page));
    }
    dispatch(finishLoading());
  };
};

export const startgetApp = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const request = await fetchWithoutToken(`portfolio/apps/${id}`);
    const body = await request.json();
    body.ok ? dispatch(setActive(body.app)) : showAlert("error", body.msg);
    dispatch(finishLoading());
    return body.ok;
  };
};

export const startCreateApp = (formData) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const request = await fetchFormDataWithToken(
      "portfolio/apps/",
      formData,
      "POST"
    );
    const body = await request.json();
    const { msg } = body;
    body.ok ? showAlert("success", msg) : showAlert("error", msg);
    dispatch(finishLoading());
  };
};

export const startUpdateApp = (app, id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const request = await fetchWithToken(
      `portfolio/apps/${id}`,
      { ...app },
      "PUT"
    );
    const body = await request.json();
    const { msg } = body;
    if (body.ok) {
      showAlert("success", msg);
      dispatch(setActive(body.app));
    } else {
      showAlert("error", msg);
    }
    dispatch(finishLoading());
  };
};

export const startUpdatePhoto = (formData) => {
  return async (dispatch) => {
    const request = await fetchFormDataWithToken(
      "portfolio/apps/photo/update",
      formData,
      "PUT"
    );
    const body = await request.json();
    if (body.ok) {
      dispatch(setActive(body.app));
      showAlert("success", body.msg);
    } else {
      showAlert("error", body.msg);
    }
  };
};

// Filters

export const startLoadFilters = () => {
  return async (dispatch) => {
    const request = await fetchWithoutToken("portfolio/filters/");
    const body = await request.json();
    body.ok && dispatch(loadFilter(body.filters));
  };
};

export const startCreateFilter = (filter) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const request = await fetchWithToken(
      "portfolio/filters/",
      { ...filter },
      "POST"
    );
    const body = await request.json();
    if (body.ok) {
      dispatch(addFilter(body.filter));
      showAlert("success", body.msg);
    } else {
      showAlert("error", body.msg);
    }
    dispatch(finishLoading());
  };
};

export const startDeleteApp = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const request = await fetchWithToken(`portfolio/apps/${id}`, {}, "DELETE");
    const { ok, msg } = await request.json();
    if (ok) {
      dispatch(deleteApp(id));
      showAlert("success", msg);
    } else {
      showAlert("error", msg);
    }
    dispatch(finishLoading());
  };
};

// Modifican directamente el estado de la aplicación

export const resetApps = () => ({
  type: types.resetApps,
});

export const setActive = (app) => ({
  type: types.setActive,
  payload: app,
});

const deleteApp = (id) => ({
  type: types.deleteApp,
  payload: id,
});

export const unsetActive = () => ({
  type: types.unsetActive,
});

const loadApps = (docs, totalPages) => ({
  type: types.loadApps,
  payload: {
    docs,
    totalPages,
  },
});

const refreshApps = (docs, totalPages, currentPage) => ({
  type: types.refreshApps,
  payload: {
    docs,
    totalPages,
    currentPage,
  },
});

const loadFilter = (filters) => ({
  type: types.loadFilters,
  payload: filters,
});

const addFilter = (filter) => ({
  type: types.addFilter,
  payload: filter,
});
