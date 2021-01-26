import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { newPassword } from "../../helpers/syncRequest";
import { finishLoading, startLoading } from "../../redux/actions/ui.action";
import { showAlert } from "../../helpers/alerts";
import TextError from "../ui/TextError";
import SEO from "../ui/SEO";

export const NewPassword = () => {
  // Hooks
  const [togglePassword, setTogglePassword] = useState(false);
  const [togglePassword2, setTogglePassword2] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const history = useHistory();
  const { token } = useParams();

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Debe tener mínimo 6 caracteres")
        .required("La Contraseña es obligatoria"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las Contraseñas no coinciden")
        .required("Confirmar la contraseña es obligatorio"),
    }),
    onSubmit: async ({ password }) => {
      dispatch(startLoading());
      const body = await newPassword(password);
      if (body.ok) {
        localStorage.clear();
        const { msg } = body;
        dispatch(finishLoading());
        showAlert("success", msg);
        history.replace("/auth/login");
      } else {
        localStorage.clear();
        dispatch(finishLoading());
        showAlert("error", body.msg);
        formik.resetForm();
        history.replace("/auth/login");
      }
    },
  });

  return (
    <>
      <SEO
        title="Nueva Contraseña | Alexander.js"
        description="Terminar el proceso de recuperar contraseña ingresando la nueva contraseña de la cuenta"
      />
      <div className="auth-container">
        <div className="content neumorphism">
          <h1>Nueva Contraseña</h1>
          <p>La nueva contraseña debe tener mínimo 6 caracteres.</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="field">
              <span className="fas fa-key"></span>
              <input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={!togglePassword ? "password" : "text"}
                placeholder="Nueva Contraseña"
              />
              <i
                onClick={() => setTogglePassword(!togglePassword)}
                className={`fas ${
                  !togglePassword ? "fa-eye-slash" : "fa-eye"
                } eyes`}
              ></i>
            </div>
            <TextError formik={formik} value="password" />
            <div className="field">
              <span className="fas fa-key"></span>
              <input
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={!togglePassword2 ? "password" : "text"}
                placeholder="Confirmar Contraseña"
              />
              <i
                onClick={() => setTogglePassword2(!togglePassword2)}
                className={`fas ${
                  !togglePassword2 ? "fa-eye-slash" : "fa-eye"
                } eyes`}
              ></i>
            </div>
            <TextError formik={formik} value="confirmPassword" />
            <button type="submit" disabled={!formik.isValid || loading}>
              Cambiar Contraseña{" "}
              {loading && <i className="fas fa-spinner fa-pulse"></i>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
