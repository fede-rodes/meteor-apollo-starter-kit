import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import ErrorHandling from '../../../../api/error-handling';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class LoginTokenAuthView extends React.Component {
  state = {
    email: '',
    errors: { email: [] },
  }

  handleChange = ({ target }) => {
    const field = target.id;
    const value = target.value;

    // Update value and clear errors for the given field
    this.setState({
      [field]: value,
      errors: ErrorHandling.clearErrors(this.state.errors, field),
    });
  }

  validateFields = ({ email }) => {
    // Initialize errors
    const errors = {
      email: [],
    };

    const MAX_CHARS = 30;

    // Sanitize input
    const _email = email && email.trim(); // eslint-disable-line no-underscore-dangle

    if (!_email) {
      errors.email.push('Email is required!');
    } else if (!ErrorHandling.isValidEmail(_email)) {
      errors.email.push('Please, provide a valid email address!');
    } else if (_email.length > MAX_CHARS) {
      errors.email.push(`Must be no more than ${MAX_CHARS} characters!`);
    }

    return errors;
  }

  clearFields = () => {
    this.setState({ email: '' });
  }

  clearErrors = () => {
    this.setState({ errors: { email: [] } });
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();

    const {
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
    const { email } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const err1 = this.validateFields({ email });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(err1)) {
      this.setState({ errors: err1 });
      onClientErrorHook(err1);
      return;
    }

    Meteor.sendVerificationCode(email, (err) => {
      if (err) {
        onServerErrorHook(err);
      } else {
        this.clearFields();
        onSuccessHook({ email });
      }
    });
  }

  render() {
    const { btnLabel, disabled } = this.props;
    const { email, errors } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="email"
          type="email"
          label="Email"
          value={email}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
          error={ErrorHandling.getFieldErrors(errors, 'email').length > 0}
          helperText={
            ErrorHandling.getFieldErrors(errors, 'email').length > 0
            ? ErrorHandling.getFieldErrors(errors, 'email')
            : ''
          }
        />
        <div className="mb2" />
        <Button
          type="submit"
          variant="raised"
          color="primary"
          fullWidth
          disabled={disabled}
        >
          {btnLabel}
        </Button>
      </form>
    );
  }
}

LoginTokenAuthView.propTypes = {
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

LoginTokenAuthView.defaultProps = {
  btnLabel: 'Submit',
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

export default LoginTokenAuthView;
