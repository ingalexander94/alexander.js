import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../../helpers/syncRequest";
import { finishLoading, startLoading } from "../../redux/actions/ui.action";
import { showAlert } from "../../helpers/alerts";
import TextError from "../ui/TextError";
import SEO from "../ui/SEO";

export const ForgotPassword = () => {
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state) => state.ui);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El Correo no es válido")
        .required("El Correo es obligatorio"),
    }),
    onSubmit: async ({ email }) => {
      dispatch(startLoading());
      const body = await forgotPassword(email);
      if (body.ok) {
        const { msg } = body;
        dispatch(finishLoading());
        showAlert("success", msg);
        history.replace("/auth/login");
      } else {
        dispatch(finishLoading());
        showAlert("error", body.msg);
        formik.resetForm();
      }
    },
  });

  return (
    <>
      <SEO
        title="Recuperar contraseña | Alexander.js"
        description="Recuperar la contraseña de la cuenta"
      />
      <div className="auth-container">
        <div className="content neumorphism">
          <h1>Recuperar Contraseña</h1>
          <p>
            Ingrese el correo electrónico que utilizó cuando se registró, le
            enviaré un enlace para que recupere la contraseña.
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="field">
              <span className="fas fa-at"></span>
              <input
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                placeholder="Correo"
              />
            </div>
            <TextError formik={formik} value="email" />
            <button type="submit" disabled={!formik.isValid || loading}>
              Recuperar Contraseña{" "}
              {loading && <i className="fas fa-spinner fa-pulse"></i>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
