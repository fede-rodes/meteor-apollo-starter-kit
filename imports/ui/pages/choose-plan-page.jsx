import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Elements } from 'react-stripe-elements';
import { propType } from 'graphql-anywhere';
import Alert from 'antd/lib/alert'; // for js
import 'antd/lib/alert/style/css'; // for css
import userFragment from '../apollo-client/fragments/user.graphql';
import StripePlanPicker from '../components/stripe-plan-picker/index.jsx';

//------------------------------------------------------------------------------
// COMPONENT STATES:
//------------------------------------------------------------------------------
const STATES = {
  oneTimeCharge: {
    title: 'Create One Time Charge',
    linkTo: 'subscription',
    linkText: 'create subscription',
    btnText: 'Submit Order',
  },
  subscription: {
    title: 'Create Subscription',
    linkTo: 'oneTimeCharge',
    linkText: 'create one time charge',
    btnText: 'Submit Order',
  },
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ChoosePlanPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'oneTimeCharge',
      disabled: false,
      errorMsg: '',
      successMsg: '',
    };
    this.enableBtn = this.enableBtn.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.clearMessages = this.clearMessages.bind(this);
    this.changeViewTo = this.changeViewTo.bind(this);
    this.handleBefore = this.handleBefore.bind(this);
    this.handleError = this.handleError.bind(this);
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

  handleBefore() {
    // OBSERVATION: this hook allows you to trigger some action
    // before the login request is sent or simply interrupt the
    // login flow by throwing an error.
    this.disableBtn();
    this.clearMessages();
  }

  handleError(err) {
    console.log(err);
    this.enableBtn();
  }

  handleSucess() {
    const { view } = this.state;
    // const { history } = this.props;

    switch (view) {
      case 'oneTimeCharge':
      case 'subscription':
        this.enableBtn();
        this.setState({ successMsg: 'Operation successful!' });
        // history.push('/');
        break;
      default:
        throw new Error('Unknown view option!');
    }
  }

  render() {
    const { view, disabled, errorMsg, successMsg } = this.state;
    const { curUser } = this.props;
    const { title, linkTo, linkText, btnText } = STATES[view];

    return (
      <div className="full-width">
        <h1 className="center">{title}</h1>
        <p className="center">
          {linkTo && linkText && (
            <span> Or:&nbsp;
              <a href={`/${linkTo}`} onClick={this.changeViewTo(linkTo)}>
                {linkText}
              </a>
            </span>
          )}
        </p>
        <Elements>
          <StripePlanPicker
            view={view}
            curUser={curUser}
            btnText={btnText}
            disabled={disabled}
            onBeforeHook={this.handleBefore}
            onClientErrorHook={this.handleError}
            onServerErrorHook={this.handleError}
            onSucessHook={this.handleSucess}
          />
        </Elements>
        {errorMsg && errorMsg.length > 0 && (
          <Alert type="error" message={errorMsg} className="mt1" banner />
        )}
        {successMsg && successMsg.length > 0 && (
          <Alert type="success" message={successMsg} className="mt1" banner />
        )}
        <Link to="/" className="block mt2">Go back Home</Link>
      </div>
    );
  }
}

ChoosePlanPage.propTypes = {
  curUser: propType(userFragment).isRequired,
  /* history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired, */
};

export default withRouter(ChoosePlanPage);
