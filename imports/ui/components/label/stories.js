import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import Label from './index';

storiesOf('Label', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Label', () => (
    <Label>I am a label</Label>
  ));
