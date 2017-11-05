/* eslint-disable */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import 'sanitize.css/sanitize.css';
import 'basscss/css/basscss.min.css';
import './main.css';
import App from '../../ui/layouts/app.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});
