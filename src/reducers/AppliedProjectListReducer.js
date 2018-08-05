import {
  APPLIED_USERS_FETCHED,
  CLEAR_PROJECT_LIST
} from '../actions/types';

const INITIAL_STATE = {
  userList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPLIED_USERS_FETCHED:
      return { ...state, userList: [...state.userList, action.payload] };
    case CLEAR_PROJECT_LIST:
      return INITIAL_STATE;
    default:
      return state;
  }
};
