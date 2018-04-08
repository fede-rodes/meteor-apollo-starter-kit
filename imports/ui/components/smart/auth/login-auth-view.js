import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import ErrorHandling from '../../../../api/error-handling';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class LoginAuthView extends React.Component {
  state = {
    code: '',
    errors: { code: [] },
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

  validateFields = ({ code }) => {
    // Initialize errors
    const errors = {
      code: [],
    };

    const MAX_CHARS = 30;

    // Sanitize input
    const _code = code && code.trim(); // eslint-disable-line no-underscore-dangle

    if (!_code) {
      errors.code.push('Code is required!');
    } else if (_code.length > MAX_CHARS) {
      errors.code.push(`Must be no more than ${MAX_CHARS} characters!`);
    }

    return errors;
  }

  clearFields = () => {
    this.setState({ code: '' });
  }

  clearErrors = () => {
    this.setState({ errors: { code: [] } });
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
    const { code } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const err1 = this.validateFields({ code });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(err1)) {
      this.setState({ errors: err1 });
      onClientErrorHook(err1);
      return;
    }

    Meteor.loginWithPasswordless({ code }, (err) => {
      if (err) {
        onServerErrorHook(err);
      } else {
        this.clearFields();
        onSuccessHook();
      }
    });
  }

  render() {
    const { btnLabel, disabled } = this.props;
    const { code, errors } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="code"
          type="text"
          label="Access Code"
          value={code}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
          error={ErrorHandling.getFieldErrors(errors, 'code').length > 0}
          helperText={
            ErrorHandling.getFieldErrors(errors, 'code').length > 0
            ? ErrorHandling.getFieldErrors(errors, 'code')
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

LoginAuthView.propTypes = {
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

LoginAuthView.defaultProps = {
  btnLabel: 'Submit',
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

export default LoginAuthView;
