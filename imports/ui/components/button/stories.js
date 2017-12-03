import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { host } from 'storybook-host';
import Button from './index';

storiesOf('Button', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Default', () => (
    <Button>Click!</Button>
  ))
  .add('Default from variant', () => (
    <Button variant="default">Click!</Button>
  ))
  .add('Primary', () => (
    <Button variant="primary">Click!</Button>
  ))
  .add('Success', () => (
    <Button variant="success">Click!</Button>
  ))
  .add('Danger', () => (
    <Button variant="danger">Click!</Button>
  ))
  .add('Danger submit', () => (
    <Button type="submit" variant="danger">Click!</Button>
  ))
  .add('Default expanded', () => (
    <Button expanded>Click!</Button>
  ))
  .add('Danger large', () => (
    <Button variant="danger" size="large">Click!</Button>
  ))
  .add('Danger small', () => (
    <Button variant="danger" size="small">Click!</Button>
  ))
  .add('Danger inverted', () => (
    <Button variant="danger" inverted>Click!</Button>
  ))
  .add('Success disabled', () => (
    <Button variant="success" disabled>Click!</Button>
  ))
  .add('Link', () => (
    <Button type="link">Click!</Button>
  ))
  .add('Link disabled', () => (
    <Button type="link" disabled>Click!</Button>
  ))
  .add('onClick callback', () => (
    <Button onClick={action('clicked')}>Click me with callback!</Button>
  ));
