import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import theme from '../imports/ui/theme';

const req = require.context('../imports', true, /stories\.(js)$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
));

configure(loadStories, module);
