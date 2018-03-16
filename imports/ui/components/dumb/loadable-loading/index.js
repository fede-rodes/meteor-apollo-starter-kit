import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LoadableLoading = ({ error, pastDelay }) => {
  if (error) {
    return <div>Error loading component!</div>;
  } else if (pastDelay) {
    return <Loading />;
  }
  return null;
};

LoadableLoading.propTypes = {
  error: PropTypes.object, // eslint-disable-line
  pastDelay: PropTypes.bool.isRequired,
};

LoadableLoading.defaultProps = {
  error: null,
};

export default LoadableLoading;
