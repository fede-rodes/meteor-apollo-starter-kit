import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import Input from './index.js';

storiesOf('Input', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Input placeholder', () => (
    <Input placeholder="I'm the placeholder" />
  ))
  .add('Input value', () => (
    <Input value="I'm the value" />
  ));
