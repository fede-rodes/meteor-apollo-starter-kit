import { Accounts } from 'meteor/accounts-base';
import Constants from '../../../api/constants';

//------------------------------------------------------------------------------
// EMAIL TEMPLATES
//------------------------------------------------------------------------------
/**
 * @see {@link https://themeteorchef.com/snippets/sign-up-with-email-verification/}
 * @see {@link http://docs.meteor.com/#/full/accounts_emailtemplates}
 * @see {@link http://docs.meteor.com/#/full/accounts_sendverificationemail}
 * @see {@link https://meteorhacks.com/server-side-rendering}
 */
Accounts.emailTemplates.siteName = Constants.SITE_BRAND;
Accounts.emailTemplates.from = `${Constants.SITE_BRAND} <no-reply@${Constants.DOMAIN_NAME}>`;
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return `[${Constants.SITE_BRAND}] Verify Your Email Address`;
  },
  text(user, url) {
    const emailAddress = (user && user.emails && user.emails[0] && user.emails[0].address) || '';
    const urlWithoutHash = url.replace('#/', '');
    const supportEmail = `support@${Constants.DOMAIN_NAME}`;
    const emailBody = `To verify your email address (${emailAddress}), please` +
    ` visit the following link:\n\n${urlWithoutHash}\n\n If you did not` +
    ' request this verification, please ignore this email. If you feel' +
    ` something is wrong, please contact our support team: ${supportEmail}.`;
    return emailBody;
  },
};
Accounts.emailTemplates.resetPassword = {
  subject() {
    return `[${Constants.SITE_BRAND}] Reset Your Password`;
  },
  text(user, url) {
    const urlWithoutHash = url.replace('#/', '');
    const supportEmail = `support@${Constants.DOMAIN_NAME}`;
    const emailBody = 'To reset your password, please visit the' +
    ` following link:\n\n${urlWithoutHash}\n\n If you did not request for a` +
    ' new password, please ignore this email. If you feel something is wrong,' +
    ` please contact our support team: ${supportEmail}.`;
    return emailBody;
  },
};
