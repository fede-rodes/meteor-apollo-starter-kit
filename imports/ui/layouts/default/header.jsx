import React from 'react';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Outer = styled.div`
  height: 200px;
`;
//------------------------------------------------------------------------------
const Logo = styled.img`
  margin: 0 50px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Header = () => (
  <Outer className="flex justify-center items-center">
    <Logo src="/meteor.svg" alt="meteor" />
    <Logo src="/apollo.svg" alt="apollo" />
  </Outer>
);

export default Header;
