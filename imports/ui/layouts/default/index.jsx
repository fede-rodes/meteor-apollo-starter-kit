import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './header.jsx';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Block = styled.div`
  min-width: 420px;
  min-height: 420px;
  padding: 30px;
  background-color: white;
  box-shadow: 0 6px 15px rgba(36,37,38,0.08);
  border-radius: 16px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DefaultLayout = ({ children }) => (
  <div className="flex flex-column justify-around items-center">
    <Header />
    <Block className="flex justify-center items-center">
      <div className="flex flex-column justify-between full-width">
        {children}
      </div>
    </Block>
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default DefaultLayout;
