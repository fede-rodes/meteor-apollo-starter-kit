import {
  createStore,
  compose,
  // applyMiddleware,
} from 'redux';
import rootReducer from './root-reducer.js';
// import { createLogger } from 'redux-logger'; // DISABLE ON PRODUCTION
// import DevTools from './dev-tools'; // DISABLE ON PRODUCTION

//------------------------------------------------------------------------------
// A Redux Store has 3 methods:
// 1. store.getState() -> returns the current state
// 2. store.dispatch({type: 'SAY_HELLO', message: 'HAI'});
// We won't use this really. We have other means for reactivity.
// 3. store.subscribe(someFunction);

// const logger = createLogger();

const enhancers = [
  // applyMiddleware(logger),
  // DevTools.instrument(),
];

// Store
export default createStore(rootReducer, {}, compose(...enhancers));
