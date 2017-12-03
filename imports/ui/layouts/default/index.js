import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './header';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Outer = styled.div`
  min-height: 100vh;
`;
//------------------------------------------------------------------------------
const Container = styled.div`
  max-width: 420px;
  min-height: 420px;
`;
//------------------------------------------------------------------------------
const Inner = styled.div`
  padding: 30px;
  background-color: white;
  box-shadow: 0 6px 15px rgba(36,37,38,0.08);
  border-radius: 16px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DefaultLayout = ({ children, ...rest }) => (
  <Outer className="flex justify-around items-center">
    <Container className="full-width">
      <Header />
      <Inner className="flex flex-column justify-between">
        {React.cloneElement(children, { ...rest })}
      </Inner>
    </Container>
  </Outer>
);

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default DefaultLayout;
