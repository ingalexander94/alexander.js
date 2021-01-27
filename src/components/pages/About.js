import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeViewInAbout } from "../../helpers/ui";
import { showFormAlert } from "../../helpers/alerts";
import {
  startCreateSkill,
  startDeleteSkill,
} from "../../redux/actions/about.action";
import Title from "../ui/Title";
import ListAbout from "../ui/ListAbout";
import { Photo } from "../ui/Photo";
import SEO from "../ui/SEO";
import "../../styles/about.css";

export const About = () => {
  // Hooks
  const [stateSkills, setStateSkills] = useState({
    skills: true,
    experience: false,
    education: false,
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const { skills, experiences, education } = useSelector(
    (state) => state.about
  );
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Funciones
  const handleChangeView = (view) => setStateSkills(changeViewInAbout(view));

  const handleCreateSkill = async () => {
    const question = await showFormAlert([
      {
        title: "Nombre",
        input: "text",
      },
      {
        title: "Descripción",
        input: "text",
      },
      {
        title: "Imagen",
        input: "file",
        inputAttributes: {
          accept: ".svg",
        },
      },
    ]);
    if (!question.dismiss) {
      const [name, description, photo] = question.value;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("photo", photo);
      dispatch(startCreateSkill(formData));
    }
  };

  const handleDeleteSkill = (id) => {
    const question = window.confirm("¿Está seguro?");
    question && dispatch(startDeleteSkill(id));
  };

  return (
    <>
      <SEO
        title="Sobre mí | Alexander.js"
        description="Información principal sobre Alexander Peñaloza desarrollador de software"
      />
      <Title title="Información Principal" subtitle="Sobre mí" />
      <main className="about-container">
        <div className="about-me">
          <Photo />
          <div className="user-info animate__animated animate__fadeIn">
            <div className="description">
              <p>
                <strong>
                  Mi nombre es Alexander Peñaloza evangelizador de JavaScript,
                  estudiante de ingeniería de sistemas y desarrollador de
                  aplicaciones para la web😍 soy Colombiano originario de la
                  ciudad de Cúcuta.
                </strong>
                <br />
                <br />
                Soy fanático del desarrollo de software y me gusta estar
                constantemente aprendiendo nuevas tecnologías que me permitan
                solucionar problemas con TI que sean eficientes y modernas para
                los clientes.
                <br />
                <br />
                <a href="/about-me#jump" rel="noreferrer">
                  Ver tecnologías y mi información profesional
                </a>
              </p>
              <br />
              <div className="links">
                <a
                  className="button"
                  href="https://co.linkedin.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  Descargar CV
                </a>
                <Link className="button" to="/contact">
                  Hable conmigo
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div id="jump" className="my-skills">
          {uid && (
            <button onClick={handleCreateSkill} title="Crear nueva habilidad">
              <i className="fas fa-plus"></i>
            </button>
          )}
          <button
            onClick={() => handleChangeView("skills")}
            autoFocus
            id="btnSkills"
          >
            Habilidades
          </button>
          <button onClick={() => handleChangeView("education")} id="btnEdu">
            Educación
          </button>
          <button onClick={() => handleChangeView("experience")} id="btnExp">
            Experiencia
          </button>

          {stateSkills.skills && (
            <div id="skills" className="animate__animated animate__fadeIn">
              {skills.map((skill) => (
                <div key={skill._id} className="tech" title={skill.description}>
                  <figure>
                    <img
                      loading="lazy"
                      src={skill.photo}
                      alt={`Icono de ${skill.name}`}
                    />
                    <figcaption>
                      {skill.name}
                      {uid && (
                        <i
                          onClick={() => handleDeleteSkill(skill._id)}
                          className="delete-goal fas fa-trash-alt"
                        ></i>
                      )}
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          )}
          {stateSkills.experience &&
            (stateSkills.experience.length > 0 ? (
              <ListAbout list={experiences} type="job" id="experience" />
            ) : (
              <p className="experience-text">
                Estoy en busca de mi primer empleo como desarrollador, no tengo
                experiencia laboral en TI pero tengo experiencia en tecnologías
                frontend y backend usandolas en mis proyectos personales como
                React, Angular y Node.JS.{" "}
                <Link to="/portfolio">Ver proyectos</Link>
              </p>
            ))}

          {stateSkills.education && (
            <ListAbout list={education} type="education" id="education" />
          )}
        </div>
      </main>
    </>
  );
};
