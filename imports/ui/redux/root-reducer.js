import { combineReducers } from 'redux';

// Integrate Apollo client reducers with our own Redux reducers.
const createRootReducer = apolloClient => (
  // rootReducer
  combineReducers({
    // page: pageReducer,
    apollo: apolloClient.reducer(),
  })
);

export default createRootReducer;
