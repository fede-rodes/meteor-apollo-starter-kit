import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/smart/seo';
import {
  LoginTokenAuthView,
  ResendVerificationCode,
  LoginAuthView,
} from '../../components/smart/auth';
import FormProps from '../../render-props/form-props';
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
          <AuthPageLayout
            title={view === 'loginToken'
              ? 'Login'
              : 'Enter your access code below'
            }
            subtitle={view === 'loginToken'
              ? ''
              : 'Haven\'t received the verification code?'
            }
            link={view === 'loginToken'
              ? null
              : (
                <ResendVerificationCode
                  email={email}
                  label="Resend it"
                  disabled={disabled}
                  onBeforeHook={handleBefore}
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
            }
          >
            {view === 'loginToken' && (
              <LoginTokenAuthView
                btnLabel="Send Access Code"
                disabled={disabled}
                onBeforeHook={handleBefore}
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
              />
            )}
            {view === 'login' && (
              <LoginAuthView
                btnLabel="See Registration Details"
                disabled={disabled}
                onBeforeHook={handleBefore}
                onClientErrorHook={handleClientError}
                onServerErrorHook={handleServerError}
                onSuccessHook={handleSuccess}
              />
            )}
            <div className="mb2" />
            <Feedback
              className="mb2"
              loading={disabled}
              errorMsg={errorMsg}
              successMsg={successMsg}
            />
          </AuthPageLayout>
        )}
      </FormProps>,
    ];
  }
}

export default LoginPage;
