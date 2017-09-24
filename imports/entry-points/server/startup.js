import { Meteor } from 'meteor/meteor';
// import { Cloudinary } from 'meteor/lepozepo:cloudinary';
// import AuxFunctions from '../../api/aux-functions';
// import SchemaMigration from './schema-migration.js';
// import Users from '../../api/users/namespace.js';


Meteor.startup(() => {
  console.log('[server] startup');

  // Start cron-jobs if any
  // SyncedCron.start(); // eslint-disable-line

  // Setup email provider
  // const { protocol, username, password, server, port } = Meteor.settings.smtp;
  // process.env.MAIL_URL = `${protocol}://${username}:${password}@${server}:${port}`;
  // console.log('process.env.MAIL_URL', process.env.MAIL_URL);

  // Cloudinary
  /* const { cloudName } = Meteor.settings.public.cloudinary;
  const { apiKey, apiSecret } = Meteor.settings.cloudinary;
  Cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  }); */

  // Setup default users
  // Users.apiServer.init();

  // Run schema migrations if any.
});
