import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import Actions from '../../../api/client/redux/actions.js';
import DefaultLayout from '../../layouts/default/index.jsx';
import FBLoginButton from '../../components/fb-login-button.jsx';

//------------------------------------------------------------------------------
// PAGE COMPONENT DEFINITION:
//------------------------------------------------------------------------------
class LoginPage extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
  }

  render() {
    const { history, client, currentUser } = this.props;
    const { disabled } = this.state;

    return (
      <DefaultLayout>
        {currentUser
          ? 'You\'re already logged in!'
          : (
            <div>
              <FBLoginButton
                disabled={disabled}
                onLoginHook={() => {
                  // OBSERVATION: this code is only reachable when using FB
                  // loginStyle equals 'popup' at serviceConfiguration. In case
                  // loginStyle equals 'redirect' we'll need to get the user
                  // tokens from the cookie since we wont be able to call
                  // resetStore.
                  console.log('[login] success');
                  client.resetStore();
                  history.push('/');
                }}
                onErrorHook={err => console.log(err)}
              />
            </div>
          )
        }
      </DefaultLayout>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    randomString: PropTypes.string.isRequired,
  }),
  reduxState: PropTypes.shape({
    canSubmit: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  reduxActions: PropTypes.object.isRequired,
};

LoginPage.defaultProps = {
  currentUser: null,
};
//------------------------------------------------------------------------------
// REDUX INTEGRATION:
//------------------------------------------------------------------------------
/**
* @summary Wrapper around the 'Page' component to handle UI State (Redux)
* integration.
*/
const namespace = 'login';

function mapStateToProps(state) {
  return { reduxState: state[namespace] };
}

function mapDispatchToProps(dispatch) {
  // Bind actions to current Page (namespace).
  const reduxActions = {
    dispatchSetBooleanField(fieldName, value) {
      return dispatch(Actions.setBooleanField(namespace, fieldName, value));
    },
    dispatchSetErrors(errorsObj) {
      return dispatch(Actions.setErrors(namespace, errorsObj));
    },
    dispatchClearErrors(fieldName) {
      return dispatch(Actions.clearErrors(namespace, fieldName));
    },
  };

  return { reduxActions };
}

// Create enhancer function
const withRedux = connect(mapStateToProps, mapDispatchToProps);
//------------------------------------------------------------------------------

export default withRouter(withApollo(withRedux(LoginPage)));
