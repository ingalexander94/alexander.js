import PropTypes from "prop-types";

const Title = ({ title, subtitle }) => {
  return (
    <div className="main-info">
      <h2>{title}</h2>
      <h1>{subtitle}</h1>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default Title;
