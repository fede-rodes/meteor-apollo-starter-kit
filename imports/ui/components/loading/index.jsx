import React from 'react';
import styled, { keyframes } from 'styled-components';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Outer = styled.div`
  height: 15px;
`;
//------------------------------------------------------------------------------
const bouncedelay = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
`;
//------------------------------------------------------------------------------
const Dot = styled.div`
  width: 15px;
  height: 15px;
  background-image: linear-gradient(140deg, rgb(12,6,50) 20%, rgb(66,59,90) 60%, rgb(219,159,159) 100%);
  border-radius: 100%;
  animation: ${bouncedelay} 1.4s infinite ease-in-out both;
  margin-right: 5px;
  animation-delay: ${props => (props.delay && 0.16 * props.delay) || 0}s;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Loading = () => (
  <Outer className="flex justify-center items-center">
    <Dot className="inline-block" delay={0} />
    <Dot className="inline-block" delay={1} />
    <Dot className="inline-block" delay={2} />
  </Outer>
);

export default Loading;
