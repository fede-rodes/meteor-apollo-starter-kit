import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
// import Form from 'antd/lib/form'; // for js
// import 'antd/lib/form/style/css'; // for css
// import Input from 'antd/lib/input'; // for js
// import 'antd/lib/input/style/css'; // for css
// import Button from 'antd/lib/button'; // for js
// import 'antd/lib/button/style/css'; // for css
// import Icon from 'antd/lib/icon'; // for js
// import 'antd/lib/icon/style/css'; // for css
import Form from '../form/index.jsx';
import Fieldset from '../fieldset/index.jsx';
import Label from '../label/index.jsx';
import Input from '../input/index.jsx';
import Message from '../message/index.jsx';
import Button from '../button/index.jsx';
import AuxFunctions from '../../api/aux-functions.js';

// const FormItem = Form.Item;

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
  state = {
    email: '',
    password: '',
    errors: {
      email: [],
      password: [],
    },
  }

  handleChange = (evt) => {
    const field = evt.target.id;
    const value = evt.target.value;
    this.setState({ [field]: value });
    // TODO: clear errors for the current field
  }

  validateFields = ({ email, password }) => {
    const { view } = this.props;

    // Initialize errors
    const errors = {
      email: [],
      password: [],
    };

    const MIN_CHARS = 6;
    const MAX_CHARS = 30;

    // Sanitize inputs
    const _email = email.trim(); // eslint-disable-line
    const _password = password.trim(); // eslint-disable-line

    // Array of fields present in the current view
    const activeFields = STATES[view].fields;

    // Validate active fields
    if (activeFields.indexOf('email') !== -1) {
      if (!_email) {
        errors.email.push('Email is required!');
      } else if (!AuxFunctions.isValidEmail(_email)) {
        errors.email.push('Please, provide a valid email address!');
      } else if (_email.length > MAX_CHARS) {
        errors.email.push(`Must be no more than ${MAX_CHARS} characters!`);
      }
    }

    if (activeFields.indexOf('password') !== -1) {
      if (!_password) {
        errors.password.push('Password is required!');
      } else if (_password.length < MIN_CHARS) {
        errors.password.push(`Please, at least ${MIN_CHARS} characters long!`);
      }
    }

    return errors;
  }

  handleSubmit = (evt) => {
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

    const form = evt.currentTarget.elements;
    const email = form.email.value;
    const password = form.password.value;

    console.log(
      'email', email,
      'password', password,
    );

    // TODO: clear errors

    const errors = this.validateFields({ email, password });


    const err1 = null;
    if (err1) {
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
            {/* <Message type="error" content={getFirstError(errors, 'email')} /> */}
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
            {/* <Message type="error" content={getFirstError(errors, 'password')} /> */}
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

/*
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
// import Form from 'antd/lib/form'; // for js
// import 'antd/lib/form/style/css'; // for css
// import Input from 'antd/lib/input'; // for js
// import 'antd/lib/input/style/css'; // for css
// import Button from 'antd/lib/button'; // for js
// import 'antd/lib/button/style/css'; // for css
// import Icon from 'antd/lib/icon'; // for js
// import 'antd/lib/icon/style/css'; // for css
import Form from '../form/index.jsx';
import Fieldset from '../fieldset/index.jsx';
import Label from '../label/index.jsx';
import Input from '../input/index.jsx';
import Message from '../message/index.jsx';
import Button from '../button/index.jsx';

// const FormItem = Form.Item;

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
    this.state = {
      email: '',
      password: '',
      errors: {
        email: [],
        password: [],
      },
    };
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* handleChange(evt) {

  } //

  handleSubmit(evt) {
    evt.preventDefault();

    const form = evt.currentTarget.elements;
    const email = form.email.value;
    const password = form.password.value;

    console.log(
      'email', email,
      'password', password,
    );

    // const { email, password } = this.state;
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

    // form.validateFields((err1, { email, password }) => {

    const err1 = null;
    if (err1) {
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
    // const { email, password, errors } = this.state;
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
              // value={email}
              // onChange={evt => this.setState({ email: evt.target.value })}
            />
            {/* <Message type="error" content={getFirstError(errors, 'email')} /> //}
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
              // value={password}
              // onChange={evt => this.setState({ password: evt.target.value })}
            />
            {/* <Message type="error" content={getFirstError(errors, 'password')} /> //}
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

*/

/*
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form'; // for js
import 'antd/lib/form/style/css'; // for css
// import Input from 'antd/lib/input'; // for js
// import 'antd/lib/input/style/css'; // for css
import Button from 'antd/lib/button'; // for js
import 'antd/lib/button/style/css'; // for css
import Icon from 'antd/lib/icon'; // for js
import 'antd/lib/icon/style/css'; // for css
import

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
    const { view, btnLabel, disabled, form: { getFieldDecorator } } = this.props;
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
            {btnLabel}
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

export default Form.create()(PasswordAuthViews);

*/
