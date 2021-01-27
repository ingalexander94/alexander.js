import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { startLogin } from "../../redux/actions/auth.action";
import TextError from "../ui/TextError";
import SEO from "../ui/SEO";

export const Login = () => {
  // Hooks
  const [togglePassword, setTogglePassword] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El Correo no es válido")
        .required("El Correo es obligatorio"),
      password: Yup.string()
        .min(6, "Debe tener mínimo 6 caracteres")
        .required("La Contraseña es obligatoria"),
    }),
    onSubmit: (user) => {
      dispatch(startLogin(user));
      formik.resetForm();
    },
  });

  return (
    <>
      <SEO
        title="Iniciar Sesión | Alexander.js"
        description="Entrar en el portafolio de Alexander Peñaloza"
      />
      <div className="auth-container">
        <div className="content neumorphism">
          <h1>Iniciar Sesión</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="field">
              <span className="fas fa-at"></span>
              <input
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                autoComplete="off"
                placeholder="Correo"
              />
            </div>
            <TextError formik={formik} value="email" />
            <div className="field">
              <span className="fas fa-key"></span>
              <input
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                type={!togglePassword ? "password" : "text"}
                placeholder="Contraseña"
              />
              <i
                onClick={() => setTogglePassword(!togglePassword)}
                className={`fas ${
                  !togglePassword ? "fa-eye-slash" : "fa-eye"
                } eyes`}
              ></i>
            </div>
            <TextError formik={formik} value="password" />
            <div className="forgot-password">
              <Link to="/auth/forgot-password">¿Olvido su contraseña?</Link>
            </div>
            <button type="submit" disabled={!formik.isValid || loading}>
              Entrar {loading && <i className="fas fa-spinner fa-pulse"></i>}
            </button>
            <div className="signup-link">
              ¿No tiene una cuenta? <Link to="/auth/register">Registrarse</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
