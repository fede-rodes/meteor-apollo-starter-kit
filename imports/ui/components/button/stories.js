import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { host } from 'storybook-host';
import Button from './index.jsx';

storiesOf('Button', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Primary', () => (
    <Button variant="primary">Click!</Button>
  ))
  .add('Secondary', () => (
    <Button variant="secondary">Click!</Button>
  ))
  .add('Text only', () => (
    <Button variant="text">Click!</Button>
  ))
  .add('Hollow', () => (
    <Button variant="hollow">Click!</Button>
  ))
  .add('Size default', () => (
    <Button>Click!</Button>
  ))
  .add('Size tiny', () => (
    <Button size="tiny">Click!</Button>
  ))
  .add('Size large', () => (
    <Button size="large">Click!</Button>
  ))
  .add('Expanded', () => (
    <Button expanded>Click!</Button>
  ))
  .add('Size large and expanded', () => (
    <Button size="large" expanded>Click!</Button>
  ))
  .add('onClick callback', () => (
    <Button onClick={action('clicked')}>Click me with callback!</Button>
  ));
