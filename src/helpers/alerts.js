import Swal from "sweetalert2";
import "@sweetalert2/theme-dark";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const showAlert = (icon, title) =>
  Toast.fire({
    icon: icon,
    title: title,
  });

export const showFormAlert = (inputs = []) => {
  let progressSteps = [];
  for (let i = 0; i < inputs.length; i++) {
    progressSteps[i] = `${i + 1}`;
  }
  return Swal.mixin({
    confirmButtonText: "&rarr;",
    inputPlaceholder: "",
    progressSteps,
    inputAttributes: {
      required: true,
    },
    validationMessage: "El Campo es obligatorio",
  }).queue(inputs);
};
