import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { formatDate } from "../../helpers/pipes";
import { startDeleteGoal } from "../../redux/actions/about.action";

const CardAbout = ({ data, className }) => {
  // Hooks
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);

  // Funciones
  const handleDeleteGoal = () => {
    const question = window.confirm("¿Está seguro?");
    question && dispatch(startDeleteGoal(data._id, data.type));
  };

  return (
    <div className={`${className} animate__animated neumorphism`}>
      <div>
        <p className="date-job">
          {formatDate(data.startDate)} - {formatDate(data.endDate)}{" "}
          {uid && (
            <i
              onClick={handleDeleteGoal}
              className="delete-goal fas fa-trash-alt"
            ></i>
          )}
        </p>
        <h3>{data.role}</h3>
        <p>
          <i>{data.institution}</i>
        </p>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

CardAbout.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
};

export default CardAbout;
