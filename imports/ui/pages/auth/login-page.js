import React from 'react';
import SEO from '../../components/smart/seo';
import {
  FBAuthBtn,
  LoginTokenAuthView,
  ResendVerificationCode,
  LoginAuthView,
} from '../../components/smart/auth';
import { FormProps, ServiceProps } from '../../render-props';
import AuthPageLayout from '../../layouts/auth-page';
import Feedback from '../../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// After LoginAuthView returns successful, the user logged-in-state will change
// from 'logged out' to 'logged in' automatically. This will trigger the
// LoggedOutRoute component's logic (said component wraps the LoginPage component)
// which will result in redirecting the user to home page automatically.
class LoginPage extends React.PureComponent {
  state = {
    view: 'loginToken',
    email: '',
  }

  render() {
    const { view, email } = this.state;

    return [
      <SEO
        key="seo"
        schema="AboutPage"
        title="Login Page"
        description="A starting point for Meteor applications."
        contentType="product"
      />,
      <FormProps key="view">
        {({
          disabled,
          errorMsg,
          successMsg,
          setSuccessMessage,
          handleBefore,
          handleClientError,
          handleServerError,
          handleSuccess,
        }) => (
          <ServiceProps>
            {({ service, setService }) => (
              <AuthPageLayout
                title={view === 'loginToken' ? 'Login' : 'Enter Pass Code'}
                subtitle={view === 'login' ? 'Haven\'t received the pass code?' : ''}
                link={view === 'login'
                  ? (
                    <ResendVerificationCode
                      email={email}
                      label="Resend it"
                      disabled={disabled}
                      onBeforeHook={() => {
                        // Keep track of the service being used
                        setService('passwordless');
                        handleBefore();
                      }}
                      onServerErrorHook={handleServerError}
                      onSuccessHook={() => {
                        // Extend formProps.handleSuccess' default functionality
                        handleSuccess(() => {
                          // Show success message after action is completed
                          setSuccessMessage('A new email has been sent to your inbox!');
                        });
                      }}
                    />
                  )
                  : null
                }
              >
                {view === 'loginToken' && [
                  <FBAuthBtn
                    key="facebook"
                    btnLabel="Log In with Facebook"
                    disabled={disabled}
                    onBeforeHook={() => {
                      // Keep track of the auth service being used
                      setService('facebook');
                      handleBefore();
                    }}
                    onServerErrorHook={handleServerError}
                    onSuccessHook={handleSuccess}
                  />,
                  <div key="space" className="mb2" />,
                  service === 'facebook' && (
                    <Feedback
                      key="feedback"
                      className="mb2"
                      loading={disabled}
                      errorMsg={errorMsg}
                      successMsg={successMsg}
                    />
                  ),
                  <div key="divider" className="center">
                    - OR -
                  </div>,
                  <LoginTokenAuthView
                    key="passwordless"
                    btnLabel="Send Pass Code"
                    disabled={disabled}
                    onBeforeHook={() => {
                      // Keep track of the service being used
                      setService('passwordless');
                      handleBefore();
                    }}
                    onClientErrorHook={handleClientError}
                    onServerErrorHook={handleServerError}
                    onSuccessHook={(obj) => {
                      // Extend formProps.handleSuccess' default functionality
                      handleSuccess(() => {
                        if (obj && obj.email) {
                          // Show success message after action is completed
                          setSuccessMessage('A new email has been sent to your inbox!');
                          // Switch to login view and store current user's email
                          this.setState({ view: 'login', email: obj.email });
                        }
                      });
                    }}
                  />,
                ]}
                {view === 'login' && (
                  <LoginAuthView
                    btnLabel="Enter"
                    onBeforeHook={() => {
                      // Keep track of the service being used
                      setService('passwordless');
                      handleBefore();
                    }}
                    onClientErrorHook={handleClientError}
                    onServerErrorHook={handleServerError}
                    onSuccessHook={handleSuccess}
                  />
                )}
                <div className="mb2" />
                {service === 'passwordless' && (
                  <Feedback
                    loading={disabled}
                    errorMsg={errorMsg}
                    successMsg={successMsg}
                  />
                )}
              </AuthPageLayout>
            )}
          </ServiceProps>
        )}
      </FormProps>,
    ];
  }
}

export default LoginPage;
