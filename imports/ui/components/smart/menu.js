import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { LogoutBtn } from './auth';
// import styled from 'styled-components';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const LINKS = [
  { key: 'home', label: 'Home', path: '/' },
];
//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
/* const Outer = styled.div`
  width: 100%;
  max-width: 420px;
  height: 100%;
  max-height: 200px;
  padding: 15px 10px;
`;

const Logo = styled.img`
  max-height: 150px;
  width: 50%;
`; */
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Header extends React.PureComponent {
  componentWillMount() {
    const { location: { pathname } } = this.props;

    const menuIconElement = document.querySelector('.header__burger');
    console.log('menuIconElement', menuIconElement);
    const link = LINKS.find(({ path }) => (path === pathname));
    menuIconElement.classList.add('header__burger--show');
  }

  render() {
    const { location: { pathname } } = this.props;
    console.log('pathname', pathname);

    // Get current route label
    const link = LINKS.find(({ path }) => (path === pathname));
    console.log('link', link);
    console.log('(link && link.label) || ', (link && link.label) || '');

    return [
      <header key="header" className="flex justify-between items-center" >
        <div className="header__burger flex justify-center items-center">
          <svg className="menu__icon no--select" width="24px" height="24px" viewBox="0 0 48 48" fill="#fff">
            <path d="M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z" />
          </svg>
        </div>
        <div className="header__title no--select">
          <span>{(link && link.label) || ''}</span>
        </div>
        <div className="header__avatar" />
      </header>,
      <div key="menu" className="menu">
        <div className="menu__header" />
        <ul className="menu__list left">
          {LINKS.map(({ key, label, path }) => (
            <li key={key}>
              <Link to={path}>{label}</Link>
            </li>
          ))}
          <li key="logout">
            <LogoutBtn
              btnType="link"
              onClick={(evt) => {
                evt.preventDefault();
              }}
            />
          </li>
        </ul>
      </div>,
      <div key="overlay" className="menu__overlay" />,
    ];
  }
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.String,
  }).isRequired,
};

// withRouter provides access to location.pathname
export default withRouter(Header);
