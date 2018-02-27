import { Accounts } from 'meteor/accounts-base';

//------------------------------------------------------------------------------
Accounts.onCreateUser((options, user) => {
  console.log('\nsign up attempt:', new Date());

  // Handle password signup
  if (user.services.password) {
    const email = user.emails[0].address;
    const name = email.split('@')[0];
    console.log(
      '\nservice --> password',
      '\nname:', name,
      '\nemail:', email,
    );

    // Extend user's profile by adding default name and avatar
    const profile = {
      name,
      avatar: 'http://pixeljoint.com/files/icons/magic_johnson.gif',
    };
    return Object.assign({}, user, { profile });
  }

  // Handle facebook signup
  if (user.services.facebook) {
    const { id, name, gender, email } = user.services.facebook;
    console.log(
      '\nservice --> facebook',
      '\nname:', name,
      '\nid:', id,
      '\ngender:', gender,
      '\nemail:', email,
    );

    // Extend user's profile by adding facebook data
    const profile = {
      name,
      gender,
      avatar: `http://graph.facebook.com/${id}/picture/`,
    };
    return Object.assign({}, user, { profile });
  }

  // Throw in case of a different service
  throw new Error(401, 'Sign up attempt with service different than facebook or password');
});
