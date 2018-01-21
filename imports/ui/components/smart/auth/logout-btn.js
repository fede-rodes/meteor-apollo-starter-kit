import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import Button from '../../dumb/button';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LogoutBtn = ({ client, disabled, onLogoutHook }) => (
  <Button
    disabled={disabled}
    className="my2"
    onClick={() => {
      Meteor.logout(() => {
        // Clear apollo store.
        client.resetStore();
        // Pass event up to parent component.
        onLogoutHook();
      });
    }}
  >
    Log out
  </Button>
);

LogoutBtn.propTypes = {
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
  onLogoutHook: PropTypes.func,
};

LogoutBtn.defaultProps = {
  disabled: false,
  onLogoutHook: () => {},
};

export default withApollo(LogoutBtn);
