import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { host } from 'storybook-host';
import Label from './index.jsx';

storiesOf('Label', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Label', () => (
    <Label>I am a label</Label>
  ));
