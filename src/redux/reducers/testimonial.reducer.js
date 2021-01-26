import { types } from "../types";

const initState = {
  testimonials: [],
};

export const testimonialReducer = (state = initState, actions) => {
  switch (actions.type) {
    case types.loadTestimonial:
      return {
        ...state,
        testimonials: [...actions.payload],
      };
    case types.addTestimonial:
      return {
        ...state,
        testimonials: [actions.payload, ...state.testimonials],
      };
    case types.deleteTestimonial:
      return {
        ...state,
        testimonials: state.testimonials.filter(
          (testimonial) => testimonial._id !== actions.payload
        ),
      };

    default:
      return state;
  }
};
