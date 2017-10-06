import { combineReducers } from 'redux';
import loginPageReducer from './reducers/login-page-reducer.js';
import feedPageReducer from './reducers/feed-page-reducer.js';
import newMarkerPageReducer from './reducers/new-marker-page-reducer.js';
import markerPageReducer from './reducers/marker-page-reducer.js';
import adminMarkerPageReducer from './reducers/admin-marker-page-reducer.js';
import postsSystemReducer from './reducers/posts-system-reducer.js';

const createRootReducer = (client) => {
  const rootReducer = combineReducers({
    login: loginPageReducer,
    feed: feedPageReducer,
    newMarker: newMarkerPageReducer,
    marker: markerPageReducer,
    adminMarker: adminMarkerPageReducer,
    postsSystem: postsSystemReducer,
    apollo: client.reducer(),
  });

  return rootReducer;
};

export default createRootReducer;


/*
import { combineReducers } from 'redux';
import loginPageReducer from './reducers/login-page-reducer.js';
import feedPageReducer from './reducers/feed-page-reducer.js';
import newMarkerPageReducer from './reducers/new-marker-page-reducer.js';
import markerPageReducer from './reducers/marker-page-reducer.js';
import adminMarkerPageReducer from './reducers/admin-marker-page-reducer.js';
import postsSystemReducer from './reducers/posts-system-reducer.js';

const rootReducer = combineReducers({
  login: loginPageReducer,
  feed: feedPageReducer,
  newMarker: newMarkerPageReducer,
  marker: markerPageReducer,
  adminMarker: adminMarkerPageReducer,
  postsSystem: postsSystemReducer,
});

export default rootReducer;
*/
