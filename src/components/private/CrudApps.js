import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  startCreateApp,
  startUpdateApp,
} from "../../redux/actions/app.actions";
import Title from "../ui/Title";
import TextError from "../ui/TextError";
import SEO from "../ui/SEO";

export const CrudApps = () => {
  // Hooks
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const { filters, active } = useSelector((state) => state.apps);
  const [isEdit, setIsEdit] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    date: dayjs(new Date().getTime()).format("YYYY-MM-DD"),
    nameClient: "",
    tools: "",
    description: "",
    urlRepository: "",
    urlDemo: "",
    role: "",
    photo: "",
    category: "",
  });
  const history = useHistory();
  const ref = useRef();

  useEffect(() => {
    if (active) {
      setIsEdit(true);
      const dataEdit = { ...active };
      delete dataEdit._id;
      delete dataEdit._v;
      delete dataEdit.photo;
      dataEdit.date = dayjs(dataEdit.date).format("YYYY-MM-DD");
      dataEdit.category = active.category._id;
      setInitialValues({ ...dataEdit });
    }
  }, [active, dispatch]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("El Nombre es obligatorio"),
      date: Yup.date().typeError("La Fecha es obligatoria"),
      nameClient: Yup.string().required("El Nombre del Cliente es obligatorio"),
      tools: Yup.string().required("Las Herramientas son obligatorias"),
      description: Yup.string()
        .max(400, "Debe tener máximo 400 caracteres")
        .required("La Descripción es obligatoria"),
      urlRepository: Yup.string().url("Link no es correcto"),
      urlDemo: Yup.string().url("Link no es correcto"),
      role: Yup.string().required("El Rol es obligatorio"),
      photo: isEdit
        ? Yup.mixed()
        : Yup.mixed().required("La Imagen es obligatoria"),
      category: Yup.string().required("La CategorÍa es obligatoria"),
    }),
    onSubmit: async (app) => {
      if (!isEdit) {
        const formData = new FormData(ref.current);
        await dispatch(startCreateApp(formData));
        formik.resetForm();
        history.push("/portfolio");
      } else {
        await dispatch(startUpdateApp(app, active._id));
        formik.resetForm();
        history.push(`/detail-app/${active._id}`);
      }
    },
  });

  return (
    <>
      <SEO
        title="Crear Aplicación | Alexander.js"
        description="Añadir aplicaciones al portafolio"
      />
      <div>
        <Title title="Alexander.js" subtitle="Administrar Aplicaciones" />
        <div className="crudService-container">
          <div className="content neumorphism">
            <h1>{isEdit ? "Editar aplicación" : "Crear aplicación"}</h1>
            <form
              ref={ref}
              onSubmit={formik.handleSubmit}
              encType="multipart/form-data"
            >
              <div className="field">
                <span className="fas fa-pencil-alt"></span>
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
              <div className="field" title="Fecha de entrada">
                <span className="fas fa-calendar-check"></span>
                <input
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="date"
                />
              </div>
              <TextError formik={formik} value="date" />
              <div className="field">
                <span className="fas fa-user-check"></span>
                <input
                  name="nameClient"
                  value={formik.values.nameClient}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Nombre del Cliente"
                />
              </div>
              <TextError formik={formik} value="nameClient" />
              <div className="field">
                <span className="fas fa-code"></span>
                <input
                  name="urlRepository"
                  value={formik.values.urlRepository}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="url"
                  placeholder="Link del repositorio"
                />
              </div>
              <TextError formik={formik} value="urlRepository" />
              <div className="field">
                <span className="fas fa-link"></span>
                <input
                  name="urlDemo"
                  value={formik.values.urlDemo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="url"
                  placeholder="Link de la aplicación"
                />
              </div>
              <TextError formik={formik} value="urlDemo" />
              <div className="field">
                <span className="fas fa-laptop-code"></span>
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
              {!isEdit && (
                <>
                  <div className="field">
                    <span className="fas fa-image"></span>
                    <input
                      className="input-file"
                      name="photo"
                      value={formik.values.photo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="file"
                      accept="image/*"
                      placeholder="Imagen"
                    />
                  </div>
                  <TextError formik={formik} value="photo" />
                </>
              )}
              <div className="field">
                <span className="fas fa-tag"></span>
                <select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Seleccionar Categoría"
                >
                  <option defaultValue="">Sin selección</option>
                  {filters.map((filter) => (
                    <option key={filter._id} value={filter._id}>
                      {filter.name}
                    </option>
                  ))}
                </select>
              </div>
              <TextError formik={formik} value="category" />
              <div className="field">
                <span className="fas fa-tools"></span>
                <textarea
                  style={{ height: 100 }}
                  value={formik.values.tools}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="tools"
                  maxLength="100"
                  placeholder="Herramientas"
                ></textarea>
              </div>
              {formik.touched.tools && formik.errors.tools && (
                <p style={{ paddingTop: 55 }}>* {formik.errors.tools}</p>
              )}
              {formik.isValid && (
                <>
                  <br />
                  <br />
                </>
              )}
              <div className="field">
                <span className="fas fa-edit"></span>
                <textarea
                  style={{ height: 100 }}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="description"
                  maxLength="400"
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
