import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { host } from 'storybook-host';
import Title from './index.jsx';

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
