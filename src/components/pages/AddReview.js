import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { startCreateTestimonial } from "../../redux/actions/testimonial.action";
import Title from "../ui/Title";
import SEO from "../ui/SEO";
import "../../styles/review.css";

export const AddReview = () => {
  // Hooks
  const { loading } = useSelector((state) => state.ui);
  const { token } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      socialNetwork: "twitter",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El Nombre es obligatorio"),
      socialNetwork: Yup.string().required("La Red Social es obligatoria"),
      username: Yup.string().when("socialNetwork", {
        is: (socialNetwork) => socialNetwork !== "sinFoto",
        then: Yup.string().required("El Nombre de Usuario es obligatorio"),
      }),
      message: Yup.string()
        .max(230, "Máximo debe tener 150 caracteres")
        .required("La Descripción es obligatoria"),
    }),
    onSubmit: async (testimonial) => {
      testimonial.socialNetwork === "sinFoto" && (testimonial.username = "");
      const request = await dispatch(startCreateTestimonial(testimonial));
      request && history.replace("/testimonials");
    },
  });

  return (
    <>
      <SEO
        title="Guardar comentario | Alexander.js"
        description="Agregar una opinión profesional sobre Alexander Peñaloza"
      />
      <div className="review-container">
        <Title title="Alexandev.js" subtitle="¿Qué piensa de mí?" />
        <form onSubmit={formik.handleSubmit} className="form-contact">
          <div className="inputs-form">
            <div className="input-contact">
              <p className="info-review">
                1. Para fines de diseño, solicito el nombre de usuario de su
                cuenta de Twitter o GitHub para obtener su foto de perfil.
                <strong> Puede elegir no vincular su cuenta</strong>
              </p>
              <div className="field-contact">
                <span className="fas fa-user"></span>
                <input
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  type="text"
                  placeholder="Nombre"
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <p>{formik.errors.name}</p>
              )}
              <div className="field-contact">
                <span className="fas fa-camera"></span>
                <select
                  name="socialNetwork"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.socialNetwork}
                  placeholder="Seleccionar Foto"
                >
                  <option disabled>Seleccionar foto</option>
                  <option value="twitter">Foto de Twitter</option>
                  <option value="github">Foto de Github</option>
                  <option value="sinFoto">Sin Foto</option>
                </select>
              </div>
              {formik.touched.socialNetwork && formik.errors.socialNetwork && (
                <p>{formik.errors.socialNetwork}</p>
              )}
              {(formik.values.socialNetwork === "twitter" ||
                formik.values.socialNetwork === "github") && (
                <>
                  <div className="field-contact">
                    <span className="fas fa-at"></span>
                    <input
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      type="text"
                      placeholder="Nombre de Usuario"
                    />
                  </div>
                  {formik.touched.username && formik.errors.username && (
                    <p>{formik.errors.username}</p>
                  )}
                </>
              )}
            </div>
            <div className="textarea-contact">
              <p className="info-review">
                2. L@ he seleccionado para que guarde un testimonio en mi sitio
                web, por favor escriba en máximo 230 caracteres ¿Qué opinión
                tiene de mi desempeño profesional?
              </p>
              <p className="counter-character">
                {formik.values.message.length}-230
              </p>
              {formik.touched.message && formik.errors.message && (
                <p>{formik.errors.message}</p>
              )}
              <div className="field-contact">
                <span className="fas fa-edit"></span>
                <textarea
                  name="message"
                  className="msg-testimonial"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  maxLength="230"
                  placeholder="Escriba su Opinión..."
                ></textarea>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !formik.isValid}
            className="btn-review"
          >
            {loading ? "Espere un momento " : "Enviar Comentario "}
            {loading && <i className="fas fa-spinner fa-pulse"></i>}
          </button>
        </form>
      </div>
    </>
  );
};
