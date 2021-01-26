import PropTypes from "prop-types";

const CardContact = ({ title, desc, icon }) => {
  return (
    <div className="neumorphism">
      <i className={`${icon} fa-2x`}></i>
      <h3>{title}</h3>
      {title !== "Correo" ? (
        <p>{desc}</p>
      ) : (
        <p>
          <a
            href="mailto:alexandev94@gmail.com?"
            rel="noreferrer"
            target="_blank"
          >
            {desc}
          </a>
        </p>
      )}
    </div>
  );
};

CardContact.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default CardContact;
