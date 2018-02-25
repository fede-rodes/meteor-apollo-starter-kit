import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
// Note that when you style a component, you need to make sure that your
// component has this.props.className attached to its DOM. Because after
// Style-Components generated a unique class name, it will pass the class name
// to your component. If you are not sure whether a third party component has
// this.props.className or not, you can simply wrap it up in your own
// <div className={this.props.className}> tag.
const StyledButton = styled(Button)`
  border: ${props =>
    (props.inverted && `1px solid ${props.theme.color[props.variant]}`) ||
    'none'
  };
  border-radius: 2px;
  cursor: ${props => (props.disabled && 'not-allowed') || 'pointer'};
  display: ${props => (props.expanded && 'block') || 'inline-block'};
  font-size: ${props =>
    (props.size === 'small' && props.theme.fontSize.small) ||
    'initial'
  };
  font-weight: 400;
  line-height: ${props =>
    (props.type !== 'link' && (
      (props.size === 'small' && 2.2) ||
      (props.size === 'large' && 1) ||
      2
    ))
  };
  padding: ${props => (props.type !== 'link' && ((props.size === 'large' && '14px 25px') || '0 12px'))};
  position: relative;
  text-align: (props.type === 'button' && center);
  color: ${props =>
    (props.inverted && props.variant && props.theme.color[props.variant]) ||
    (props.type === 'link' && props.theme.color.link) ||
    'white'
  };
  background-color: ${props =>
    ((props.inverted || props.type === 'link') && 'white') ||
    (props.variant && props.theme.color[props.variant])
  };
  width: ${props => (props.expanded && '100%') || 'auto'};
  opacity: ${props => (props.disabled && 0.5) || 1};
  text-decoration: none;
  &:hover {
    ${props => (props.type === 'link' && 'text-decoration: underline') || 'text-decoration: none'};
  }
`;

StyledButton.propTypes = {
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

export default StyledButton;
