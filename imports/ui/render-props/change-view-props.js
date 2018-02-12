import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
/* import {
  servicePropTypes,
  disabledPropTypes,
  messagePropTypes,
} from './index'; */

//------------------------------------------------------------------------------
// PROPS PROVIDER:
//------------------------------------------------------------------------------
class ChangeViewProps extends React.PureComponent {
  changeViewTo = (to, cb) => (
    (evt) => {
      evt.preventDefault();
      // Allow other components to extend changeViewTo default functionality
      if (cb) { cb(); }
      this.props.history.push(to);
    }
  )

  render() {
    const api = {
      changeViewTo: this.changeViewTo,
    };

    return this.props.children(api);
  }
}

ChangeViewProps.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ChangeViewProps);

//------------------------------------------------------------------------------
// PROPS:
//------------------------------------------------------------------------------
export const changeViewPropTypes = {
  changeViewTo: PropTypes.func.isRequired,
};
