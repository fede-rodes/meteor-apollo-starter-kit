import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from '../../../apollo-client/user/fragment/user';
import getRouteLabel from './get-route-label';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const getHeaderTitle = ({ curUser, routeLabel }) => {
  if (!routeLabel) {
    return 'Not Found';
  } else if (!curUser) {
    return 'Login';
  }
  return routeLabel;
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HeaderTitle = ({ curUser, location }) => {
  // Get label for current route ('/' --> 'Home', '/b$^$%^$' --> undefined)
  const routeLabel = getRouteLabel(location.pathname);
  // Display label based on route and user logged in state
  return <span>{getHeaderTitle({ curUser, routeLabel })}</span>;
};

HeaderTitle.propTypes = {
  curUser: propType(userFragment),
  location: PropTypes.shape({
    pathname: PropTypes.String,
  }).isRequired,
};

HeaderTitle.defaultProps = {
  curUser: null,
};

// withRouter provides access to location.pathname
export default withRouter(HeaderTitle);
