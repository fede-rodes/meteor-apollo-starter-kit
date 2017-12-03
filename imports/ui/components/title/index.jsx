import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Title = ({ children, ...rest }) => (
  <h1 className="center" {...rest}>{children}</h1>
);

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;
