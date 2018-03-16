import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import LoadableWrapper from './index';

storiesOf('LoadableWrapper', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Component', () => (
    <LoadableWrapper
      LoadingComponent={<div>Component</div>}
    />
  ));
