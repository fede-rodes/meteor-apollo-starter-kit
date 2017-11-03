import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ResendConfirmationLink from '../components/password-auth/resend-confirmation-link.jsx';
import DefaultLayout from '../layouts/default/index.jsx';
// import Users from '../../../api/users/namespace.js';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class LinkExpiredPage extends React.Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleBefore = this.handleBefore.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
    this.handleSucess = this.handleSucess.bind(this);
    this.state = {
      loading: false,
    };
  }

  handleBefore() {
    // OBSERVATION: this hook allows you to trigger some action
    // before the resend link request is sent or simply interrupt the
    // normal flow by throwing an error.
    this.setState({ loading: true });
  }

  handleServerError(err) {
    console.log(err);
    this.setState({ loading: false });
  }

  handleSucess() {
    this.setState({ loading: false });
    // TODO: Display success message on UI
  }

  render() {
    const { curUser } = this.props;
    const { loading } = this.state;

    const text = curUser
      ? (
        <ResendConfirmationLink
          onBeforeHook={this.handleBefore}
          onServerErrorHook={this.handleServerError}
          onSucessHook={this.handleSucess}
        />
      )
      : (
        <p className="center">
          Please, <Link to="/auth">login</Link> to be able to <strong>resend confirmation link</strong>.
        </p>
      );

    return (
      <DefaultLayout>
        <h1 className="center">The link has expired!</h1>
        {text}
        {loading && (
          <p className="center mt2">loading...</p>
        )}
      </DefaultLayout>
    );
  }
}

LinkExpiredPage.propTypes = {
  curUser: PropTypes.shape({
    _id: PropTypes.string,
    randomString: PropTypes.string,
  }),
};

LinkExpiredPage.defaultProps = {
  curUser: null,
};
//------------------------------------------------------------------------------

export default LinkExpiredPage;
