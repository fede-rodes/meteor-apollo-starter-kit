import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PasswordAuthForm from './password-auth-form.jsx';
import FBAuthBtn from './fb-auth-btn.jsx';
// import Divider from './divider.jsx';
import StyledDivider from './divider.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class UI extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handlePasswordFormViewChange = this.handlePasswordFormViewChange.bind(this);
    this.state = {
      view: 'login',
    };
  }

  handlePasswordFormViewChange(view) {
    this.setState({ view });
  }

  render() {
    const { view } = this.state;

    return (
      <div className="full-width">
        <PasswordAuthForm
          view={view}
          onViewChange={this.handlePasswordFormViewChange}
          {...this.props}
        />
        {['login', 'signup'].indexOf(view) !== -1 && (
          <div className="full-width">
            {/* <Divider text="OR" /> */}
            <StyledDivider text="OR" />
            <FBAuthBtn
              btnText="Continue with facebook"
              {...this.props}
            />
          </div>
        )}
      </div>
    );
  }
}

UI.propTypes = {
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSucessHook: PropTypes.func,
};

UI.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSucessHook: () => {},
};

export default UI;
