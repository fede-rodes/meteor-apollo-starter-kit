import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Button = (props) => {
  const { children, type, href, disabled, className, onClick } = props;

  if (type === 'link') {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  if (type === 'submit') {
    return (
      <input
        type="submit"
        className={className}
        value={children}
      />
    );
  }

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'link', 'submit']),
  href: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  href: '',
  disabled: false,
  className: '',
  onClick: () => {},
};
//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const StyledButton = styled(Button)`
  border: ${props =>
    (props.inverted && `1px solid ${props.theme[`${props.variant}Color`]}`) ||
    'none'
  };
  border-radius: ${props => props.theme.baseRadius};
  cursor: ${props => (props.disabled && 'not-allowed') || 'pointer'};
  display: ${props => (props.expanded && 'block') || 'inline-block'};
  font-size: ${props => (props.size === 'small' && '14px') || '16px'};
  font-weight: 400;
  line-height: ${props =>
    (props.size === 'small' && 2.2) ||
    (props.size === 'large' && 1) ||
    2
  };
  padding: ${props => (props.size === 'large' && '14px 25px') || '0 12px'};
  position: relative;
  text-align: center;
  color: ${props =>
    (props.inverted && props.theme[`${props.variant}Color`]) ||
    (props.type === 'link' && props.theme.linkColor) ||
    'white'
  };
  font-family: ${props => props.theme.baseFontFamily};
  background-color: ${props =>
    ((props.inverted || props.type === 'link') && 'white') ||
    (props.variant && props.theme[`${props.variant}Color`])
  };
  width: ${props => (props.expanded && '100%') || 'auto'};
  opacity: ${props => (props.disabled && 0.5) || 1};
  text-decoration: none;
  &:hover {
    ${props => (props.type === 'link' && 'text-decoration: underline') || 'text-decoration: none'};
  }
`;

StyledButton.propTypes = {
  theme: PropTypes.object.isRequired, // eslint-disable-line
  type: PropTypes.oneOf(['button', 'link', 'text', 'submit']),
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'danger']),
  inverted: PropTypes.bool,
  disabled: PropTypes.bool,
  expanded: PropTypes.bool,
};

StyledButton.defaultProps = {
  type: 'button',
  size: 'normal',
  variant: 'default',
  inverted: false,
  disabled: false,
  expanded: false,
};
//------------------------------------------------------------------------------

export default withTheme(StyledButton);
