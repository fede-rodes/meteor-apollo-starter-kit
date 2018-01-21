import React from 'react';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Outer = styled.div`
  width: 100%;
  max-width: 420px;
  height: 100%;
  max-height: 200px;
  padding: 15px 10px;
`;

const Logo = styled.img`
  max-height: 150px;
  width: 50%;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Header = () => (
  <Outer className="flex justify-between items-center">
    <Logo src="/meteor.svg" alt="meteor" />
    <Logo src="/apollo.svg" alt="apollo" />
  </Outer>
);

export default Header;
