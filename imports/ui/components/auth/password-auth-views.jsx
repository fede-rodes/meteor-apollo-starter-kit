import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { compose } from 'recompose';
import React from 'react';
import PropTypes from 'prop-types';
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
// COMPONENT STATES:
//------------------------------------------------------------------------------
const STATES = {
  login: {
    title: 'Log In',
    subtitle: 'Don&apos;t have an account?&nbsp;',
    linkTo: 'signup',
    linkText: 'Sign Up',
    fields: ['email', 'password'],
    btnText: 'Log In',
  },
  signup: {
    title: 'Sign Up',
    subtitle: 'Already have an account?&nbsp;',
    linkTo: 'login',
    linkText: 'Log In',
    fields: ['email', 'password'],
    btnText: 'Sign Up',
  },
  forgotPassword: {
    title: 'Forgot your Password?',
    subtitle: `We&apos;ll send a link to your email to reset<br />
    your password and get you back on track.`,
    // linkTo: '',
    // linkText: '',
    fields: ['email'],
    btnText: 'Send Link',
  },
  resetPassword: {
    title: 'Reset your Password',
    // subtitle: '',
    // linkTo: '',
    // linkText: '',
    fields: ['password'],
    btnText: 'Set New Password',
  },
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PasswordAuthViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { serverError: '', serverSuccess: '' };
    this.displayServerError = this.displayServerError.bind(this);
    this.clearMessages = this.clearMessages.bind(this);
    this.changeViewTo = this.changeViewTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  displayServerError({ message }) {
    this.setState({ serverError: message || 'Unexpected error' });
  }

  clearMessages() {
    this.setState({ serverError: '', serverSuccess: '' });
  }

  changeViewTo(to) {
    return (evt) => {
      evt.preventDefault();
      this.clearMessages();
      this.props.onViewChange(to);
    };
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
      form,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    this.clearMessages();

    form.validateFields((err1, { email, password }) => {
      if (err1) {
        onClientErrorHook(err1);
      } else {
        switch (view) {
          case 'login': {
            Meteor.loginWithPassword(email, password, (err2) => {
              if (err2) {
                // Display server error on UI
                this.displayServerError(err2);
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
                // Display server error on UI
                this.displayServerError(err2);
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
                // Display server error on UI
                this.displayServerError(err2);
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
                this.displayServerError(err2);
                onServerErrorHook(err2);
              } else {
                onSucessHook();
              }
            });
            break;
          }
          default:
            onServerErrorHook('Unknown view option!');
            break;
        }
      }
    });
  }

  render() {
    const { serverError, serverSuccess } = this.state;
    const { view, disabled, form: { getFieldDecorator } } = this.props;
    const { title, subtitle, linkTo, linkText, fields, btnText } = STATES[view];

    return (
      <div className="full-width">
        <h1 className="center">{title}</h1>
        <p className="center">
          <span dangerouslySetInnerHTML={{ __html: subtitle }} />
          {linkTo && linkText && (
            <a href={`/${linkTo}`} onClick={this.changeViewTo(linkTo)}>
              {linkText}
            </a>
          )}
        </p>
        <Form onSubmit={this.handleSubmit} className="mt2">
          {fields.indexOf('email') !== -1 && (
            <FormItem label="Email">
              {getFieldDecorator('email', {
                validateTrigger: 'onSubmit',
                rules: [
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Please, provide a valid email address' },
                  { max: 100, message: 'Must be no more than 100 characters!' },
                ],
              })(
                <Input
                  type="text"
                  prefix={<Icon type="mail" />}
                  placeholder="Email"
                />,
              )}
            </FormItem>
          )}
          {fields.indexOf('password') !== -1 && (
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
          )}
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={disabled}
              loading={disabled}
              size="large"
              className="full-width"
            >
              {btnText}
            </Button>
            {serverError && serverError.length > 0 && (
              <Alert type="error" message={serverError} className="mt1" banner />
            )}
            {serverSuccess && serverSuccess.length > 0 && (
              <Alert type="success" message={serverSuccess} className="mt1" banner />
            )}
          </FormItem>
        </Form>
        {view === 'login' && (
          <p className="center mt2">
            <a href="/forgot-password" onClick={this.changeViewTo('forgotPassword')}>
              Forgot Password?
            </a>
          </p>
        )}
        {view === 'forgotPassword' && (
          <p className="center mt2">
            <a href="/login" onClick={this.changeViewTo('login')}>
              Log In
            </a>
            &nbsp;|&nbsp;
            <a href="/signup" onClick={this.changeViewTo('signup')}>
              Sign Up
            </a>
          </p>
        )}
        {view === 'resetPassword' && (
          <p className="center mt2">
            <a href="/forgot-password" onClick={this.changeViewTo('forgotPassword')}>
              Resend reset password link
            </a>
          </p>
        )}
      </div>
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
  onViewChange: PropTypes.func.isRequired,
  token: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSucessHook: PropTypes.func,
};

PasswordAuthViews.defaultProps = {
  token: '',
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSucessHook: () => {},
};

const enhance = compose(
  Form.create(), // Antd HOC for error handling
);

export default enhance(PasswordAuthViews);
