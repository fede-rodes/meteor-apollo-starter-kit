import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { host } from 'storybook-host';
import Subtitle from './index';

storiesOf('Subtitle', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Subtitle', () => (
    <Subtitle
      text="I&apos;m the Subtitle&nbsp;"
      linkTo="somewhere"
      linkLabel="Click me!"
      onLinkClick={action('clicked')}
    />
  ));
