import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  console.log(`sign up attempt: ${new Date()}`);

  // Only allow facebook signup
  if (!user.services.facebook) {
    throw new Error('Sign up attempt with service different that facebook');
  }

  const { id, name, gender, email } = user.services.facebook;
  console.log(`facebook sign up. name: ${name}, id: ${id}, gender: ${gender}, email: ${email}`);

  // Extend user profile by adding facebook data
  const userFB = user;
  userFB.profile = { name, gender };
  userFB.avatar = `http://graph.facebook.com/${id}/picture/`;
  return userFB;
});

// avatar: `http://graph.facebook.com/${id}/picture/?type=large`,
// Should we add avatar to profile? email to emails?
