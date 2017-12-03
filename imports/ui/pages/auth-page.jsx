import React from 'react';
import { PasswordAuthViews, FBAuthBtn } from '../components/auth/index.js';
import Loading from '../components/loading/index.jsx';
import Alert from '../components/alert/index.jsx';

//------------------------------------------------------------------------------
// COMPONENT STATES:
//------------------------------------------------------------------------------
const STATES = {
  login: {
    title: 'Log In',
    subtitle: 'Don&apos;t have an account?&nbsp;',
    linkTo: 'signup',
    linkLabel: 'Sign Up',
    btnLabel: 'Log In',
  },
  signup: {
    title: 'Sign Up',
    subtitle: 'Already have an account?&nbsp;',
    linkTo: 'login',
    linkLabel: 'Log In',
    btnLabel: 'Sign Up',
  },
  forgotPassword: {
    title: 'Forgot your Password?',
    subtitle: `
      We&apos;ll send a link to your email to reset<br />
      your password and get you back on track.
    `,
    // linkTo: '',
    // linkLabel: '',
    btnLabel: 'Send Link',
  },
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'login',
      service: '', // ['password', 'facebook']
      disabled: false,
      errorMsg: '',
      successMsg: '',
    };
    this.enableBtn = this.enableBtn.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.clearMessages = this.clearMessages.bind(this);
    this.changeViewTo = this.changeViewTo.bind(this);
    this.handleBefore = this.handleBefore.bind(this);
    this.handleClientError = this.handleClientError.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
    this.handleSucess = this.handleSucess.bind(this);
  }

  enableBtn() {
    this.setState({ disabled: false });
  }

  disableBtn() {
    this.setState({ disabled: true });
  }

  clearMessages() {
    this.setState({ errorMsg: '', successMsg: '' });
  }

  changeViewTo(to) {
    return (evt) => {
      evt.preventDefault();
      this.clearMessages();
      this.setState({ view: to });
    };
  }

  handleBefore({ service }) {
    // OBSERVATION: this hook allows you to trigger some action(s)
    // before the login request is sent or simply interrupt the normal
    // login flow by throwing an error.

    // Keep track of the service that has been fired so that we can display
    // messages (error/success) accordingly
    this.setState({ service });
    this.disableBtn();
    this.clearMessages();
  }

  handleClientError(err) {
    console.log(err);
    this.enableBtn();
  }

  handleServerError(err) {
    console.log(err);
    this.setState({ errorMsg: err.reason || err.message || 'Unexpected error' });
    this.enableBtn();
  }

  handleSucess() {
    const { view } = this.state;

    switch (view) {
      case 'login':
      case 'signup':
        // OBSERVATION: in case of FB login, this code is only reachable when
        // using FB loginStyle equals 'popup' at serviceConfiguration. In case
        // loginStyle equals 'redirect' you'll need to use Accounts.onLogin() to
        // listen to state changes. See GlobalDataProvider.componentWillMount().
        this.enableBtn();
        // At this point either the requested url-page will be rendered (if
        // overlayComponent is being used in LoggedInRoute) or the user will be
        // automatically redirected to home '/' (in case redirectTo option is
        // used at LoggedInRoute)
        break;
      case 'forgotPassword':
        this.enableBtn();
        this.setState({ successMsg: 'A new email has been sent to your inbox!' });
        break;
      default:
        throw new Error('Unknown view option!');
    }
  }

  render() {
    const { view, disabled, service, errorMsg, successMsg } = this.state;
    const { title, subtitle, linkTo, linkLabel, btnLabel } = STATES[view];

    return (
      <div>
        <h1 className="center">{title}</h1>
        <p className="center">
          <span dangerouslySetInnerHTML={{ __html: subtitle }} />
          {linkTo && linkLabel && (
            <a href={`/${linkTo}`} onClick={this.changeViewTo(linkTo)}>
              {linkLabel}
            </a>
          )}
        </p>
        <PasswordAuthViews
          view={view}
          btnLabel={btnLabel}
          disabled={disabled}
          onBeforeHook={() => this.handleBefore({ service: 'password' })}
          onClientErrorHook={this.handleClientError}
          onServerErrorHook={this.handleServerError}
          onSucessHook={this.handleSucess}
        />
        {service === 'password' && (
          <div>
            {disabled && <Loading className="center" />}
            <Alert type="error" content={errorMsg} />
            <Alert type="success" content={successMsg} />
          </div>
        )}
        {view === 'login' && (
          <p className="center">
            <a href="/forgot-password" onClick={this.changeViewTo('forgotPassword')}>
              Forgot password?
            </a>
          </p>
        )}
        {view === 'forgotPassword' && (
          <p className="center">
            <a href="/login" onClick={this.changeViewTo('login')}>
              Log in
            </a>
            &nbsp;|&nbsp;
            <a href="/signup" onClick={this.changeViewTo('signup')}>
              Sign up
            </a>
          </p>
        )}
        {['login', 'signup'].indexOf(view) !== -1 && (
          <div>
            <div className="center">
              - OR -
            </div>
            <FBAuthBtn
              key="fb-btn"
              btnLabel="Continue with facebook"
              disabled={disabled}
              onBeforeHook={() => this.handleBefore({ service: 'facebook' })}
              onServerErrorHook={this.handleServerError}
              onSucessHook={this.handleSucess}
            />
          </div>
        )}
        {service === 'facebook' && (
          <div>
            {disabled && <Loading className="center" />}
            <Alert type="error" content={errorMsg} />
            <Alert type="success" content={successMsg} />
          </div>
        )}
      </div>
    );
  }
}

export default AuthPage;
