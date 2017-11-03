import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import message from 'antd/lib/message'; // for js
import 'antd/lib/message/style/css'; // for css
import Loading from '../components/loading.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class VerifyEmailPage extends React.Component {
  componentWillMount() {
    const { history, match } = this.props;
    const token = (match && match.params && match.params.token) || '';

    // Verify email account using token
    Accounts.verifyEmail(token, (err) => {
      if (err) {
        console.log(`[router] ${err.reason}`);
        history.push('/link-expired');
      } else {
        message.success('Account verified successfully. Thanks!');
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

export default VerifyEmailPage;
