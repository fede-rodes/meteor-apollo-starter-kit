import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Button = (props) => {
  const { children, href, type, disabled, className, onClick } = props;

  if (type === 'link') {
    return (
      <Link
        to={href}
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  href: '',
  type: '',
  disabled: false,
  className: '',
  onClick: () => {},
};
//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const StyledButton = styled(Button)`
  background: ${props => (props.primary && props.theme.primaryColor) || 'white'};
  color: ${props => (props.primary && props.theme.primaryColor) || 'palevioletred'};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
`;

StyledButton.propTypes = {
  primary: PropTypes.bool,
};

StyledButton.defaultProps = {
  primary: false,
};
//------------------------------------------------------------------------------

export default withTheme(StyledButton);
