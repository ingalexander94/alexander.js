import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../helpers/pipes";
import { setActive } from "../../redux/actions/app.actions";

const CardApp = ({ app }) => {
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // Funciones
  const handlerSetActiveApp = () => {
    dispatch(setActive(app));
    history.push(`/detail-app/${app._id}`);
  };

  return (
    <div
      onClick={handlerSetActiveApp}
      className="item-app neumorphism animate__animated animate__fadeIn"
    >
      <figure>
        <img loading="lazy" src={app.photo} alt="Screenshot de la aplicación" />
        <figcaption>
          <span>{formatDate(app.date)}</span>
          <p>{app.name}</p>
        </figcaption>
      </figure>
    </div>
  );
};

CardApp.propTypes = {
  app: PropTypes.object.isRequired,
};

export default CardApp;
