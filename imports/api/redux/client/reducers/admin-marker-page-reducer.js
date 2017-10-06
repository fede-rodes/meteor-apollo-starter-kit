/* import _ from 'underscore';
import Constants from '../../../constants.js'; */
import {
  textFieldReducer,
  numericFieldReducer,
  dateFieldReducer,
  booleanFieldReducer,
  errorsReducer,
} from './shared-reducers.js';

/**
* Given the same arguments, it should calculate the next state and return it.
* No surprises. No side effects. No API calls. No mutations. Just a calculation.
*/
const initLocationState = {
  placeId: '',
  description: '',
  center: {},
};
const locationReducer = (state = initLocationState, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return action.location;
    case 'CLEAR_LOCATION':
      return initLocationState;
    default:
      return state;
  }
};

// Page reducer. Holds state for the whole page component. Delegates to smaller
// reducers as needed.
const initAdminMarkerPageState = {
  canSubmit: true,
  // sport: '',
  title: '',
  date: null,
  time: null,
  address: '',
  location: {
    placeId: '',
    description: '',
    center: {},
  },
  description: '',
  maxParticipants: null,
  cost: '',
  errors: {
    // sport: [],
    title: [],
    date: [],
    time: [],
    address: [],
    description: [],
    maxParticipants: [],
    cost: [],
  },
};
const adminMarkerPageReducer = (state = initAdminMarkerPageState, action) => {
  if (action.namespace === 'adminMarker') {
    if (action.type === 'SET_INITIAL_STATE') {
      return initAdminMarkerPageState;
    }

    const { fieldName } = action;
    switch (fieldName) {
      case 'canSubmit':
        return {
          ...state,
          [fieldName]: booleanFieldReducer(state[fieldName], action),
        };
      // case 'sport':
      case 'title':
      case 'address':
      case 'description':
      case 'cost':
        return {
          ...state,
          [fieldName]: textFieldReducer(state[fieldName], action),
        };
      case 'date':
      case 'time':
        return {
          ...state,
          [fieldName]: dateFieldReducer(state[fieldName], action),
        };
      case 'location':
        return {
          ...state,
          [fieldName]: locationReducer(state[fieldName], action),
        };
      case 'maxParticipants':
        return {
          ...state,
          [fieldName]: numericFieldReducer(state[fieldName], action),
        };
      case 'errors':
        return {
          ...state,
          [fieldName]: errorsReducer(state[fieldName], action),
        };
      default:
        return state;
    }
  }
  return state;
};

export default adminMarkerPageReducer;
