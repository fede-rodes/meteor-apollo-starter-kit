import { Accounts } from 'meteor/accounts-base';

//------------------------------------------------------------------------------
// avatar: `http://graph.facebook.com/${id}/picture/?type=large`,
// Should we add avatar to profile? email to emails?
Accounts.onCreateUser((options, user) => {
  console.log(`\nsign up attempt: ${new Date()}`);

  // Handle password signup
  if (user.services.password) {
    console.log('\nservice --> password');

    // Do something
    return user;
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

    // Extend user profile by adding facebook data
    const userFB = user;
    userFB.profile = { name, gender };
    userFB.avatar = `http://graph.facebook.com/${id}/picture/`;
    return userFB;
  }

  // Throw in case of a different service
  throw new Error('Sign up attempt with service different than facebook, password');
});
