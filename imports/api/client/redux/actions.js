/**
* @summary Client side reusable actions (redux).
* @namespace Actions.
*/

const setInitialState = namespace => (
  {
    type: 'SET_INITIAL_STATE',
    namespace,
  }
);

const changeView = (namespace, view) => (
  {
    type: 'CHANGE_VIEW',
    namespace,
    fieldName: 'view',
    view,
  }
);

const changeSearchType = (namespace, searchType) => (
  {
    type: 'CHANGE_SEARCH_TYPE',
    namespace,
    fieldName: 'searchType',
    searchType,
  }
);


// place = { placeId, description, coordinates, radius }
// changedFields = { placeId, description, coordinates } or { radius }
const updatePlace = (namespace, changedFields) => (
  {
    type: 'UPDATE_PLACE',
    namespace,
    fieldName: 'place',
    changedFields,
  }
);

const clearPlace = namespace => (
  {
    type: 'CLEAR_PLACE',
    namespace,
    fieldName: 'place',
  }
);

const updateSelectedLocation = (namespace, selectedLocation) => (
  {
    type: 'UPDATE_SELECTED_LOCATION',
    namespace,
    fieldName: 'selectedLocation',
    selectedLocation,
  }
);

const updateLocation = (namespace, location) => (
  {
    type: 'UPDATE_LOCATION',
    namespace,
    fieldName: 'location',
    location,
  }
);

const clearSelectedLocation = namespace => (
  {
    type: 'CLEAR_SELECTED_LOCATION',
    namespace,
    fieldName: 'selectedLocation',
  }
);

const updateMapBounds = (namespace, southWest, northEast, center) => (
  {
    type: 'UPDATE_MAP_BOUNDS',
    namespace,
    fieldName: 'mapBounds',
    southWest,
    northEast,
    center,
  }
);

const clearMapBounds = namespace => (
  {
    type: 'CLEAR_MAP_BOUNDS',
    namespace,
    fieldName: 'mapBounds',
  }
);

const updateTextField = (namespace, fieldName, value) => (
  {
    type: 'UPDATE_TEXT_FIELD',
    namespace,
    fieldName,
    value,
  }
);

const clearTextField = (namespace, fieldName) => (
  {
    type: 'CLEAR_TEXT_FIELD',
    namespace,
    fieldName,
  }
);

const setNumericField = (namespace, fieldName, value) => (
  {
    type: 'SET_NUMERIC_FIELD',
    namespace,
    fieldName,
    value,
  }
);

const incrementNumericField = (namespace, fieldName, value) => (
  {
    type: 'INCREMENT_NUMERIC_FIELD',
    namespace,
    fieldName,
    value,
  }
);

const setDateField = (namespace, fieldName, value) => (
  {
    type: 'SET_DATE_FIELD',
    namespace,
    fieldName,
    value,
  }
);

const setBooleanField = (namespace, fieldName, value) => (
  {
    type: 'SET_BOOLEAN_FIELD',
    namespace,
    fieldName,
    value,
  }
);

const checkRecalculateMarkersButtonDisplayState = (namespace, center, zoom) => (
  {
    type: 'CHECK_RECALCULATE_MARKERS_BUTTON_DISPLAY_STATE',
    namespace,
    fieldName: 'showRecalculateMarkersButton',
    center,
    zoom,
  }
);

const hideRecalculateMarkersButton = namespace => (
  {
    type: 'HIDE_RECALCULATE_MARKERS_BUTTON',
    namespace,
    fieldName: 'showRecalculateMarkersButton',
  }
);

const setErrors = (namespace, errorsObj) => (
  {
    type: 'SET_ERRORS',
    namespace,
    fieldName: 'errors',
    errorsObj,
  }
);

const clearErrors = (namespace, fieldNameArray) => (
  {
    type: 'CLEAR_ERRORS',
    namespace,
    fieldName: 'errors',
    fieldNameArray,
  }
);

// All actions go here. Every time an action is dispacthed, all reducers run.
const Actions = {
  setInitialState,
  changeView,
  changeSearchType,
  updateTextField,
  clearTextField,
  setNumericField,
  incrementNumericField,
  setDateField,
  setBooleanField,
  updatePlace,
  clearPlace,
  updateSelectedLocation,
  updateLocation,
  clearSelectedLocation,
  updateMapBounds,
  clearMapBounds,
  checkRecalculateMarkersButtonDisplayState,
  hideRecalculateMarkersButton,
  setErrors,
  clearErrors,
};

export default Actions;
