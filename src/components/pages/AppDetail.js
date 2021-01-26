import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { formatDate } from "../../helpers/pipes";
import { showFormAlert } from "../../helpers/alerts";
import {
  startDeleteApp,
  startgetApp,
  startUpdatePhoto,
  unsetActive,
} from "../../redux/actions/app.actions";
import SEO from "../ui/SEO";
import "../../styles/detail.css";

export const AppDetail = () => {
  // Hooks
  const { active } = useSelector((state) => state.apps);
  const { uid } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const getApp = async () => {
      window.scrollTo({ top: 0 });
      if (!active) {
        const app = await dispatch(startgetApp(id));
        !app && history.push("/portfolio");
      }
    };
    getApp();
  }, [active, dispatch, history, id]);

  const handleDeleteApp = () => {
    const question = window.confirm("¿Está seguro?");
    if (question) {
      dispatch(unsetActive());
      dispatch(startDeleteApp(active._id));
      history.replace("/portfolio");
    }
  };

  const handleUpdatePhoto = async () => {
    const question = await showFormAlert([
      {
        title: "Imagen",
        input: "file",
        inputAttributes: {
          accept: "image/*",
        },
      },
    ]);
    if (!question.dismiss) {
      const [photo] = question.value;
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("id", active._id);
      dispatch(startUpdatePhoto(formData));
    }
  };

  return (
    <>
      <SEO
        title={`${active ? active.name : "Detalle App"} | ${
          active ? active.category.name : "Alexander.js"
        }`}
        description={`${
          active
            ? active.description
            : "Aplicación creada por Alexander Peñaloza"
        }`}
      />
      <div className="detailApp-container">
        <div className="img-content">
          <figure>
            <img src={active?.photo} alt="Imagen de la aplicación" />
          </figure>
        </div>
        <div className="menu-app">
          {active?.urlDemo && (
            <a
              href={active?.urlDemo}
              rel="noreferrer"
              target="__blank"
              className="preview"
            >
              <i className="fas fa-laptop"></i>
            </a>
          )}
          {uid && (
            <>
              <Link className="preview" to="/admin/add-apps">
                <i className="fas fa-edit"></i>
              </Link>
              <button className="preview" onClick={handleDeleteApp}>
                {loading ? (
                  <i className="fas fa-spinner fa-pulse"></i>
                ) : (
                  <i className="far fa-trash-alt"></i>
                )}
              </button>
              <button className="preview" onClick={handleUpdatePhoto}>
                <i className="fas fa-camera"></i>
              </button>
            </>
          )}
          <Link className="go-back" to="/portfolio">
            <i className="fas fa-times"></i>
          </Link>
        </div>
        <div className="info-app">
          <h2>{active?.name}</h2>
          <p>
            <strong>Categoría:</strong> {active?.category.name}
          </p>
          <div className="description-app">
            <div className="resume">
              <h3>Resumen del proyecto</h3>
              <p>{active?.description}</p>
            </div>
            <div className="project-info">
              <h3>Información</h3>
              <p>
                <strong>Rol: </strong>
                {active?.role}
              </p>
              <p>
                <strong>Fecha: </strong>
                {formatDate(active?.date)}
              </p>
              <p>
                <strong>Cliente: </strong>
                {active?.nameClient}
              </p>
              <p>
                <strong>Herramientas: </strong>
                {active?.tools}
              </p>
              {active?.urlRepository && (
                <p>
                  <strong>Github: </strong>
                  <a
                    href={active?.urlRepository}
                    target="__blank"
                    rel="noreferrer"
                  >
                    /{active?.urlRepository.split("/")[4]}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
