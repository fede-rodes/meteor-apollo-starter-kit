import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Span = styled.span`
  color: ${props =>
    (props.type === 'error' && 'tomato') ||
    (props.type === 'success' && 'green') ||
    'black'
  };
  font-size: 14px;
`;

Span.propTypes = {
  type: PropTypes.oneOf(['error', 'success']).isRequired,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Message = ({ type, content, ...rest }) => (
  content && content.trim().length > 0
  ? <Span type={type} {...rest}>{content}</Span>
  : null
);

Message.propTypes = {
  type: PropTypes.oneOf(['error', 'success']).isRequired,
  content: PropTypes.string,
};

Message.defaultProps = {
  content: '',
};
//------------------------------------------------------------------------------

export default Message;
