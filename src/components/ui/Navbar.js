import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkScroll, scrollUp } from "../../helpers/ui";
import { unsetActive } from "../../redux/actions/app.actions";
import { startLogout } from "../../redux/actions/auth.action";
import "../../styles/navbar.css";

export const Navbar = () => {
  // Hooks
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  useEffect(() => {
    checkScroll((res) => setShowFloating(res));
  }, []);

  // Funciones
  const hanleToggleMenu = () => setToggleMenu(!toggleMenu);

  return (
    <nav className="navbar-container">
      <div
        onClick={hanleToggleMenu}
        className={`${toggleMenu && "close"}`}
        id="burguer-menu"
      >
        <span></span>
      </div>

      {showFloating && (
        <div onClick={scrollUp} id="floating-button">
          <span className="fas fa-chevron-up fa-lg"></span>
        </div>
      )}

      <div className={`${toggleMenu && "show"}`} id="menu">
        <ul onClick={hanleToggleMenu}>
          <li>
            <NavLink exact to="/home">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/portfolio">
              Portafolio
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/about-me">
              Sobre mí
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/services">
              Servicios
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/testimonials">
              Testimonios
            </NavLink>
          </li>
          {!uid && (
            <li>
              <NavLink exact to="/contact">
                Contacto
              </NavLink>
            </li>
          )}
          {uid && (
            <>
              <li>
                <NavLink
                  onClick={() => dispatch(unsetActive())}
                  exact
                  to="/admin/add-apps"
                >
                  Crear Aplicación
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/admin/add-services">
                  Crear Servicio
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/admin/add-skills">
                  Crear Objetivo
                </NavLink>
              </li>
              <li>
                <Link to="" onClick={() => dispatch(startLogout())}>
                  Salir
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
