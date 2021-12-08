import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { showAlert } from "../../helpers/alerts";
import { sendMailContact } from "../../helpers/syncRequest";
import { finishLoading, startLoading } from "../../redux/actions/ui.action";
import CardContact from "../ui/CardContact";
import Title from "../ui/Title";
import TextError from "../ui/TextError";
import SEO from "../ui/SEO";
import "../../styles/contact.css";

export const Contact = () => {
  // Hooks
  const { loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      from: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      from: Yup.string()
        .email("El Correo es obligatorio")
        .required("El Correo es obligatorio"),
      subject: Yup.string()
        .max(50, "Máximo 50 caracteres")
        .required("El Asunto es obligatorio"),
      message: Yup.string().required("El Mensaje es obligatorio"),
    }),
    onSubmit: async (message) => {
      dispatch(startLoading());
      const request = await sendMailContact(message);
      request.ok
        ? showAlert("success", request.msg)
        : showAlert("error", "Ocurrio un error");
      dispatch(finishLoading());
    },
  });

  return (
    <>
      <SEO
        title="Contacto | Alexander.js"
        description="Contactar a Alexander Peñaloza por medio de las redes sociales"
      />
      <div>
        <Title title="Contacto" subtitle="Hablé conmigo" />
        <div className="contact-container">
          <div className="info-contact">
            <CardContact
              title="Linkedin"
              desc="Alexander Peñaloza"
              icon="fab fa-linkedin"
            />
            <CardContact
              title="Correo"
              desc="Escríbame un mensaje"
              icon="fas fa-envelope"
            />
            <CardContact
              title="Ubicación"
              desc="Chinácota, Norte de Santander"
              icon="fas fa-map-marker-alt"
            />
          </div>
          <form onSubmit={formik.handleSubmit} className="form-contact">
            <div className="inputs-form">
              <div className="input-contact">
                <div className="field-contact">
                  <span className="fas fa-user"></span>
                  <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    placeholder="Nombre"
                  />
                </div>
                <TextError formik={formik} value="name" />
                <div className="field-contact">
                  <span className="fas fa-at"></span>
                  <input
                    type="email"
                    name="from"
                    onChange={formik.handleChange}
                    value={formik.values.from}
                    onBlur={formik.handleBlur}
                    placeholder="Correo"
                  />
                </div>
                <TextError formik={formik} value="from" />
                <div className="field-contact">
                  <span className="fas fa-pen-alt"></span>
                  <input
                    type="text"
                    name="subject"
                    onChange={formik.handleChange}
                    value={formik.values.subject}
                    onBlur={formik.handleBlur}
                    placeholder="Asunto"
                  />
                </div>
                <TextError formik={formik} value="subject" />
              </div>
              <div className="textarea-contact">
                <TextError formik={formik} value="message" />
                <div className="field-contact">
                  <span className="fas fa-edit"></span>
                  <textarea
                    name="message"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    onBlur={formik.handleBlur}
                    placeholder="Escriba su mensaje..."
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={!formik.isValid || loading}
              className="btn-contact"
            >
              Enviar {loading && <i className="fas fa-spinner fa-pulse"></i>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
