import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import 'sanitize.css/sanitize.css';
import 'basscss/css/basscss.min.css';
import './main.css';
import App from '../../ui/app';

Meteor.startup(() => {
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(() => console.info('Service worker is registered!'))
    .catch(err => console.info('ServiceWorker registration failed: ', err));
  }

  // Inject react app
  render(<App />, document.getElementById('root'));
});
