import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import App from '../../ui/layouts/app.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});
