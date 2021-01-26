import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import * as Yup from "yup";
import { useFormik } from "formik";
import { startCreateGoal } from "../../redux/actions/about.action";
import Title from "../ui/Title";
import TextError from "../ui/TextError";
import SEO from "../ui/SEO";

export const CrudSkills = () => {
  // Hooks
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const formik = useFormik({
    initialValues: {
      role: "",
      startDate: dayjs(new Date().getTime()).format("YYYY-MM-DD"),
      endDate: "",
      institution: "",
      description: "",
      type: "",
    },
    validationSchema: Yup.object({
      role: Yup.string().required("El Rol es obligatorio"),
      institution: Yup.string().required("La Institución es obligatoria"),
      startDate: Yup.date().typeError("La Fecha Inicial es obligatoria"),
      description: Yup.string()
        .min(30)
        .max(100, "Debe tener máximo 100 caracteres")
        .required("La Descripción es obligatoria"),
      type: Yup.string().required("El Tipo es obligatorio"),
    }),
    onSubmit: async (goal) => {
      !goal.endDate && (goal.endDate = null);
      await dispatch(startCreateGoal(goal));
      formik.resetForm();
    },
  });

  return (
    <>
      <SEO
        title="Crear Habilidades | Alexander.js"
        description="Añadir habilidades al portafolio"
      />
      <div>
        <Title title="Alexandev.js" subtitle="Administrar Objetivos" />
        <div className="crudService-container">
          <div className="content neumorphism">
            <h1>Crear Objetivo</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="field">
                <span className="fas fa-chalkboard-teacher"></span>
                <input
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Rol"
                />
              </div>
              <TextError formik={formik} value="role" />
              <div className="field" title="Fecha de entrada">
                <span className="fas fa-chalkboard-teacher"></span>
                <input
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="date"
                />
              </div>
              <TextError formik={formik} value="startDate" />
              <div className="field" title="Fecha de salida">
                <span className="fas fa-chalkboard-teacher"></span>
                <input
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="date"
                />
              </div>
              <TextError formik={formik} value="endDate" />
              <div className="field">
                <span className="fab fa-font-awesome-flag"></span>
                <input
                  name="institution"
                  value={formik.values.institution}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Institución"
                />
              </div>
              <TextError formik={formik} value="institution" />
              <div className="field">
                <span className="fas fa-camera"></span>
                <select
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Seleccionar Tipo"
                >
                  <option defaultValue="">Sin selección</option>
                  <option value="experience">Experiencia</option>
                  <option value="education">Educación</option>
                </select>
              </div>
              <TextError formik={formik} value="type" />
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
