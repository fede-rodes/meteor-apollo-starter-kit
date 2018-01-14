import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { injectGlobal } from 'styled-components';
import 'sanitize.css/sanitize.css';
import 'basscss/css/basscss.min.css';
import App from '../../ui/app';
import theme from '../../ui/theme';

Meteor.startup(() => {
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(() => console.info('Service worker is registered!'))
    .catch(err => console.info('ServiceWorker registration failed: ', err));
  }

  // Inject react app
  render(<App />, document.getElementById('root'));

  // Global style
  injectGlobal([`
    html, body, #root {
      margin: 0;
      padding: 0;
      font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
      background-image: linear-gradient(140deg, rgb(12,6,50) 20%, rgb(66,59,90) 60%, rgb(219,159,159) 100%);
      min-height: 100vh;
      font-size: ${theme.fontSize.normal};
    }

    a { color: ${theme.color.link}; }
  `]);
});
