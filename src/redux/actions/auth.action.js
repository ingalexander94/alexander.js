import { types } from "../types";
import { showAlert } from "../../helpers/alerts";
import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";
import { finishLoading, startLoading } from "./ui.action";

export const startIsAuth = () => {
  return async (dispatch) => {
    try {
      const request = await fetchWithToken("auth/renew");
      const body = await request.json();
      if (body.ok) {
        const { uid, name, token } = body;
        localStorage.setItem("token", token);
        dispatch(login({ uid, name }));
      } else {
        dispatch(finishCheking());
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const startCreateUser = ({ name, email, password }) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const request = await fetchWithoutToken(
      "auth/register",
      { name, email, password },
      "POST"
    );
    const body = await request.json();
    if (body.ok) {
      const { uid, msg, name, token } = body;
      localStorage.setItem("token", token);
      dispatch(login({ uid, name }));
      showAlert("success", msg);
    } else {
      showAlert("error", body.msg);
    }
    dispatch(finishLoading());
  };
};

export const startLogin = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const request = await fetchWithoutToken(
      "auth/login",
      { email, password },
      "POST"
    );
    const body = await request.json();
    if (body.ok) {
      const { uid, msg, name, token } = body;
      localStorage.setItem("token", token);
      dispatch(login({ uid, name }));
      showAlert("success", msg);
    } else {
      showAlert("error", body.msg);
    }
    dispatch(finishLoading());
  };
};

export const startLogout = () => {
  return (dispath) => {
    localStorage.clear();
    dispath(logout());
  };
};

// Modifican directamente el estado de la aplicación

const login = (payload) => ({
  type: types.login,
  payload,
});

const finishCheking = () => ({
  type: types.finishCheking,
});

const logout = () => ({
  type: types.logout,
});
