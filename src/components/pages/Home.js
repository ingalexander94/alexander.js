import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { shortcutKey, startAnimationCursorHome } from "../../helpers/ui";
import { Photo } from "../ui/Photo";
import SEO from "../ui/SEO";
import { servicesData } from "../../data/dataTest";
import "../../styles/home.css";

export const Home = () => {
  // Hooks
  const history = useHistory();

  useEffect(() => {
    const init = startAnimationCursorHome(servicesData);
    init && init();
  }, []);

  // Funciones
  shortcutKey((shorcut) => shorcut && history.push("/auth/login"));

  return (
    <>
      <SEO
        title="Inicio | Alexander.js"
        description="Alexander Peñaloza, desarrollador de software frontend y backend"
      />
      <div className="home-container">
        <main className="home-content">
          <div className="user-info">
            <p>"Hola Mundo" soy:</p>
            <h1>{`<Alexander Peñaloza/> 😀`}</h1>
            <p>
              un desarrollador <span className="profession"></span>
              <span className="cursor typed">&nbsp;</span>
            </p>
            <Link className="button" to="/about-me">
              Más información
            </Link>
          </div>
          <Photo />
        </main>
      </div>
    </>
  );
};
