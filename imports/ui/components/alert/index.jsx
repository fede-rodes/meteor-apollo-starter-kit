import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Div = styled.div`
  background-color: ${props =>
    (props.type === 'error' && '#fcdbd9') ||
    (props.type === 'success' && '#cfefdf') ||
    'white'
  };
  border: 1px solid ${props =>
    (props.type === 'error' && 'tomato') ||
    (props.type === 'success' && 'green') ||
    'black'
  };
  font-size: 14px;
  padding: 10px 15px;
`;

Div.propTypes = {
  type: PropTypes.oneOf(['error', 'success']).isRequired,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Alert = ({ type, content, ...rest }) => (
  content && content.trim().length > 0
  ? <Div type={type} {...rest}>{content}</Div>
  : null
);

Alert.propTypes = {
  type: PropTypes.oneOf(['error', 'success']).isRequired,
  content: PropTypes.string,
};

Alert.defaultProps = {
  content: '',
};
//------------------------------------------------------------------------------

export default Alert;
