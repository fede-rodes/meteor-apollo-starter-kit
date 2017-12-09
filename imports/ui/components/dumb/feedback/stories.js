import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import Feedback from './index';

storiesOf('Feedback', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Error', () => (
    <Feedback
      loading={false}
      errorMsg="I'm an error msg"
      successMsg=""
    />
  ))
  .add('Success', () => (
    <Feedback
      loading={false}
      errorMsg=""
      successMsg="I'm a success msg"
    />
  ))
  .add('Loading', () => (
    <Feedback
      loading
      errorMsg=""
      successMsg=""
    />
  ));
