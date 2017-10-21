import { Meteor } from 'meteor/meteor';
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
class LoginForm extends React.Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { onBeforeHook, onErrorHook, onLoginHook } = this.props;

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
        const { email, password } = res1;
        Meteor.loginWithPassword(email, password, (err2) => {
          if (err2) {
            onErrorHook(err2);
            /* for (const key in err) {
              console.log(`err.${key}: ${err[key]}`);
            } */
            /* errors = Users.apiBoth.handleLoginWithPasswordErrors(err);
            if (AuxFunctions.hasErrors(errors)) {
              // Display errors on UI
              reduxActions.dispatchSetErrors(errors);
            }
            // Re-enable submit button
            reduxActions.dispatchSetBooleanField('canSubmit', true); */
          } else {
            /* console.log('[login] success');
            // Clear redux state (email and password)
            reduxActions.dispatchSetInitialState('signup');
            // Redirect to home page
            FlowRouter.go('home'); */
            onLoginHook();
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
        <h1 className="center">Login</h1>
        <p className="center">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup">Sign Up</Link>
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
            Log In
          </Button>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onErrorHook: PropTypes.func,
  onLoginHook: PropTypes.func,
};

LoginForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onErrorHook: () => {},
  onLoginHook: () => {},
};

export default Form.create()(LoginForm);
