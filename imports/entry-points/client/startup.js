import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import App from '../../ui/app';
import Routes from '../../ui/routes';
import Header from '../../ui/components/smart/header';
import Menu from '../../ui/components/smart/menu';

Meteor.startup(() => {
  // Register service worker
  import '../../ui/register-sw';

  // Inject react app components for App Shell Architecture
  render(<App component={Header} />, document.getElementById('header'));
  render(<App component={Menu} />, document.getElementById('menu'));
  render(<App component={Routes} />, document.getElementById('main'));
});
