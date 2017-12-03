import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import Title from './index';

storiesOf('Title', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Title', () => (
    <Title>
      I&apos;m the Title
    </Title>
  ));
