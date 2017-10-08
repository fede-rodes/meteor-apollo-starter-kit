// import Constants from '../../../constants.js';
import {
  booleanFieldReducer,
  errorsReducer,
} from './shared-reducers.js';

/**
* Given the same arguments, it should calculate the next state and return it.
* No surprises. No side effects. No API calls. No mutations. Just a calculation.
*/
// Page reducer. Holds state for the whole page component. Delegates to smaller
// reducers as needed.
const initLoginModalState = {
  canSubmit: true,
  errors: {
    auth: [],
  },
};
const loginPageReducer = (state = initLoginModalState, action) => {
  if (action.namespace === 'login') {
    const { fieldName } = action;
    switch (fieldName) {
      case 'canSubmit':
        return {
          ...state,
          [fieldName]: booleanFieldReducer(state[fieldName], action),
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
}

export default loginPageReducer;
