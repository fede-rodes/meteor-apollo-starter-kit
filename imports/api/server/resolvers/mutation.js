import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const Mutation = {
  sendVerificationEmail(root, args, context) {
    console.log('here!');
    const { user: curUser } = context;
    // const curUserId = 'Eo8en9izNwdGhek5K';

    // User should be logged in at this stage!
    if (!curUser) {
      throw new Error(403, 'user should be logged in at sendVerificationLink');
    }

    const curUserId = curUser._id;
    const user = Meteor.users.findOne({ _id: curUserId });

    if (!user) {
      throw new Error('user-not-found', 'The user is not registered in our database');
    }

    if (user.emails[0].verified === true) {
      throw new Error(400, 'Email already verified!');
    }

    try {
      Accounts.sendVerificationEmail(curUserId);
    } catch (exc) {
      console.log(exc);
      throw new Error(500, `Verification email couldn't be delivered. Reason: ${exc.response}`);
    }
    return user;
  },
};

export default Mutation;
