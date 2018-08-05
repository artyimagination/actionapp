import { FETCH_CHAT_USERS, CLEAR_USER_DATA } from '../actions/types';


const INITIAL_STATE = {
  userList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CHAT_USERS:
      return { ...state, userList: [...state.userList, action.payload] };
    case CLEAR_USER_DATA:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
