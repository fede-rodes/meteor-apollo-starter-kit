import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Button = (props) => {
  const { label, href, type, disabled, className, onClick } = props;

  if (type === 'link') {
    return <Link to={href} className={className}>{label}</Link>;
  }

  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  label: '',
  href: null,
  type: '',
  disabled: false,
  className: '',
};
//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const StyledButton = styled(Button)`
  background: ${props => (props.primary && 'palevioletred') || 'white'};
  color: ${props => (props.primary && 'white') || 'palevioletred'};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
`;

StyledButton.propTypes = {
  primary: PropTypes.string,
};

StyledButton.defaultProps = {
  primary: null,
};
//------------------------------------------------------------------------------

export default StyledButton;
