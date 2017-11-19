import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { StripeProvider } from 'react-stripe-elements';
import createReduxStore from './redux/store.js';
import GlobalDataProvider from './global-data-provider.jsx';
import DefaultLayout from './layouts/default/index.jsx';
import Routes from './routes.jsx';


// To get started, create an ApolloClient instance and point it at your GraphQL
// server (handled in our case by meteor-apollo). By default, this client will
// send queries to the '/graphql' endpoint on the same host.
const client = new ApolloClient(meteorClientConfig());

// For redux integration see http://dev.apollodata.com/react/redux.html
const store = createReduxStore(client);

// Grab stripe public key
const { stripePublic } = Meteor.settings.public;

const App = () => (
  <Router>
    <ApolloProvider client={client} store={store}>
      <StripeProvider apiKey={stripePublic}>
        <GlobalDataProvider>
          <DefaultLayout>
            <Routes />
          </DefaultLayout>
        </GlobalDataProvider>
      </StripeProvider>
    </ApolloProvider>
  </Router>
);

export default App;
