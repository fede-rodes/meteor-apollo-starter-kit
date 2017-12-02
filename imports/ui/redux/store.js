import { applyMiddleware, createStore, compose } from 'redux';
// import { createLogger } from 'redux-logger'; // DISABLE ON PRODUCTION
// import DevTools from './dev-tools.jsx'; // DISABLE ON PRODUCTION
import createRootReducer from './root-reducer.js';

//------------------------------------------------------------------------------
/**
* @summary Integrate Apollo client with our Redux Store.
* A Redux Store has 3 methods:
* 1. store.getState() -> returns the current state
* 2. store.dispatch({ type: 'SAY_HELLO', message: 'HAI' });
* We won't use this really. We have other means for reactivity.
* 3. store.subscribe(someFunction);
*/
const createReduxStore = (apolloClient) => {
  const enhancers = [
    applyMiddleware(
      apolloClient.middleware(),
      // createLogger(),
    ),
    // DevTools.instrument(),
  ];

  const rootReducer = createRootReducer(apolloClient);
  // store
  return createStore(rootReducer, {}, compose(...enhancers));
};

export default createReduxStore;
