import { showAlert } from "../../helpers/alerts";
import {
  fetchFormDataWithToken,
  fetchWithoutToken,
  fetchWithToken,
} from "../../helpers/fetch";
import { types } from "../types";
import { finishLoading, startLoading } from "./ui.action";

export const startLoadServices = () => {
  return async (dispatch) => {
    const request = await fetchWithoutToken("services/");
    const body = await request.json();
    body.ok && dispatch(loadServices(body.services));
  };
};

export const startCreateService = ({ name, description, icon, date }) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const request = await fetchWithToken(
      "services/",
      { name, description, icon, date },
      "POST"
    );
    const body = await request.json();
    if (body.ok) {
      dispatch(addService(body.service));
      showAlert("success", body.msg);
    } else {
      showAlert("error", body.msg);
    }
    dispatch(finishLoading());
  };
};

export const startDeleteService = (id) => {
  return async (dispatch) => {
    const request = await fetchWithToken(`services/${id}`, {}, "DELETE");
    const body = await request.json();
    if (body.ok) {
      dispatch(deleteService(id));
      showAlert("success", body.msg);
    } else {
      showAlert("error", body.msg);
    }
  };
};

export const startLoadSkill = () => {
  return async (dispatch) => {
    const request = await fetchWithoutToken("skills/");
    const body = await request.json();
    body.ok && dispatch(loadSkills(body.skills));
  };
};

export const startCreateSkill = (formData) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const request = await fetchFormDataWithToken("skills/", formData, "POST");
    const body = await request.json();
    if (body.ok) {
      dispatch(addSkill(body.skill));
      showAlert("success", body.msg);
    } else {
      showAlert("error", body.msg);
    }
    dispatch(finishLoading());
  };
};

export const startDeleteSkill = (id) => {
  return async (dispatch) => {
    const request = await fetchWithToken(`skills/${id}`, {}, "DELETE");
    const body = await request.json();
    if (body.ok) {
      dispatch(deleteSkill(id));
      showAlert("success", body.msg);
    } else {
      showAlert("error", body.msg);
    }
  };
};

export const startLoadGoals = () => {
  return async (dispatch) => {
    const request = await fetchWithoutToken("goals/");
    const body = await request.json();
    if (body.ok) {
      const { goals } = body;
      const experience = goals.filter((goal) => goal.type === "experience");
      const education = goals.filter((goal) => goal.type === "education");
      dispatch(loadEducation(education));
      dispatch(loadExperience(experience));
    }
  };
};

export const startCreateGoal = ({
  role,
  description,
  startDate,
  endDate,
  institution,
  type,
}) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const request = await fetchWithToken(
      "goals/",
      { role, description, startDate, endDate, institution, type },
      "POST"
    );
    const body = await request.json();
    if (body.ok) {
      type === "experience"
        ? dispatch(addExperience(body.goal))
        : dispatch(addEducation(body.goal));
      showAlert("success", body.msg);
    } else {
      showAlert("error", body.msg);
    }
    dispatch(finishLoading());
  };
};

export const startDeleteGoal = (id, type) => {
  return async (dispatch) => {
    const request = await fetchWithToken(`goals/${id}`, {}, "DELETE");
    const body = await request.json();
    if (body.ok) {
      type === "experience"
        ? dispatch(deleteExperience(id))
        : dispatch(deleteEducation(id));
      showAlert("success", body.msg);
    } else {
      showAlert("error", body.msg);
    }
  };
};

// Modifican directamente el estado de la aplicación

const loadServices = (services) => ({
  type: types.loadService,
  payload: services,
});

const addService = (service) => ({
  type: types.addService,
  payload: service,
});

const deleteService = (id) => ({
  type: types.deleteService,
  payload: id,
});

const loadSkills = (skills) => ({
  type: types.loadSkill,
  payload: skills,
});

const addSkill = (service) => ({
  type: types.addSkill,
  payload: service,
});

const deleteSkill = (id) => ({
  type: types.deleteSkill,
  payload: id,
});

const loadExperience = (experience) => ({
  type: types.loadExperience,
  payload: experience,
});

const addExperience = (experience) => ({
  type: types.addExperience,
  payload: experience,
});

const deleteExperience = (id) => ({
  type: types.deleteExperience,
  payload: id,
});

const loadEducation = (education) => ({
  type: types.loadEducation,
  payload: education,
});

const addEducation = (education) => ({
  type: types.addEducation,
  payload: education,
});

const deleteEducation = (id) => ({
  type: types.deleteEducation,
  payload: id,
});
