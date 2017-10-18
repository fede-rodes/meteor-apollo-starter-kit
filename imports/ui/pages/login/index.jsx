import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import DefaultLayout from '../../layouts/default/index.jsx';
import FBLoginButton from '../../components/fb-login-button.jsx';

//------------------------------------------------------------------------------
// PAGE COMPONENT DEFINITION:
//------------------------------------------------------------------------------
class LoginPage extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.enableBtn = this.enableBtn.bind(this);
    this.state = {
      disabled: false,
    };
  }

  disableBtn() {
    this.setState({ disabled: true });
  }

  enableBtn() {
    this.setState({ disabled: false });
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
                onBeforeHook={() => this.disableBtn()}
                onErrorHook={(err) => {
                  console.log(err);
                  this.enableBtn();
                }}
                onLoginHook={() => {
                  // OBSERVATION: this code is only reachable when using FB
                  // loginStyle equals 'popup' at serviceConfiguration. In case
                  // loginStyle equals 'redirect' we'll need to get the user
                  // tokens from the cookie since we wont be able to call
                  // resetStore.
                  console.log('[login] success');
                  client.resetStore();
                  this.enableBtn();
                  history.push('/');
                }}
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
};

LoginPage.defaultProps = {
  currentUser: null,
};

const enhance = compose(
  withRouter,
  withApollo,
);

export default enhance(LoginPage);
