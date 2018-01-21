import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createApolloClient } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './redux/store.js';
import theme from './theme';
import GlobalDataProvider from './global-data-provider';
import DefaultLayout from './layouts/default';
import Routes from './routes';

// To get started, create an ApolloClient instance and point it at your GraphQL
// server (handled in our case by meteor-apollo). By default, this client will
// send queries to the '/graphql' endpoint on the same host.
const client = createApolloClient({});

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <GlobalDataProvider>
            <DefaultLayout>
              <Routes />
            </DefaultLayout>
          </GlobalDataProvider>
        </ApolloProvider>
      </Provider>
    </Router>
  </ThemeProvider>
);

export default App;
