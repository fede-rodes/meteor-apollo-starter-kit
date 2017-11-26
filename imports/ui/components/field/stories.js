import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { host } from 'storybook-host';
import Field from './index.jsx';

storiesOf('Field', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Field with label', () => (
    <Field
      label="Heloo"
      defaultValue="def value"
      onChange={action('changed')}
    />
  ));
