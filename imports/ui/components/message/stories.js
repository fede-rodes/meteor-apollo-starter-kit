import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { host } from 'storybook-host';
import Message from './index.jsx';

storiesOf('Message', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Message success', () => (
    <Message type="success" content="I'm the content" />
  ))
  .add('Message error', () => (
    <Message type="error" content="I'm the content" />
  ))
  .add('Message no content', () => (
    <Message type="error" content="" />
  ));
