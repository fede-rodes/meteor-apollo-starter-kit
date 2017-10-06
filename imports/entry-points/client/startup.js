/* import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { createMeteorNetworkInterface, meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';

// Redux integration
import createReduxStore from '../../api/redux/client/store.js';
import GlobalDataProvider from './global-data-provider.jsx';
import Routes from './routes.js';

// To get started, create an ApolloClient instance and point it at your GraphQL
// server (handled in our case by meteor-apollo). By default, this client will
// send queries to the `/graphql` endpoint on the same host.
const serverUrlBrowser = 'http://localhost:3000';
const graphQLpath = '/graphql';
const graphQLURL: string = `${serverUrlBrowser}${graphQLpath}`;
const networkInterface = createNetworkInterface({
  uri: graphQLURL,
  // Enable the Meteor User Accounts middleware to identify the user with every
  // request thanks to her login token.
  useMeteorAccounts: true,
  // Use a batched network interface instead of a classic network interface.
  // batchingInterface: true,
});

networkInterface.use([{
  async applyMiddleware(req: any, next: any) {
    if (!req.options.headers) {
      console.log('here 1');
      req.options.headers = {};  // Create the header object if needed.
    }
    console.log('here 2');
    const authenticationToken = await localStorage.getItem('Meteor.loginToken');
    req.options.headers['meteor-login-token'] = authenticationToken;
    next();
  },
}]);

const client = new ApolloClient(meteorClientConfig({ networkInterface }));
// If your database has unique IDs across all types of objects, you can use
// a very simple function!
// const client = new ApolloClient({
//    dataIdFromObject: o => o.id
// });
// What about this for Meteor-Apollo? See: http://dev.apollodata.com/react/cache-updates.html

// For redux integration see http://dev.apollodata.com/react/redux.html
const store = createReduxStore(client);

Meteor.startup(() => {
  render(
    <Router>
      <ApolloProvider client={client} store={store}>
        <GlobalDataProvider>
          <Routes />
        </GlobalDataProvider>
      </ApolloProvider>
    </Router>,
    document.getElementById('app'),
  );
}); */


import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { createMeteorNetworkInterface, meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';

// Redux integration
import createReduxStore from '../../api/redux/client/store.js';
import GlobalDataProvider from './global-data-provider.jsx';
import Routes from './routes.js';

// To get started, create an ApolloClient instance and point it at your GraphQL
// server (handled in our case by meteor-apollo). By default, this client will
// send queries to the '/graphql' endpoint on the same host.
// const serverUrlBrowser = 'http://localhost:3000';
// const graphQLpath = '/graphql';
const networkInterface = createMeteorNetworkInterface({
  // Enable the Meteor User Accounts middleware to identify the user with every
  // request thanks to her login token.
  useMeteorAccounts: true,
  // Use a batched network interface instead of a classic network interface.
  // batchingInterface: true,
});

const client = new ApolloClient(meteorClientConfig({ networkInterface }));
// If your database has unique IDs across all types of objects, you can use
// a very simple function!
// const client = new ApolloClient({
//    dataIdFromObject: o => o.id
// });
// What about this for Meteor-Apollo? See: http://dev.apollodata.com/react/cache-updates.html

// For redux integration see http://dev.apollodata.com/react/redux.html
const store = createReduxStore(client);

Meteor.startup(() => {
  render(
    <Router>
      <ApolloProvider client={client} store={store}>
        <GlobalDataProvider>
          <Routes />
        </GlobalDataProvider>
      </ApolloProvider>
    </Router>,
    document.getElementById('app'),
  );
});
