import React from 'react';
import PropTypes from 'prop-types';
import Header from './header.jsx';

const DefaultLayout = ({ children }) => (
  <div className="DefaultLayout">
    <Header />
    <div className="DefaultLayout-block">
      <div className="DefaultLayout-content">
        {children}
      </div>
    </div>
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default DefaultLayout;
