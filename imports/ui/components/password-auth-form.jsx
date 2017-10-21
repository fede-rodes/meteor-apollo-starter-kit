import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
// import _ from 'lodash';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form'; // for js
import 'antd/lib/form/style/css'; // for css
import Input from 'antd/lib/input'; // for js
import 'antd/lib/input/style/css'; // for css
import Button from 'antd/lib/button'; // for js
import 'antd/lib/button/style/css'; // for css
import Icon from 'antd/lib/icon'; // for js
import 'antd/lib/icon/style/css'; // for css

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { view, onBeforeHook, onErrorHook, onSucessHook, form } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    form.validateFields((err1, { email, password }) => {
      if (err1) {
        onErrorHook(err1);
      } else {
        switch (view) {
          case 'login': {
            Meteor.loginWithPassword(email, password, (err2) => {
              if (err2) {
                onErrorHook(err2);
              } else {
                onSucessHook();
              }
            });
            break;
          }
          case 'signup': {
            Accounts.createUser({ email, password }, (err2) => {
              if (err2) {
                onErrorHook(err2);
              } else {
                onSucessHook();
              }
            });
            break;
          }
          case 'forgotPassword': {
            // TODO: send reset password link
            onSucessHook();
            break;
          }
          default:
            onErrorHook(400, 'Option does not exist');
            break;
        }
      }
    });
  }

  render() {
    const { view, disabled, onStateLinkClick, form: { getFieldDecorator } } = this.props;
    const { title, subtitle, linkTo, linkText, fields, btnText } = STATES[view];

    return (
      <div className="full-width">
        <h1 className="center">{title}</h1>
        <p className="center">
          <span dangerouslySetInnerHTML={{ __html: subtitle }} />
          {linkTo && linkText && (
            <a
              href={`/${linkTo}`}
              onClick={(e) => {
                e.preventDefault();
                onStateLinkClick(linkTo);
              }}
            >
              {linkText}
            </a>
          )}
        </p>
        <Form onSubmit={this.handleSubmit} className="mt2">
          {/* TODO: validate email */}
          {fields.indexOf('email') !== -1 && (
            <FormItem label="Email">
              {getFieldDecorator('email', {
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: 'Email is required' }],
              })(
                <Input type="text" prefix={<Icon type="mail" />} placeholder="Email" />,
              )}
            </FormItem>
          )}
          {fields.indexOf('password') !== -1 && (
            <FormItem label="Password">
              {getFieldDecorator('password', {
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: 'Password is required' }],
              })(
                <Input type="password" prefix={<Icon type="lock" />} placeholder="Password" />,
              )}
            </FormItem>
          )}
          <Button
            type="primary"
            htmlType="submit"
            disabled={disabled}
            size="large"
            // loading={disabled}
            className="full-width"
          >
            {btnText}
          </Button>
          {view === 'login' && (
            <p className="center mt2">
              <a
                href="/forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  onStateLinkClick('forgotPassword');
                }}
              >
                Forgot Password?
              </a>
            </p>
          )}
          {view === 'forgotPassword' && (
            <p className="center mt2">
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  onStateLinkClick('login');
                }}
              >
                Log In
              </a>
              &nbsp;|&nbsp;
              <a
                href="/signup"
                onClick={(e) => {
                  e.preventDefault();
                  onStateLinkClick('signup');
                }}
              >
                Sign Up
              </a>
            </p>
          )}
        </Form>
      </div>
    );
  }
}

PasswordAuthForm.propTypes = {
  view: PropTypes.oneOf(['login', 'signup', 'forgotPassword']).isRequired,
  disabled: PropTypes.bool,
  onStateLinkClick: PropTypes.func.isRequired,
  onBeforeHook: PropTypes.func,
  onErrorHook: PropTypes.func,
  onSucessHook: PropTypes.func,
};

PasswordAuthForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onErrorHook: () => {},
  onSucessHook: () => {},
};

export default Form.create()(PasswordAuthForm);
