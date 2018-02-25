import React from 'react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { createApolloClient } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './redux/store.js';
import theme from './theme';
import GlobalDataProvider from './global-data-provider';

// To get started, create an ApolloClient instance and point it at your GraphQL
// server (handled in our case by meteor-apollo). By default, this client will
// send queries to the '/graphql' endpoint on the same host.
const client = createApolloClient({});

// Given that we are implementing App Shell Architecture and, therefore,
// injecting (via reactDOM.render) the Header, Menu and Main components into
// different HTML elements, we need a way to share the router 'history' among
// all three mentioned components.
// As a default, for every invocation of 'BrowserRouter', there will be new
// 'history' instance created. Then, changes in the 'history' object in one
// component won't be available in the other components. To prevent this, we are
// relying on 'Router' component instead of 'BrowserRouter' and defining our
// custom 'history' object by means of 'createBrowserHistory' function. Said
// 'history' object is then passed to every invocation of 'Router' and therefore
// the same 'history' object will be shared among all three mentioned components.
const history = createBrowserHistory();

const App = ({ component }) => (
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <GlobalDataProvider>
            {globalDataProps => (
              React.createElement(component, { ...globalDataProps })
            )}
          </GlobalDataProvider>
        </ApolloProvider>
      </Provider>
    </Router>
  </ThemeProvider>
);

export default App;
