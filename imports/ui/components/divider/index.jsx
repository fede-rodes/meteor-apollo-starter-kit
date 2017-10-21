import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({ text }) => (
  <div className="full-width center p3">
    -------- {text} --------
  </div>
);

Divider.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Divider;
