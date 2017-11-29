import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Message = ({ content }) => (
  content ? <span>{content}</span> : null
);

Message.propTypes = {
  content: PropTypes.string,
};

Message.defaultProps = {
  content: '',
};
//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const StyledMessage = styled(Message)`
  color: ${props => (props.type === 'error' : 'tomato') || 'black'};
  font-size: 14px;
`;

export default withTheme(StyledMessage);
