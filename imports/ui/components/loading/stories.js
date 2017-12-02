import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import Loading from './index.jsx';

storiesOf('Loading', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Loading', () => (
    <Loading />
  ));
