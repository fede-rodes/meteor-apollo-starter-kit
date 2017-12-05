import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import createReduxStore from './redux/store';
import GlobalDataProvider from './global-data-provider';
import DefaultLayout from './layouts/default';
import Routes from './routes';

// To get started, create an ApolloClient instance and point it at your GraphQL
// server (handled in our case by meteor-apollo). By default, this client will
// send queries to the '/graphql' endpoint on the same host.
const client = new ApolloClient(meteorClientConfig());

// For redux integration see http://dev.apollodata.com/react/redux.html
const store = createReduxStore(client);

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <ApolloProvider client={client} store={store}>
        <GlobalDataProvider>
          <DefaultLayout>
            <Routes />
          </DefaultLayout>
        </GlobalDataProvider>
      </ApolloProvider>
    </Router>
  </ThemeProvider>
);

export default App;
