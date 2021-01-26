import { showAlert } from "../../helpers/alerts";
import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";
import { types } from "../types";
import { finishLoading, startLoading } from "./ui.action";

export const startLoadTestimonials = () => {
  return async (dispatch) => {
    const request = await fetchWithoutToken("testimonials/");
    const body = await request.json();
    if (body.ok) {
      const { testimonials } = body;
      dispatch(loadTestimonials(testimonials));
    } else {
      showAlert("error", body.msg);
    }
  };
};

export const startCreateTestimonial = (invitation) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const request = await fetchWithToken(
      "testimonials/",
      { ...invitation },
      "POST"
    );
    const body = await request.json();
    if (body.ok) {
      dispatch(addTestimonial(body.testimonial));
      localStorage.clear();
      showAlert("success", body.msg);
    } else {
      showAlert("error", body.msg);
    }
    dispatch(finishLoading());
    return body.ok;
  };
};

export const startDeleteTestimonial = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const request = await fetchWithToken(`testimonials/${id}`, {}, "DELETE");
    const body = await request.json();
    if (body.ok) {
      showAlert("success", body.msg);
      dispatch(deleteTestimonial(id));
    } else {
      showAlert("error", body.msg);
    }
    dispatch(finishLoading());
  };
};

// Modifican directamente el estado de la aplicación

const loadTestimonials = (testimonials) => ({
  type: types.loadTestimonial,
  payload: testimonials,
});

const addTestimonial = (testimonial) => ({
  type: types.addTestimonial,
  payload: testimonial,
});

const deleteTestimonial = (id) => ({
  type: types.deleteTestimonial,
  payload: id,
});
