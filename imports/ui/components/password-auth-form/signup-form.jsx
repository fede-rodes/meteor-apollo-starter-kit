import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
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
// COMPONENT:
//------------------------------------------------------------------------------
class SignupForm extends React.Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { onBeforeHook, onErrorHook, onSignupHook } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    this.props.form.validateFields((err1, res1) => {
      if (err1) {
        onErrorHook(err1);
      } else {
        const data = _.pick(res1, ['email', 'password']);
        Accounts.createUser(data, (err2) => {
          if (err2) {
            onErrorHook(err2);
            /* for (const key in err1) {
              console.log(`err.${key}: ${err1[key]}`);
            } */
            /* errors = Users.apiBoth.handleCreateUserErrors(err1);
            if (AuxFunctions.hasErrors(errors)) {
              // Display errors on UI
              reduxActions.dispatchSetErrors(errors);
            } */
            // Re-enable submit button
            // reduxActions.dispatchSetBooleanField('canSubmit', true);
          } else {
            /* Meteor.call('Users.methodsServer.setInitialRole');
            Meteor.call('EmailSystem.methodsServer.sendVerificationLink', (err2) => {
              if (err2) {
                // Display flash notification
                Bert.alert(err2.reason, 'danger', 'growl-top-right');
                // Re-enable submit button
                reduxActions.dispatchSetBooleanField('canSubmit', true);
              }

              // Clear redux state (email and password)
              reduxActions.dispatchSetInitialState('signup');
              // Redirect even if email couldn't be sent
              // FlowRouter.go('confirmEmail');
              FlowRouter.go('home');
            }); */
            onSignupHook();
          }
        });
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      disabled,
    } = this.props;

    return (
      <div className="full-width">
        <h1 className="center">Sign Up</h1>
        <p className="center">
          Already have an account?&nbsp;
          <Link to="/login">Log In</Link>
        </p>
        <Form onSubmit={this.handleSubmit} className="mt2">
          {/* TODO: validate email */}
          <FormItem label="Email">
            {getFieldDecorator('email', {
              validateTrigger: 'onBlur',
              rules: [{ required: true, message: 'Email is required' }],
            })(
              <Input type="text" prefix={<Icon type="mail" />} placeholder="Email" />,
            )}
          </FormItem>
          <FormItem label="Password">
            {getFieldDecorator('password', {
              validateTrigger: 'onBlur',
              rules: [{ required: true, message: 'Password is required' }],
            })(
              <Input type="password" prefix={<Icon type="lock" />} placeholder="Password" />,
            )}
          </FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={disabled}
            size="large"
            // loading={disabled}
            className="full-width"
          >
            Sign Up
          </Button>
        </Form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onErrorHook: PropTypes.func,
  onSignupHook: PropTypes.func,
};

SignupForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onErrorHook: () => {},
  onSignupHook: () => {},
};

export default Form.create()(SignupForm);
