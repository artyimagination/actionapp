import {
  FETCH_PROJECT_USER_DETAILS
} from '../actions/types';


const INITIAL_STATE = { };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROJECT_USER_DETAILS:
      return action.payload;
    default:
      return state;
  }
};
