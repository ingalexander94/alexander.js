import PropTypes from "prop-types";

const TextError = ({ formik, value }) => {
  const { touched, errors } = formik;
  return <>{touched[value] && errors[value] && <p>* {errors[value]}</p>}</>;
};

TextError.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default TextError;
