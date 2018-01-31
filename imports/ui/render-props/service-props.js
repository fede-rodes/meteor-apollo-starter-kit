import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// PROPS PROVIDER:
//------------------------------------------------------------------------------
class ServiceProps extends React.PureComponent {
  state = {
    service: '', // auth service type: 'password' or 'facebook'
  }

  setService = (service) => {
    this.setState({ service });
  }

  clearService = () => {
    this.setState({ service: '' });
  }

  render() {
    const { service } = this.state;

    const ui = {
      service,
      setService: this.setService,
      clearService: this.clearService,
    };

    return this.props.children(ui);
  }
}

export default ServiceProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const disabledPropTypes = {
  service: PropTypes.string.isRequired,
  setService: PropTypes.func.isRequired,
  clearService: PropTypes.func.isRequired,
};
