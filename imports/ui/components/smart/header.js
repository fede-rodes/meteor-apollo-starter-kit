import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { userFragment } from '../../apollo-client/user';
import Constants from '../../../api/constants';

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
const getRouteLabel = (pathname) => {
  const route = Constants.ROUTES
    // Sort routes by longest route paths first. '/' will be the last route in
    // the list
    .sort((r1, r2) => (
      r2.path.length - r1.path.length
    ))
    // Use regular expression to find current route based on path. '/' must be
    // the last path we test, otherwise the test will always return true
    .find(({ path }) => {
      const reg = new RegExp(path);
      return reg.test(pathname);
    });
  return route ? route.label : undefined;
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

  render() {
    const { location } = this.props;
    const label = getRouteLabel(location.pathname);
    return <span>{label || 'Not Found'}</span>;
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
