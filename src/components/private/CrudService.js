import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { startCreateService } from "../../redux/actions/about.action";
import Title from "../ui/Title";
import TextError from "../ui/TextError";
import SEO from "../ui/SEO";

export const CrudService = () => {
  // Hooks
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const formik = useFormik({
    initialValues: {
      name: "",
      icon: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Debe tener mínimo 2 caracteres")
        .required("El Nombre es obligatorio"),
      icon: Yup.string()
        .min(8, "Debe tener mínimo 8 caracteres")
        .max(30, "Debe tener máximo 30 caracteres")
        .required("El Icono es obligatorio"),
      description: Yup.string()
        .min(30)
        .max(100, "Debe tener máximo 100 caracteres")
        .required("La Descripción es obligatoria"),
    }),
    onSubmit: async (service) => {
      service.date = new Date().getTime();
      await dispatch(startCreateService(service));
      formik.resetForm();
    },
  });

  return (
    <>
      <SEO
        title="Crear Servicio | Alexander.js"
        description="Añadir servicios al portafolio"
      />
      <div>
        <Title title="Alexander.js" subtitle="Administrar Servicios" />
        <div className="crudService-container">
          <div className="content neumorphism">
            <h1>Crear Servicio</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="field">
                <span className="fas fa-chalkboard-teacher"></span>
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
                <span className="fab fa-font-awesome-flag"></span>
                <input
                  name="icon"
                  value={formik.values.icon}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Icono de Font Awesome"
                />
              </div>
              <TextError formik={formik} value="icon" />
              <div className="field">
                <span className="fas fa-edit"></span>
                <textarea
                  style={{ height: 100 }}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="description"
                  maxLength="100"
                  placeholder="Descripción"
                ></textarea>
              </div>
              {formik.touched.description && formik.errors.description && (
                <p style={{ paddingTop: 55 }}>* {formik.errors.description}</p>
              )}
              <button
                style={{ marginTop: 80 }}
                type="submit"
                disabled={!formik.isValid || loading}
              >
                Guardar {loading && <i className="fas fa-spinner fa-pulse"></i>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
