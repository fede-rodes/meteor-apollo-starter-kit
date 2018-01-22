import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import authPageState, { authPageProps } from '../../hocs/auth-page-state';
import AuxFunctions from '../../../api/aux-functions';
import AuthPageLayout from '../../layouts/auth-page';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const PAGE = {
  name: 'resetPassword',
  title: 'Reset your Password',
  // subtitle: '',
  // linkTo: '',
  // linkLabel: '',
  btnLabel: 'Reset Password',
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ResetPasswordPage extends React.PureComponent {
  handleSuccess = () => {
    const { handleSuccess } = this.props.authPage;

    // Extend handleSuccess method provided by authPage HOC
    handleSuccess(() => {
      AuxFunctions.delayedAlert('Password reset successfully!', 700);
    });

    // At this point, the user logged-in-state will change from 'logged out'
    // to 'logged in'. This will trigger the LoggedOutRoute component's
    // logic which will result in redirecting the user to home page '/'.
  }

  render() {
    const { token = '' } = this.props.match.params;

    return (
      <AuthPageLayout
        page={PAGE}
        token={token}
        {...this.props.authPage} // Pass all state fields and methods to AuthPageLayout.
        handleSuccess={this.handleSuccess} // overwrite handleSuccess method provided by authPage HOC.
      />
    );
  }
}

ResetPasswordPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string, // only required for resetPassword view
    }).isRequired,
  }).isRequired,
  authPage: authPageProps.isRequired,
};

const enhance = compose(
  withRouter, // provides access to match.params.
  authPageState, // provides common state fields and methods used accross all auth pages.
);

export default enhance(ResetPasswordPage);
