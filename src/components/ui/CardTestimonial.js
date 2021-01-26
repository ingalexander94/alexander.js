import PropTypes from "prop-types";

const CardTestimonial = ({ testimony }) => {
  return (
    <div className="item-testimony">
      <i className="fas fa-quote-left fa-2x"></i>
      <i className="fas fa-quote-right fa-2x"></i>
      <div className="testimony animate__animated animate__faster">
        <p>{testimony.message}</p>
        <div className="person-testimony">
          <figure>
            {testimony.socialNetwork !== "sinFoto" ? (
              <a
                href={`https://${testimony.socialNetwork}.com/${testimony.username}`}
                rel="noreferrer"
                target="_blank"
              >
                <img src={`${testimony.photo}`} alt="Foto de una persona" />
              </a>
            ) : (
              <img src={`${testimony.photo}`} alt="Foto de una persona" />
            )}
          </figure>
          <div>
            <h3>{testimony.name}</h3>
            {testimony.socialNetwork !== "sinFoto" && (
              <p>
                @{testimony.username}{" "}
                <i className={`fab fa-${testimony.socialNetwork}`}></i>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CardTestimonial.propTypes = {
  testimony: PropTypes.object.isRequired,
};

export default CardTestimonial;
