/* import { Meteor } from 'meteor/meteor';

// Source: https://youtu.be/j-WcyAjVceM
async function renderAsync() {
  const [
    React,
    { render },
    { default: App },
    { default: Header },
    { default: Routes },
    { default: Menu },
  ] = await Promise.all([
    import('react'),
    import('react-dom'),
    import('../../ui/app'),
    import('../../ui/components/smart/header'),
    import('../../ui/routes'),
    import('../../ui/components/smart/menu'),
  ]);

  // Inject react app components into App's Shell
  render(<App component={Header} />, document.getElementById('header'));
  render(<App component={Menu} />, document.getElementById('menu'));
  render(<App component={Routes} />, document.getElementById('main'));
}

Meteor.startup(() => {
  const renderStart = Date.now();
  const startupTime = renderStart - window.performance.timing.responseStart;
  console.log(`Meteor.startup took: ${startupTime}ms`);

  // Register service worker
  import('../../ui/register-sw').then(() => {});

  renderAsync().then(() => {
    const renderTime = Date.now() - renderStart;
    console.log(`renderAsync took: ${renderTime}ms`);
    console.log(`Total time: ${startupTime + renderTime}ms`);
  });
}); */

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
