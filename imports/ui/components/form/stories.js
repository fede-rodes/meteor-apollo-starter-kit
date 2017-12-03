import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import Form from './index';
import Fieldset from '../fieldset';
import Label from '../label';
import Input from '../input';

storiesOf('Form', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Form', () => (
    <Form>
      <Fieldset>
        <Label htmlFor="label" required>
          Label
        </Label>
        <Input
          id="label"
          type="text"
          placeholder="placeholder"
          value=""
          onChange={() => {}}
        />
      </Fieldset>
    </Form>
  ));
