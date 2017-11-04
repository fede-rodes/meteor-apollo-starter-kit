// import Constants from '../../../constants.js';
import {
  textFieldReducer,
  booleanFieldReducer,
} from './shared-reducers.js';

/**
* Given the same arguments, it should calculate the next state and return it.
* No surprises. No side effects. No API calls. No mutations. Just a calculation.
*/

// Page reducer. Holds state for the whole page component. Delegates to smaller
// reducers as needed.
const initPostsSystemState = {
  canSubmitNewPost: true,
  newPostContent: '',
  canSubmitEditPost: false,
  editPostId: '',
  editPostContent: '',
  canSubmitDeletePost: false,
  errors: {
    newPost: [],
    editPost: [],
  },

};
const postsSystemReducer = (state = initPostsSystemState, action) => {
  if (action.namespace === 'postsSystem') {
    const { fieldName } = action;
    switch (fieldName) {
      case 'canSubmitNewPost':
      case 'canSubmitEditPost':
      case 'canSubmitDeletePost':
        return {
          ...state,
          [fieldName]: booleanFieldReducer(state[fieldName], action),
        };
      case 'newPostContent':
      case 'editPostId':
      case 'editPostContent':
        return {
          ...state,
          [fieldName]: textFieldReducer(state[fieldName], action),
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

export default postsSystemReducer;
