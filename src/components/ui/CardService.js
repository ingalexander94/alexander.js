import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../helpers/pipes";
import { startDeleteService } from "../../redux/actions/about.action";

const CardService = ({ service }) => {
  // Hooks
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);

  // Funciones
  const handleDeleteService = () => {
    const question = window.confirm("¿ Está seguro ?");
    question && dispatch(startDeleteService(service._id));
  };

  return (
    <div className="item-service neumorphism">
      <div>
        {uid && (
          <i
            onClick={handleDeleteService}
            className="delete-service fas fa-times"
          ></i>
        )}
        <div className="icon">
          <i className={`${service.icon} fa-2x`}></i>
        </div>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <blockquote>- Desde el {formatDate(service.date)}</blockquote>
      </div>
    </div>
  );
};

CardService.propTypes = {
  service: PropTypes.object.isRequired,
};

export default CardService;
