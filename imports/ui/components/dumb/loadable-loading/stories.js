import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import LoadableLoading from './index';

storiesOf('LoadableLoading', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Error', () => (
    <LoadableLoading
      error={{ code: '404', reason: 'component not found' }}
      pastDelay
    />
  ))
  .add('PastDelay no error', () => (
    <LoadableLoading
      pastDelay
    />
  ));
