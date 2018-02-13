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
    this.setState(() => ({ service }));
  }

  clearService = () => {
    this.setState(() => ({ service: '' }));
  }

  render() {
    const { service } = this.state;

    const api = {
      service,
      setService: this.setService,
      clearService: this.clearService,
    };

    return this.props.children(api);
  }
}

export default ServiceProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const servicePropTypes = {
  service: PropTypes.string.isRequired,
  setService: PropTypes.func.isRequired,
  clearService: PropTypes.func.isRequired,
};
