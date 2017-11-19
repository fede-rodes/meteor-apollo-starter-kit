import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { PasswordAuthViews, FBAuthBtn } from '../components/auth/index.js';

//------------------------------------------------------------------------------
// AUX COMPONENT:
//------------------------------------------------------------------------------
const Divider = () => (
  <div className="full-width center p2">
    - OR -
  </div>
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: 'login', disabled: false };
    this.handleViewChange = this.handleViewChange.bind(this);
    this.enableBtn = this.enableBtn.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.handleBefore = this.handleBefore.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSucess = this.handleSucess.bind(this);
  }

  handleViewChange(view) {
    this.setState({ view });
  }

  enableBtn() {
    this.setState({ disabled: false });
  }

  disableBtn() {
    this.setState({ disabled: true });
  }

  handleBefore() {
    // OBSERVATION: this hook allows you to trigger some action
    // before the login request is sent or simply interrupt the
    // login flow by throwing an error.
    this.disableBtn();
  }

  handleError(err) {
    console.log(err);
    this.enableBtn();
  }

  handleSucess() {
    const { view } = this.state;
    const { client } = this.props;

    switch (view) {
      case 'login':
      case 'signup':
        // OBSERVATION: when using FB service, this code is only reachable when
        // using loginStyle equals 'popup' at serviceConfiguration. In case
        // loginStyle equals 'redirect' we'll need to get (TODO) the user tokens
        // from the cookie since we wont be able to call resetStore.
        client.resetStore();
        this.enableBtn();
        // At this point either the requested url-page will be rendered (if
        // overlayComponent is being used in LoggedInRoute) or the user will be
        // redirected to home '/' (in case redirectTo option is used at
        // LoggedInRoute)
        break;
      case 'forgotPassword':
        this.enableBtn();
        break;
      default:
        throw new Error('Unknown view option!');
    }
  }

  render() {
    const { view, disabled } = this.state;

    return (
      <div className="full-width">
        <PasswordAuthViews
          view={view}
          onViewChange={this.handleViewChange}
          disabled={disabled}
          onBeforeHook={this.handleBefore}
          onClientErrorHook={this.handleError}
          onServerErrorHook={this.handleError}
          onSucessHook={this.handleSucess}
        />
        {['login', 'signup'].indexOf(view) !== -1 && (
          <div className="full-width">
            <Divider key="divider" />
            <FBAuthBtn
              key="fb-btn"
              btnText="Continue with facebook"
              disabled={disabled}
              onBeforeHook={this.handleBefore}
              onServerErrorHook={this.handleError}
              onSucessHook={this.handleSucess}
            />
          </div>
        )}
      </div>
    );
  }
}

AuthPage.propTypes = {
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(AuthPage);
