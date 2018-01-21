import React from 'react';
import { Link } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { userFragment } from '../../apollo-client/user';
import authPageState, { authPageProps } from '../../hocs/auth-page-state';
import { ResendVerificationLink } from '../../components/smart/auth';
import Title from '../../components/dumb/title';
import Feedback from '../../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class LinkExpiredPage extends React.PureComponent {
  handleSuccess = () => {
    const { handleSuccess, setSuccessMessage } = this.props.authPage;

    // Extend handleSuccess method provided by authPage HOC
    handleSuccess(() => {
      setSuccessMessage('A new email has been sent to your inbox!');
    });
  }

  render() {
    const {
      curUser,
      authPage: {
        errorMsg,
        successMsg,
        disabled,
      },
    } = this.props;

    const resendLink = (
      <ResendVerificationLink
        label="here"
        disabled={disabled}
        onBeforeHook={this.handleBefore}
        onServerErrorHook={this.handleServerError}
        onSuccessHook={this.handleSuccess}
      />
    );

    const resendText = `Please, click ${resendLink} to resend confirmation link.`;

    const loginText = `Please, ${<Link to="/auth">login</Link>} to be able to resend confirmation link.`;

    return (
      <div>
        <Title>The link has expired!</Title>
        <p className="center">
          {curUser ? resendText : loginText}
        </p>
        <Feedback
          loading={disabled}
          errorMsg={errorMsg}
          successMsg={successMsg}
        />
      </div>
    );
  }
}

LinkExpiredPage.propTypes = {
  curUser: propType(userFragment),
  authPage: authPageProps.isRequired,
};

LinkExpiredPage.defaultProps = {
  curUser: null,
};

// authPageState provides common state fields and methods used accross all auth pages.
export default authPageState(LinkExpiredPage);
