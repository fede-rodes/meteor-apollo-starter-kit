// import _ from 'lodash';
// import Constants from '../../../constants.js';
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
const initSelectedLocationState = {
  placeId: '',
  description: '',
  center: {},
};
const selectedLocationReducer = (state = initSelectedLocationState, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_LOCATION':
      return action.selectedLocation;
    case 'CLEAR_SELECTED_LOCATION':
      return initSelectedLocationState;
    default:
      return state;
  }
};

// Page reducer. Holds state for the whole page component. Delegates to smaller
// reducers as needed.
const initNewMarkerPageState = {
  canSubmit: true,
  sport: '',
  venueId: '',
  date: null,
  time: null,
  errors: {
    sport: [],
    venueId: [],
    date: [],
    time: [],
  },
};
const newMarkerPageReducer = (state = initNewMarkerPageState, action) => {
  if (action.namespace === 'newMarker') {
    if (action.type === 'SET_INITIAL_STATE') {
      return initNewMarkerPageState;
    }

    const { fieldName } = action;
    switch (fieldName) {
      case 'canSubmit':
        return {
          ...state,
          [fieldName]: booleanFieldReducer(state[fieldName], action),
        };
      case 'sport':
      case 'venueId':
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
      /* case 'selectedLocation':
        return {
          ...state,
          [fieldName]: selectedLocationReducer(state[fieldName], action),
        };
      case 'maxParticipants':
        return {
          ...state,
          [fieldName]: numericFieldReducer(state[fieldName], action),
        }; */
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

export default newMarkerPageReducer;
