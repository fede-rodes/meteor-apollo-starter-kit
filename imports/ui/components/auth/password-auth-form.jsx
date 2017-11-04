import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
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
import sendVerificationEmailMutation from './send-verification-email.graphql';
import sendResetPasswordEmailMutation from './send-reset-password-email.graphql';

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
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PasswordAuthForm extends React.Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.changeViewTo = this.changeViewTo.bind(this);
    this.displayServerError = this.displayServerError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      serverError: '',
    };
  }

  changeViewTo(to) {
    return (e) => {
      e.preventDefault();
      this.setState({ serverError: '' });
      this.props.onViewChange(to);
    };
  }

  displayServerError({ message }) {
    this.setState({ serverError: message || 'Unexpected error' });
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      sendVerificationEmail,
      sendResetPasswordEmail,
      view,
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

    // Clear server errors if any
    this.setState({ serverError: '' });

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
                sendVerificationEmail({})
                .then(() => onSucessHook())
                .catch((exc) => {
                  this.displayServerError(exc);
                  onServerErrorHook(exc);
                });
              }
            });
            break;
          }
          case 'forgotPassword': {
            sendResetPasswordEmail({
              variables: {
                email,
              },
            })
            .then(() => onSucessHook())
            .catch((exc) => {
              this.displayServerError(exc);
              onServerErrorHook(exc);
            });
            break;
          }
          default:
            onServerErrorHook('View option does not exist');
            break;
        }
      }
    });
  }

  render() {
    const { serverError } = this.state;
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
            <FormItem>
              {getFieldDecorator('email', {
                validateTrigger: 'onBlur',
                rules: [
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Please, provide a valid email address' },
                  { max: 100, message: 'Must be no more than 100 characters!' },
                ],
              })(
                <Input type="text" prefix={<Icon type="mail" />} placeholder="Email" />,
              )}
            </FormItem>
          )}
          {fields.indexOf('password') !== -1 && (
            <FormItem>
              {getFieldDecorator('password', {
                validateTrigger: 'onBlur',
                rules: [
                  { required: true, message: 'Password is required' },
                  { min: 6, message: 'Please, at least 6 characters long' },
                ],
              })(
                <Input type="password" prefix={<Icon type="lock" />} placeholder="Password" />,
              )}
            </FormItem>
          )}
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
      </div>
    );
  }
}

PasswordAuthForm.propTypes = {
  sendVerificationEmail: PropTypes.func.isRequired,
  sendResetPasswordEmail: PropTypes.func.isRequired,
  view: PropTypes.oneOf(['login', 'signup', 'forgotPassword']).isRequired,
  onViewChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSucessHook: PropTypes.func,
};

PasswordAuthForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSucessHook: () => {},
};

const enhance = compose(
  graphql(sendVerificationEmailMutation, { name: 'sendVerificationEmail' }), // Apollo integration
  graphql(sendResetPasswordEmailMutation, { name: 'sendResetPasswordEmail' }), // Apollo integration
  Form.create(), // Antd HOC for error handling
);

export default enhance(PasswordAuthForm);
