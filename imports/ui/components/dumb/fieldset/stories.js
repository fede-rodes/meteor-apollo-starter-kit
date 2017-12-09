import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import Fieldset from './index';

storiesOf('Fieldset', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Fieldset placeholder', () => (
    <Fieldset>
      I&apos;m inside a Fieldset
    </Fieldset>
  ));
