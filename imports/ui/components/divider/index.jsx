import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({ text }) => (
  <div className="full-width center p2">
    - {text} -
  </div>
);

Divider.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Divider;
