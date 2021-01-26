import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const SEO = ({ title, description }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
      </Helmet>
    </>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SEO;
