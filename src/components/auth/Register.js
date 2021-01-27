import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { startCreateUser } from "../../redux/actions/auth.action";
import TextError from "../ui/TextError";
import SEO from "../ui/SEO";

export const Register = () => {
  // Hooks
  const [togglePassword, setTogglePassword] = useState(false);
  const [togglePassword2, setTogglePassword2] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Debe tener mínimo 2 caracteres")
        .required("El Nombre es obligatorio"),
      email: Yup.string()
        .email("El correo no es válido")
        .required("El Correo es obligatorio"),
      password: Yup.string()
        .min(6, "Debe tener mínimo 6 caracteres")
        .required("La Contraseña es obligatoria"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las Contraseñas no coinciden")
        .required("Confirmar la contraseña es obligatorio"),
    }),
    onSubmit: (user) => {
      delete user.confirmPassword;
      dispatch(startCreateUser(user));
      formik.resetForm();
    },
  });

  return (
    <>
      <SEO
        title="Registrarse | Alexander.js"
        description="Crear una cuenta nueva"
      />
      <div className="auth-container">
        <div className="content neumorphism">
          <h1>Registrarse</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="field">
              <span className="fas fa-user-shield"></span>
              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Nombre"
              />
            </div>
            <TextError formik={formik} value="name" />
            <div className="field">
              <span className="fas fa-at"></span>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
              Crear Cuenta{" "}
              {loading && <i className="fas fa-spinner fa-pulse"></i>}
            </button>
            <div className="signup-link">
              ¿Ya tiene una cuenta? <Link to="/auth/login">Iniciar Sesión</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
