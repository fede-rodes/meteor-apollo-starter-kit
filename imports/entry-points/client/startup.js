import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import 'sanitize.css/sanitize.css';
import 'basscss/css/basscss.min.css';
import App from '../../ui/app';

Meteor.startup(() => {
  // Register service worker
  import '../../ui/register-sw';

  // Inject react app
  render(<App.Header />, document.getElementById('header'));
  render(<App.Menu />, document.getElementById('menu'));
  render(<App.Main />, document.getElementById('main'));
});
