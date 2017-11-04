import { combineReducers } from 'redux';
import loginPageReducer from './reducers/login-page-reducer.js';
import feedPageReducer from './reducers/feed-page-reducer.js';
import newMarkerPageReducer from './reducers/new-marker-page-reducer.js';
import markerPageReducer from './reducers/marker-page-reducer.js';
import adminMarkerPageReducer from './reducers/admin-marker-page-reducer.js';
import postsSystemReducer from './reducers/posts-system-reducer.js';

/**
 * @summary Integrate Apollo client reducers with our own Redux reducers.
 */

const createRootReducer = apolloClient => (
  // rootReducer
  combineReducers({
    login: loginPageReducer,
    feed: feedPageReducer,
    newMarker: newMarkerPageReducer,
    marker: markerPageReducer,
    adminMarker: adminMarkerPageReducer,
    postsSystem: postsSystemReducer,
    apollo: apolloClient.reducer(),
  })
);

export default createRootReducer;
