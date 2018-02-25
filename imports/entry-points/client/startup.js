import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import 'sanitize.css/sanitize.css';
import 'basscss/css/basscss.min.css';
import App from '../../ui/app';
import Routes from '../../ui/routes';
import Header from '../../ui/components/smart/header';

Meteor.startup(() => {
  // Register service worker
  import '../../ui/register-sw';

  // Inject react app components for App Shell Architecture
  // TODO: use <App component={Header} />...
  render(<App component={Header} />, document.getElementById('header'));
  // render(<App.Menu />, document.getElementById('menu'));
  render(<App component={Routes} />, document.getElementById('main'));
});
