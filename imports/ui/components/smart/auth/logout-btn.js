import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import Button from 'material-ui/Button';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LogoutBtn = ({ client, btnType, disabled, onLogoutHook }) => {
  // Logout user and clear store afterwards
  const handleLogout = (evt) => {
    if (evt) { evt.preventDefault(); }
    Meteor.logout(() => {
      // Clear apollo store.
      client.resetStore();
      // Pass event up to parent component.
      onLogoutHook();
    });
  };

  if (btnType === 'link') {
    return disabled
      ? <span>Logout</span>
      : (
        <a href="" onClick={handleLogout}>
          Log out
        </a>
      );
  }

  return (
    <Button disabled={disabled} onClick={handleLogout}>
      Log out
    </Button>
  );
};

LogoutBtn.propTypes = {
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
  btnType: PropTypes.oneOf(['button', 'link']),
  disabled: PropTypes.bool,
  onLogoutHook: PropTypes.func,
};

LogoutBtn.defaultProps = {
  btnType: 'button',
  disabled: false,
  onLogoutHook: () => {},
};

export default withApollo(LogoutBtn);
