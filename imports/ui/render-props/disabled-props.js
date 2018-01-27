import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// PROPS PROVIDER:
//------------------------------------------------------------------------------
class DisabledProps extends React.PureComponent {
  state = {
    disabled: false,
  }

  disableBtn = () => {
    this.setState({ disabled: true });
  }

  enableBtn = () => {
    this.setState({ disabled: false });
  }

  render() {
    const { disabled } = this.state;

    const ui = {
      disabled,
      disableBtn: this.disableBtn,
      enableBtn: this.enableBtn,
    };

    return this.props.children(ui);
  }
}

export default DisabledProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const disabledPropTypes = {
  disabled: PropTypes.bool.isRequired,
  disableBtn: PropTypes.func.isRequired,
  enableBtn: PropTypes.func.isRequired,
};
