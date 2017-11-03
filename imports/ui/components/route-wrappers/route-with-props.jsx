import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Pass props down to child component.
 */
const RouteWithProps = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props => React.createElement(component, { ...rest, ...props })}
  />
);

RouteWithProps.propTypes = {
  component: PropTypes.func.isRequired,
};

export default RouteWithProps;
