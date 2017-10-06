// import Constants from '../../../constants.js';
import {
  textFieldReducer,
  numericFieldReducer,
  booleanFieldReducer,
} from './shared-reducers.js';

/**
* Given the same arguments, it should calculate the next state and return it.
* No surprises. No side effects. No API calls. No mutations. Just a calculation.
*/
const viewReducer = (state = 'list', action) => {
  switch (action.type) {
    case 'CHANGE_VIEW':
      if (action.view === 'list' || action.view === 'map') {
        return action.view;
      }
      return state;
    default:
      return state;
  }
};

const searchTypeReducer = (state = 'place', action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH_TYPE':
      if (action.searchType === 'place' || action.searchType === 'mapBounds') {
        return action.searchType;
      }
      return state;
    default:
      return state;
  }
};

const placeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PLACE':
      return {
        radius: 0, // Constants.FEED_MAX_RADIUS,
        ...state,
        ...action.changedFields,
      };
    case 'CLEAR_PLACE':
      return {};
    default:
      return state;
  }
};

const mapBoundsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_MAP_BOUNDS':
      const { southWest, northEast, center } = action;
      return {
        southWest,
        northEast,
        center,
      };
    case 'CLEAR_MAP_BOUNDS':
      return {};
    default:
      return state;
  }
};

// Page reducer. Holds state for the whole page component. Delegates to smaller
// reducers as needed.
const initFeedPageState = {
  view: 'list', // not needed
  searchType: 'place', // not needed
  pageNumber: 1, // not needed
  searchText: '',
  place: {}, // not needed
  mapBounds: {},
  zoom: 0, // Constants.FEED_DEFAULT_ZOOM,
  showRecalculateMarkersButton: false,
  errors: {},
  updateUrl: false, // not needed
};
const feedPageReducer = (state = initFeedPageState, action) => {
  if (action.namespace === 'feed') {
    const { fieldName } = action;
    switch (fieldName) {
      case 'view':
        return {
          ...state,
          [fieldName]: viewReducer(state[fieldName], action),
        };
      case 'searchType':
        return {
          ...state,
          [fieldName]: searchTypeReducer(state[fieldName], action),
        };
      case 'pageNumber':
      case 'zoom':
        return {
          ...state,
          [fieldName]: numericFieldReducer(state[fieldName], action),
        };
      case 'searchText':
        return {
          ...state,
          [fieldName]: textFieldReducer(state[fieldName], action),
        };
      case 'place':
        return {
          ...state,
          [fieldName]: placeReducer(state[fieldName], action),
        };
      case 'mapBounds':
        return {
          ...state,
          [fieldName]: mapBoundsReducer(state[fieldName], action),
        };
        // TODO: change name to 'displayRecalculateMarkersButton'
      case 'showRecalculateMarkersButton':
        switch (action.type) {
          case 'CHECK_RECALCULATE_MARKERS_BUTTON_DISPLAY_STATE':
            const { searchType } = state;
            if (searchType === 'place' || searchType === 'mapBounds') {
              const display = state.zoom !== action.zoom
                || Math.sqrt(Math.pow(state[searchType].center.lat - action.center.lat, 2)) > 0.0001
                || Math.sqrt(Math.pow(state[searchType].center.lng - action.center.lng, 2)) > 0.0001;
              return {
                ...state,
                [fieldName]: display,
              };
            } /* else if (state.searchType === 'mapBounds') {
              console.log('state.searchType === mapBounds');
              const show = state.zoom !== action.zoom
                || Math.sqrt(Math.pow(state.mapBounds.center.lat - action.center.lat, 2)) > 0.0001
                || Math.sqrt(Math.pow(state.mapBounds.center.lng - action.center.lng, 2)) > 0.0001;
                console.log('state.searchType === mapBounds');
                console.log(`show: ${show}`);
              return {
                ...state,
                [fieldName]: show,
              };
            } */
            else {
              return state;
            }

          case 'HIDE_RECALCULATE_MARKERS_BUTTON':
            return {
              ...state,
              [fieldName]: false,
            };

          default:
            return state;
        }
        return state;
      case 'updateUrl':
        return {
          ...state,
          [fieldName]: booleanFieldReducer(state[fieldName], action),
        };
      default:
        return state;
    }
  }
  return state;
};

export default feedPageReducer;
