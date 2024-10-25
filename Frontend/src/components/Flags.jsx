import propTypes from "prop-types";

export default function Flags(props) {
  return <div>{props.error}</div>;
}

Flags.propTypes = {
  error: propTypes.string.isRequired,
};
