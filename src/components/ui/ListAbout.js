import PropTypes from "prop-types";
import CardAbout from "./CardAbout";

const ListAbout = ({ list, type, id }) => {
  return (
    <div id={id} className="animate__animated animate__fadeIn">
      <div className="grid-jobs">
        {list.map((item, i) => (
          <CardAbout
            key={item._id}
            data={item}
            className={
              (i + 1) % 2 === 0
                ? `right animate__fadeInRight right-${type}`
                : `left animate__fadeInLeft left-${type}`
            }
          />
        ))}
      </div>
    </div>
  );
};

ListAbout.propTypes = {
  list: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ListAbout;
