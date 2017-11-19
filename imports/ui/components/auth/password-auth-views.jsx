import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
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

const FormItem = Form.Item;

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
// COMPONENT:
//------------------------------------------------------------------------------
class PasswordAuthViews extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    form.validateFields((err1, { email, password }) => {
      if (err1) {
        onClientErrorHook(err1);
      } else {
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
    });
  }

  render() {
    const { view, btnText, disabled, form: { getFieldDecorator } } = this.props;
    const { fields } = STATES[view];

    return (
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
        </FormItem>
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
  btnText: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSucessHook: PropTypes.func,
};

PasswordAuthViews.defaultProps = {
  token: '',
  btnText: 'Submit',
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSucessHook: () => {},
};

export default Form.create()(PasswordAuthViews);
