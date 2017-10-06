// import _ from 'lodash';
// TODO: change name to 'common reducers'
/**
* Given the same arguments, it should calculate the next state and return it.
* No surprises. No side effects. No API calls. No mutations. Just a calculation.
*/

export const textFieldReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_TEXT_FIELD':
      return action.value;
    case 'CLEAR_TEXT_FIELD':
      return '';
    default:
      return state;
  }
};

export const numericFieldReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NUMERIC_FIELD':
      return action.value;
    case 'CLEAR_NUMERIC_FIELD':
      return null;
    case 'INCREMENT_NUMERIC_FIELD':
      return action.value;
    case 'DECREMENT_NUMERIC_FIELD':
      if (!state) {
        return 0;
      }
      return -action.value;
    default:
      return state;
  }
};

export const dateFieldReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_DATE_FIELD':
      return action.value;
    default:
      return state;
  }
};

export const booleanFieldReducer = (state = true, action) => {
  switch (action.type) {
    case 'SET_BOOLEAN_FIELD':
      return action.value;
    default:
      return state;
  }
};

const errorReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ERROR': {
      return state.concat(action.array);
    }
    case 'CLEAR_FIELD': { // TODO: check this. is it used??
      return [];
    }
    default:
      return state;
  }
};

// TODO: check this reducer, add tests
export const errorsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ERRORS': {
      const newState = state;
      _.each(_.keys(action.errorsObj), (key) => {
        newState[key] = errorReducer(state[key], { type: 'SET_ERROR', array: action.errorsObj[key] });
      });
      return newState;
    }
    case 'CLEAR_ERRORS': {
      const { fieldNameArray } = action;
      const newState = state;
      if (_.isString(fieldNameArray)) {
        newState[fieldNameArray] = [];
      } else {
        _.each(action.fieldNameArray, (fieldName) => {
          newState[fieldName] = [];
        });
      }
      return newState;
    }
    default:
      return state;
  }
};
