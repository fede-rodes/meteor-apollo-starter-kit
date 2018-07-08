import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from '../../../apollo-client/user/fragment/user';
import getRouteLabel from './get-route-label';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const showHideBurgerBtn = (curUser) => {
  // Get the reference to the app's shell burger button
  const menuIconElement = document.querySelector('.header__burger');
  // Display burger button for logged in users only
  menuIconElement.classList[curUser ? 'add' : 'remove']('header__burger--show');
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Header extends React.Component {
  componentWillMount() {
    const { curUser } = this.props;
    // Get current user and display burger button if necessary
    showHideBurgerBtn(curUser);
  }

  componentDidUpdate(prevProps) {
    const { curUser } = this.props;
    // Listen to current user logged in state changes. Display burger button
    // accordingly
    if ('curUser' in prevProps && curUser !== prevProps.curUser) {
      showHideBurgerBtn(curUser);
    }
  }

  get curRouteLabel() {
    const { curUser, location } = this.props;

    // Get label matching current route ('/' --> 'Home', '/b$^$%^$' --> undefined)
    const curRouteLabel = getRouteLabel(location.pathname);

    if (!curRouteLabel) {
      return 'Not Found';
    } else if (!curUser) {
      return 'Login';
    }
    return curRouteLabel;
  }

  render() {
    return <span>{this.curRouteLabel}</span>;
  }
}

Header.propTypes = {
  curUser: propType(userFragment),
  location: PropTypes.shape({
    pathname: PropTypes.String,
  }).isRequired,
};

Header.defaultProps = {
  curUser: null,
};

// withRouter provides access to location.pathname
export default withRouter(Header);
