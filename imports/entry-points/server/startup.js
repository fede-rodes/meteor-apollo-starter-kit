import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import Plan from '../../api/plan/index.js';

Meteor.startup(() => {
  console.log('[server] startup');

  // Set html lang attribute
  WebApp.addHtmlAttributeHook(() => ({ lang: 'en' }));

  // Start cron-jobs if any

  // Setup email provider
  const { protocol, username, password, server, port } = Meteor.settings.smtp;
  process.env.MAIL_URL = `${protocol}://${username}:${password}@${server}:${port}`;

  // Setup default users if any

  // Setup stripe plans
  Plan.fixtures.load();

  // Run schema migrations if any.
});
