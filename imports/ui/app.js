import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createApolloClient } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './redux/store.js';
import theme from './theme';
import GlobalDataProvider from './global-data-provider';
// import DefaultLayout from './layouts/default';
import Routes from './routes';

// To get started, create an ApolloClient instance and point it at your GraphQL
// server (handled in our case by meteor-apollo). By default, this client will
// send queries to the '/graphql' endpoint on the same host.
const client = createApolloClient({});

const App = {};

const Header = () => (<span>I am the header</span>);
const Menu = () => [
  <li key="1"><a href="/page_1">Page One</a></li>,
  <li key="2"><a href="/page_2">Page Two</a></li>,
];

//------------------------------------------------------------------------------
// HEADER COMPONENT:
//------------------------------------------------------------------------------
App.Header = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <GlobalDataProvider>
            <Header />
          </GlobalDataProvider>
        </ApolloProvider>
      </Provider>
    </Router>
  </ThemeProvider>
);
//------------------------------------------------------------------------------
// HEADER COMPONENT:
//------------------------------------------------------------------------------
App.Menu = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <GlobalDataProvider>
            <Menu />
          </GlobalDataProvider>
        </ApolloProvider>
      </Provider>
    </Router>
  </ThemeProvider>
);
//------------------------------------------------------------------------------
// MAIN COMPONENT:
//------------------------------------------------------------------------------
App.Main = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <GlobalDataProvider>
            <Routes />
          </GlobalDataProvider>
        </ApolloProvider>
      </Provider>
    </Router>
  </ThemeProvider>
);

export default App;
