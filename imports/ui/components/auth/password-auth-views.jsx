import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import Form from '../form/index.jsx';
import Fieldset from '../fieldset/index.jsx';
import Label from '../label/index.jsx';
import Input from '../input/index.jsx';
import Message from '../message/index.jsx';
import Button from '../button/index.jsx';
import ErrorHandling from '../../../api/error-handling.js';

//------------------------------------------------------------------------------
// COMPONENT STATES:
//------------------------------------------------------------------------------
const STATES = {
  login: { fields: ['email', 'password'] },
  signup: { fields: ['email', 'password'] },
  forgotPassword: { fields: ['email'] },
  resetPassword: { fields: ['password'] },
};
//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
// Determine if a given field is being used (active) for the current view
const isActiveField = (view, field) => {
  // Get list of active fields for the current view ('email' and/or 'password')
  const activeFields = STATES[view].fields;

  // Return whether or not the given field is in the active list
  return activeFields.indexOf(field) !== -1;
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PasswordAuthViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: { email: [], password: [] },
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const field = evt.target.id;
    const value = evt.target.value;
    const errors = this.state.errors;

    // Update value and clear errors for the given field
    this.setState({
      [field]: value,
      errors: ErrorHandling.clearErrors(errors, field),
    });
  }

  validateFields({ email, password }) {
    // Get current view ('login', 'signup', 'forgotPassword', 'resetPassword')
    const { view } = this.props;

    // Initialize errors
    const errors = {
      email: [],
      password: [],
    };

    // Validate active fields
    const MIN_CHARS = 6;
    const MAX_CHARS = 30;

    if (isActiveField(view, 'email')) {
      // Sanitize input
      const _email = email && email.trim(); // eslint-disable-line

      if (!_email) {
        errors.email.push('Email is required!');
      } else if (!ErrorHandling.isValidEmail(_email)) {
        errors.email.push('Please, provide a valid email address!');
      } else if (_email.length > MAX_CHARS) {
        errors.email.push(`Must be no more than ${MAX_CHARS} characters!`);
      }
    }

    if (isActiveField(view, 'password')) {
      // Do not sanitize password, spaces are valid characters in this case
      if (!password) {
        errors.password.push('Password is required!');
      } else if (password.length < MIN_CHARS) {
        errors.password.push(`Please, at least ${MIN_CHARS} characters long!`);
      }
    }

    return errors;
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const {
      view,
      token,
      onBeforeHook,
      onClientErrorHook,
      onServerErrorHook,
      onSucessHook,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Get field value
    const { email, password } = this.state;

    // Clear previous errors if any
    this.setState({ errors: { email: [], password: [] } });

    // Check for errors
    const err1 = this.validateFields({ email, password });
    if (ErrorHandling.hasErrors(err1)) {
      // Display errors on UI
      this.setState({ errors: err1 });
      // Return handler to client
      onClientErrorHook(err1);
      return;
    }

    switch (view) {
      case 'login': {
        Meteor.loginWithPassword(email, password, (err2) => {
          if (err2) {
            onServerErrorHook(err2);
          } else {
            onSucessHook();
          }
        });
        break;
      }
      case 'signup': {
        Accounts.createUser({ email, password }, (err2) => {
          if (err2) {
            onServerErrorHook(err2);
          } else {
            // OBSERVATION: see /entry-points/server/configs/accounts-config.js
            // for sendVerificationEmail logic
            onSucessHook();
          }
        });
        break;
      }
      case 'forgotPassword': {
        Accounts.forgotPassword({ email }, (err2) => {
          if (err2) {
            onServerErrorHook(err2);
          } else {
            this.setState({ serverSuccess: 'A new email has been sent to your inbox!' });
            onSucessHook();
          }
        });
        break;
      }
      case 'resetPassword': {
        Accounts.resetPassword(token, password, (err2) => {
          if (err2) {
            onServerErrorHook(err2);
          } else {
            onSucessHook();
          }
        });
        break;
      }
      default:
        onClientErrorHook('Unknown view option!');
        break;
    }
  }

  render() {
    const { email, password, errors } = this.state;
    const { view, btnLabel, disabled } = this.props;
    const { fields } = STATES[view];

    return (
      <Form onSubmit={this.handleSubmit} className="mt2">
        {fields.indexOf('email') !== -1 && (
          <Fieldset className="mt2">
            <Label htmlFor="email" required>
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
        {fields.indexOf('password') !== -1 && (
          <Fieldset className="mt2">
            <Label htmlFor="password" required>
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
  view: PropTypes.oneOf([
    'login',
    'signup',
    'forgotPassword',
    'resetPassword',
  ]).isRequired,
  token: PropTypes.string,
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSucessHook: PropTypes.func,
};

PasswordAuthViews.defaultProps = {
  token: '',
  btnLabel: 'Submit',
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSucessHook: () => {},
};

export default PasswordAuthViews;
