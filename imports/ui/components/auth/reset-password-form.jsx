import { Accounts } from 'meteor/accounts-base';
import { compose } from 'recompose';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Form from 'antd/lib/form'; // for js
import 'antd/lib/form/style/css'; // for css
import Input from 'antd/lib/input'; // for js
import 'antd/lib/input/style/css'; // for css
import Button from 'antd/lib/button'; // for js
import 'antd/lib/button/style/css'; // for css
import Icon from 'antd/lib/icon'; // for js
import 'antd/lib/icon/style/css'; // for css
import Alert from 'antd/lib/alert'; // for js
import 'antd/lib/alert/style/css'; // for css

const FormItem = Form.Item;

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { serverError: '', serverSuccess: '' };
    this.displayServerError = this.displayServerError.bind(this);
    this.clearMessages = this.clearMessages.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  displayServerError({ message }) {
    this.setState({ serverError: message || 'Unexpected error' });
  }

  clearMessages() {
    this.setState({ serverError: '', serverSuccess: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const {
      token,
      onBeforeHook,
      onClientErrorHook,
      onServerErrorHook,
      onSucessHook,
      form,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    this.clearMessages();

    form.validateFields((err1, { password }) => {
      if (err1) {
        onClientErrorHook(err1);
      } else {
        Accounts.resetPassword(token, password, (err2) => {
          if (err2) {
            this.displayServerError(err2);
            onServerErrorHook(err2);
          } else {
            onSucessHook();
          }
        });
      }
    });
  }

  render() {
    const { serverError, serverSuccess } = this.state;
    const { disabled, form: { getFieldDecorator } } = this.props;

    return (
      <div className="full-width">
        <h1 className="center">Reset Your Password</h1>
        <Form onSubmit={this.handleSubmit} className="mt2">
          <FormItem label="Password">
            {getFieldDecorator('password', {
              validateTrigger: 'onSubmit',
              rules: [
                { required: true, message: 'Password is required' },
                { min: 6, message: 'Please, at least 6 characters long' },
                { max: 100, message: 'Must be no more than 100 characters!' },
              ],
            })(
              <Input
                type="password"
                prefix={<Icon type="lock" />}
                placeholder="Password"
              />,
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={disabled}
              loading={disabled}
              size="large"
              className="full-width"
            >
              Set New Password
            </Button>
            {serverError && serverError.length > 0 && (
              <Alert type="error" message={serverError} className="mt1" banner />
            )}
            {serverSuccess && serverSuccess.length > 0 && (
              <Alert type="success" message={serverSuccess} className="mt1" banner />
            )}
          </FormItem>
        </Form>
        <p className="center mt2">
          <Link to="/auth/forgot-password">Resend reset password link</Link>
        </p>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  token: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSucessHook: PropTypes.func,
};

ResetPasswordForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSignupSucessHook: () => {},
  onSucessHook: () => {},
};

const enhance = compose(
  Form.create(), // Antd HOC for error handling
);

export default enhance(ResetPasswordForm);
