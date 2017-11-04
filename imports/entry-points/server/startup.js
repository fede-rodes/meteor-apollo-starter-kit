import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  console.log('[server] startup');

  // Start cron-jobs if any

  // Setup email provider
  const { protocol, username, password, server, port } = Meteor.settings.smtp;
  process.env.MAIL_URL = `${protocol}://${username}:${password}@${server}:${port}`;

  // Setup default users if any

  // Run schema migrations if any.
});
