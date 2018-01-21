import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AuxFunctions from '../../../api/aux-functions';
import Loading from '../../components/dumb/loading';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class VerifyEmailPage extends React.Component {
  componentWillMount() {
    const { history, match } = this.props;

    // Get token from url params
    const token = (match && match.params && match.params.token) || '';

    Accounts.verifyEmail(token, (err) => {
      if (err) {
        console.log(`[router] ${err.reason}`);
        history.push('/link-expired');
      } else {
        AuxFunctions.delayedAlert('Account verified successfully. Thanks!', 700);
        history.push('/');
      }
    });
  }

  render() {
    return <Loading />;
  }
}

VerifyEmailPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

// withRouter provides access to history.push()
export default withRouter(VerifyEmailPage);
