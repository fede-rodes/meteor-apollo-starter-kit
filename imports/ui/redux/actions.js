/**
* @namespace Actions
* @summary Client side reusable actions (redux).
*/
const Actions = {};

//------------------------------------------------------------------------------
Actions.setInitialState = namespace => (
  {
    type: 'SET_INITIAL_STATE',
    namespace,
  }
);
//------------------------------------------------------------------------------
Actions.updateTextField = (namespace, fieldName, value) => (
  {
    type: 'UPDATE_TEXT_FIELD',
    namespace,
    fieldName,
    value,
  }
);
//------------------------------------------------------------------------------
Actions.clearTextField = (namespace, fieldName) => (
  {
    type: 'CLEAR_TEXT_FIELD',
    namespace,
    fieldName,
  }
);
//------------------------------------------------------------------------------
Actions.setNumericField = (namespace, fieldName, value) => (
  {
    type: 'SET_NUMERIC_FIELD',
    namespace,
    fieldName,
    value,
  }
);
//------------------------------------------------------------------------------
Actions.incrementNumericField = (namespace, fieldName, value) => (
  {
    type: 'INCREMENT_NUMERIC_FIELD',
    namespace,
    fieldName,
    value,
  }
);
//------------------------------------------------------------------------------
Actions.setDateField = (namespace, fieldName, value) => (
  {
    type: 'SET_DATE_FIELD',
    namespace,
    fieldName,
    value,
  }
);
//------------------------------------------------------------------------------
Actions.setBooleanField = (namespace, fieldName, value) => (
  {
    type: 'SET_BOOLEAN_FIELD',
    namespace,
    fieldName,
    value,
  }
);
//------------------------------------------------------------------------------

export default Actions;
