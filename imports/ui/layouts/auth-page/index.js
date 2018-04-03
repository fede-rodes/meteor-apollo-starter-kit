import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../components/dumb/title';
import Subtitle from '../../components/dumb/subtitle';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const AuthPageLayout = ({ children, title, subtitle, link }) => (
  <div>
    {title && <Title>{title}</Title>}
    {subtitle && <Subtitle text={subtitle} link={link} />}
    {children}
  </div>
);

AuthPageLayout.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  link: PropTypes.object, // eslint-disable-line
};

AuthPageLayout.defaultProps = {
  title: '',
  subtitle: '',
  link: null,
};

export default AuthPageLayout;
