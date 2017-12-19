import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Loading from '../components/dumb/loading';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class VerifyEmailPage extends React.Component {
  componentWillMount() {
    const { history, match } = this.props;
    const token = (match && match.params && match.params.token) || '';
    console.log('heloo');

    // QUESTION: what about Accounts._verifyEmailToken?

    Accounts.verifyEmail(token, (err) => {
      if (err) {
        console.log(`[router] ${err.reason}`);
        history.push('/link-expired');
      } else {
        const handler = Meteor.setTimeout(() => {
          alert('Account verified successfully. Thanks!');
          Meteor.clearTimeout(handler);
        }, 1000);
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
