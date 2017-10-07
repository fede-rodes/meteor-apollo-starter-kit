import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});
