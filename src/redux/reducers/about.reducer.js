import { types } from "../types";

const initState = {
  skills: [],
  services: [],
  experiences: [],
  education: [],
};

export const aboutReducer = (state = initState, actions) => {
  switch (actions.type) {
    case types.loadService:
      return {
        ...state,
        services: [...actions.payload],
      };
    case types.addService:
      return {
        ...state,
        services: [{ ...actions.payload }, ...state.services],
      };
    case types.deleteService:
      return {
        ...state,
        services: state.services.filter(
          (service) => service._id !== actions.payload
        ),
      };

    case types.loadSkill:
      return {
        ...state,
        skills: [...actions.payload],
      };

    case types.addSkill:
      return {
        ...state,
        skills: [{ ...actions.payload }, ...state.skills],
      };

    case types.deleteSkill:
      return {
        ...state,
        skills: state.skills.filter((skill) => skill._id !== actions.payload),
      };

    case types.loadExperience:
      return {
        ...state,
        experiences: [...actions.payload],
      };

    case types.addExperience:
      return {
        ...state,
        experiences: [{ ...actions.payload }, ...state.experiences],
      };

    case types.deleteExperience:
      return {
        ...state,
        experiences: state.experiences.filter(
          (experience) => experience._id !== actions.payload
        ),
      };

    case types.loadEducation:
      return {
        ...state,
        education: [...actions.payload],
      };

    case types.addEducation:
      return {
        ...state,
        education: [{ ...actions.payload }, ...state.education],
      };

    case types.deleteEducation:
      return {
        ...state,
        education: state.education.filter(
          (education) => education._id !== actions.payload
        ),
      };

    case types.cleanAbout:
      return {
        ...initState,
      };
    default:
      return state;
  }
};
