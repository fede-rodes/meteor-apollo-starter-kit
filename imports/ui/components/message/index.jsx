import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Div = styled.div`
  color: ${props =>
    (props.type === 'error' && 'tomato') ||
    (props.type === 'success' && 'green') ||
    'black'
  };
  font-size: 14px;
`;

Div.propTypes = {
  type: PropTypes.oneOf(['error', 'success']).isRequired,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Message = ({ type, content, ...rest }) => (
  <Div type={type} {...rest}>{content}</Div>
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
