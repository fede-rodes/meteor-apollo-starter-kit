import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

//------------------------------------------------------------------------------
// avatar: `http://graph.facebook.com/${id}/picture/?type=large`,
// Should we add avatar to profile? email to emails?
Accounts.onCreateUser((options, user) => {
  console.log('\nsign up attempt:', new Date());

  // Handle password signup
  if (user.services.password) {
    console.log(
      '\nservice --> password',
      '\nemail:', user.emails[0].address,
    );

    // Send verification email. Don't wait for this task to be done before
    // giving the client the green light to move ahead
    Meteor.defer(() => {
      Accounts.sendVerificationEmail(user._id);
      console.log('Verification email sent!');
    });

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
    const userFB = Object.assign({}, user);
    userFB.profile = { name, gender };
    userFB.avatar = `http://graph.facebook.com/${id}/picture/`;
    return userFB;
  }

  // Throw in case of a different service
  throw new Error('Sign up attempt with service different than facebook, password');
});
