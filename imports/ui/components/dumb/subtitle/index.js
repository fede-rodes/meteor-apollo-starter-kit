import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Subtitle = ({ text, link }) => (
  <p className="center">
    <span dangerouslySetInnerHTML={{ __html: text }} /> {link || null}
  </p>
);

Subtitle.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.object, // eslint-disable-line
};

Subtitle.defaultProps = {
  link: null,
};

export default Subtitle;
