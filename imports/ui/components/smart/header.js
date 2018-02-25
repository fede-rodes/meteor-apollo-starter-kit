import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { LogoutBtn } from './auth';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const ROUTES = {
  '/': { name: 'home', label: 'Home', auth: true },
  '/login': { name: 'login', label: 'Login', auth: false },
  '/signup': { name: 'signup', label: 'Signup', auth: false },
  '/verify-email': { name: 'verifyEmail', label: 'Verify Email', auth: false },
  '/link-expired': { name: 'linkExpired', label: 'Link Expired', auth: false },
  '/forgot-password': { name: 'forgotPassword', label: 'Forgot Password', auth: false },
  '/reset-password': { name: 'resetPassword', label: 'Reset Password', auth: false },
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Header extends React.Component {
  componentWillMount() {
    const { location } = this.props;

    // Get current location and display burger button if necessary
    this.showHideBurgerBtn(location.pathname);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    // With every location change, display burger button if necessary
    if ('location' in prevProps && location !== prevProps.location) {
      this.showHideBurgerBtn(location.pathname);
    }
    return true;
  }

  showHideBurgerBtn = (pathname) => {
    // Get the reference to the app's shell burger button
    const menuIconElement = document.querySelector('.header__burger');

    // Display burger button for authenticated routes only
    const route = ROUTES[pathname];
    menuIconElement.classList[route && route.auth ? 'add' : 'remove']('header__burger--show');
  }

  render() {
    const { location } = this.props;
    console.log('location', location);

    // Get current route label
    const route = ROUTES[location.pathname];

    return <span>{(route && route.label) || 'Not Found'}</span>;
  }
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.String,
  }).isRequired,
};

// withRouter provides access to location.pathname
export default withRouter(Header);
