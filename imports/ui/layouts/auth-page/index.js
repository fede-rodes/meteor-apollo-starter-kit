import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Constants from '../../../api/constants';
import { PasswordAuthViews, FBAuthBtn } from '../../components/smart/auth';
import Title from '../../components/dumb/title';
import Subtitle from '../../components/dumb/subtitle';
import Feedback from '../../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const AuthPageLayout = (props) => {
  const {
    page: {
      name,
      title,
      subtitle,
      linkTo,
      linkLabel,
      btnLabel,
    },
    token,
    service,
    disabled,
    errorMsg,
    successMsg,
    changeViewTo,
    handleBefore,
    handleClientError,
    handleServerError,
    handleSuccess,
  } = props;

  return (
    <div>
      <Title>{title}</Title>
      {['login', 'signup', 'forgotPassword'].indexOf(name) !== -1 && (
        <Subtitle
          text={subtitle}
          linkTo={linkTo}
          linkLabel={linkLabel}
          onLinkClick={changeViewTo(linkTo)}
        />
      )}
      <PasswordAuthViews
        view={name}
        btnLabel={btnLabel}
        token={token} // only used in resetPassword page.
        disabled={disabled}
        onBeforeHook={() => handleBefore({ service: 'password' })}
        onClientErrorHook={handleClientError}
        onServerErrorHook={handleServerError}
        onSuccessHook={handleSuccess}
      />
      {service === 'password' && (
        <Feedback
          loading={disabled}
          errorMsg={errorMsg}
          successMsg={successMsg}
        />
      )}
      {name === 'login' && (
        <p className="center">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
      )}
      {name === 'forgotPassword' && (
        <p className="center">
          <Link to="/login">Log in</Link> | <Link to="/signup">Sign up</Link>
        </p>
      )}
      {name === 'resetPassword' && (
        <p className="center">
          <Link to="/forgot-password">Resend reset password link</Link>
        </p>
      )}
      {['login', 'signup'].indexOf(name) !== -1 && (
        <div>
          <div className="center">
            - OR -
          </div>
          <FBAuthBtn
            key="fb-btn"
            btnLabel="Continue with facebook"
            disabled={disabled}
            onBeforeHook={() => handleBefore({ service: 'facebook' })}
            onServerErrorHook={handleServerError}
            onSuccessHook={handleSuccess}
          />
          {service === 'facebook' && (
            <Feedback
              loading={disabled}
              errorMsg={errorMsg}
              successMsg={successMsg}
            />
          )}
        </div>
      )}
    </div>
  );
};

AuthPageLayout.propTypes = {
  page: PropTypes.shape({
    name: PropTypes.oneOf([
      'login',
      'signup',
      'resetPassword',
      'forgotPassword',
    ]).isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    linkTo: PropTypes.string,
    linkLabel: PropTypes.string,
    btnLabel: PropTypes.string,
  }).isRequired,
  token: PropTypes.string, // only required in resetPassword page
  service: PropTypes.oneOf([...Constants.AUTH_SERVICES, '']).isRequired,
  disabled: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
  successMsg: PropTypes.string.isRequired,
  changeViewTo: PropTypes.func.isRequired,
  handleBefore: PropTypes.func.isRequired,
  handleClientError: PropTypes.func.isRequired,
  handleServerError: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
};

AuthPageLayout.defaultProps = {
  token: '',
};

export default AuthPageLayout;
