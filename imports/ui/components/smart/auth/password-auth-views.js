import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Form from '../../dumb/form';
import Fieldset from '../../dumb/fieldset';
import Label from '../../dumb/label';
import Input from '../../dumb/input';
import Message from '../../dumb/message';
import Button from '../../dumb/button';
import ErrorHandling from '../../../../api/error-handling';
import sendVerificationEmailMutation from './mutations.graphql';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const VIEWS = {
  login: { fields: ['email', 'password'] },
  signup: { fields: ['email', 'password'] },
  forgotPassword: { fields: ['email'] },
  resetPassword: { fields: ['password'] },
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PasswordAuthViews extends React.Component {
  state = {
    email: '',
    password: '',
    errors: { email: [], password: [] },
  }

  // Whether or not the given field is present in the current view.
  isActiveField = (field) => {
    const { view } = this.props;

    // Get list of active fields for the current view ('email' and/or 'password')
    const activeFields = VIEWS[view].fields;

    // Return whether or not the given field is present in the active list
    return activeFields.indexOf(field) !== -1;
  }

  handleChange = (evt) => {
    const field = evt.target.id;
    const value = evt.target.value;
    const errors = this.state.errors;

    // Update value and clear errors for the given field
    this.setState({
      [field]: value,
      errors: ErrorHandling.clearErrors(errors, field),
    });
  }

  validateFields = ({ email, password }) => {
    // Initialize errors
    const errors = {
      email: [],
      password: [],
    };

    const MIN_CHARS = 6;
    const MAX_CHARS = 30;

    if (this.isActiveField('email')) {
      // Sanitize input
      const _email = email && email.trim(); // eslint-disable-line no-underscore-dangle

      if (!_email) {
        errors.email.push('Email is required!');
      } else if (!ErrorHandling.isValidEmail(_email)) {
        errors.email.push('Please, provide a valid email address!');
      } else if (_email.length > MAX_CHARS) {
        errors.email.push(`Must be no more than ${MAX_CHARS} characters!`);
      }
    }

    if (this.isActiveField('password')) {
      // Do not sanitize password, spaces are valid characters in this case
      if (!password) {
        errors.password.push('Password is required!');
      } else if (password.length < MIN_CHARS) {
        errors.password.push(`Please, at least ${MIN_CHARS} characters long!`);
      } else if (password.length > MAX_CHARS) {
        errors.password.push(`Must be no more than ${MAX_CHARS} characters!`);
      }
    }

    return errors;
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const {
      view,
      token,
      sendVerificationEmail,
      onBeforeHook,
      onClientErrorHook,
      onServerErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Get field values
    const { email, password } = this.state;

    // Clear previous errors if any
    this.setState({ errors: { email: [], password: [] } });

    // Validate fields
    const err1 = this.validateFields({ email, password });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(err1)) {
      this.setState({ errors: err1 });
      onClientErrorHook(err1);
      return;
    }

    // Define a callback function for handling login, signup and forgot/reset
    // password operation's response
    const handleResponse = promise => (
      (err2) => {
        if (err2) {
          onServerErrorHook(err2);
        } else {
          // Clear fields
          this.setState({ email: '', password: '' });
          // Give handleResponse some flexibility: allow a promise to be fired
          // on success response; swallow any errors that may occur
          if (promise) { promise().then(() => {}).catch(() => {}); }
          // Pass event up to parent component
          onSuccessHook();
        }
      }
    );

    switch (view) {
      case 'login': {
        Meteor.loginWithPassword(email, password, handleResponse());
        break;
      }
      case 'signup': {
        // In case of signup, send verification email on success response
        Accounts.createUser({ email, password }, handleResponse(sendVerificationEmail));
        break;
      }
      case 'forgotPassword': {
        Accounts.forgotPassword({ email }, handleResponse());
        break;
      }
      case 'resetPassword': {
        Accounts.resetPassword(token, password, handleResponse());
        break;
      }
      default:
        onClientErrorHook('Unknown view option!', view);
        break;
    }
  }

  render() {
    const { email, password, errors } = this.state;
    const { btnLabel, disabled } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="my2">
        {this.isActiveField('email') && (
          <Fieldset className="mt2">
            <Label htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
            <Message
              type="error"
              content={ErrorHandling.getFieldErrors(errors, 'email')}
            />
          </Fieldset>
        )}
        {this.isActiveField('password') && (
          <Fieldset className="mt2">
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            <Message
              type="error"
              content={ErrorHandling.getFieldErrors(errors, 'password')}
            />
          </Fieldset>
        )}
        <Fieldset className="mt3">
          <Button
            type="submit"
            variant="primary"
            disabled={disabled}
            size="large"
            expanded
          >
            {btnLabel}
          </Button>
        </Fieldset>
      </Form>
    );
  }
}

PasswordAuthViews.propTypes = {
  view: PropTypes.oneOf(Object.keys(VIEWS)).isRequired,
  token: PropTypes.string,
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  sendVerificationEmail: PropTypes.func.isRequired,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

PasswordAuthViews.defaultProps = {
  token: '',
  btnLabel: 'Submit',
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

// Apollo integration
const withMutation = graphql(sendVerificationEmailMutation, { name: 'sendVerificationEmail' });

export default withMutation(PasswordAuthViews);
