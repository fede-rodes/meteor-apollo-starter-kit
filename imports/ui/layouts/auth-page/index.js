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
    view: {
      view,
      title,
      subtitle,
      linkTo,
      linkLabel,
      btnLabel,
    },
    token = '',
    service,
    errorMsg,
    successMsg,
    disabled,
    changeViewTo,
    handleBefore,
    handleClientError,
    handleServerError,
    handleSuccess,
  } = props;

  return (
    <div>
      <Title>{title}</Title>
      {['login', 'signup', 'forgotPassword'].indexOf(view) !== -1 && (
        <Subtitle
          text={subtitle}
          linkTo={linkTo}
          linkLabel={linkLabel}
          onLinkClick={changeViewTo(linkTo)}
        />
      )}
      <PasswordAuthViews
        view={view}
        btnLabel={btnLabel}
        token={token} // only used at resetPassword view.
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
      {view === 'login' && (
        <p className="center">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
      )}
      {view === 'forgotPassword' && (
        <p className="center">
          <Link to="/login">Log in</Link> | <Link to="/signup">Sign up</Link>
        </p>
      )}
      {view === 'resetPassword' && (
        <p className="center">
          <Link to="/forgot-password">Resend reset password link</Link>
        </p>
      )}
      {['login', 'signup'].indexOf(view) !== -1 && (
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
  view: PropTypes.shape({
    view: PropTypes.oneOf([
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
  token: PropTypes.string, // only required by resetPassword view.
  service: PropTypes.oneOf([...Constants.AUTH_SERVICES, '']).isRequired,
  errorMsg: PropTypes.string.isRequired,
  successMsg: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
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
