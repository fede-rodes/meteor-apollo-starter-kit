import React from 'react';
import authPageState, { authPageProps } from '../../hocs/auth-page-state';
import AuthPageLayout from '../../layouts/auth-page';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const PAGE = {
  name: 'forgotPassword',
  title: 'Forgot your Password?',
  subtitle: `
    We&apos;ll send a link to your email to reset<br />
    your password and get you back on track.
  `,
  // linkTo: '',
  // linkLabel: '',
  btnLabel: 'Send Link',
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ForgotPasswordPage extends React.PureComponent {
  handleSuccess = () => {
    const { handleSuccess, setSuccessMessage } = this.props.authPage;

    // Extend handleSuccess method provided by authPage HOC
    handleSuccess(() => {
      setSuccessMessage('A new email has been sent to your inbox!');
    });
  }

  render() {
    return (
      <AuthPageLayout
        page={PAGE}
        {...this.props.authPage} // Pass all state fields and methods to AuthPageLayout.
        handleSuccess={this.handleSuccess} // overwrite handleSuccess method provided by authPage HOC.
      />
    );
  }
}

ForgotPasswordPage.propTypes = {
  authPage: authPageProps.isRequired,
};

// authPageState provides common state fields and methods used accross all auth pages.
export default authPageState(ForgotPasswordPage);
