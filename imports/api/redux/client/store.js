import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createRootReducer from './root-reducer.js';
import DevTools from './dev-tools.jsx';

const createReduxStore = (client) => {
  const logger = createLogger();

  const enhancers = [
    applyMiddleware(client.middleware() /* , logger */),
    DevTools.instrument(),
    // applyMiddleware(client.middleware()),
    // If you are using the devToolsExtension, you can add it here also
    // (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ];

  const rootReducer = createRootReducer(client);

  // A Redux Store has 3 methods:
  // 1. store.getState() -> returns the current state
  // 2. store.dispatch({type: 'SAY_HELLO', message: 'HAI'});
  // We won't use this really. We have other means for reactivity.
  // 3. store.subscribe(someFunction);
  const store = createStore(rootReducer, {}, compose(...enhancers));

  return store;
};

export default createReduxStore;
/*
import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from './root-reducer.js';
import DevTools from './dev-tools.jsx';

const logger = createLogger();

const enhancers = [
  // applyMiddleware(ReduxThunk, logger),
  DevTools.instrument(),
];

// A Redux Store has 3 methods:
// 1. store.getState() -> returns the current state
// 2. store.dispatch({type: 'SAY_HELLO', message: 'HAI'});
// We won't use this really. We have other means for reactivity.
// 3. store.subscribe(someFunction);
const Store = createStore(rootReducer, {}, compose(...enhancers));

export default Store;
*/
