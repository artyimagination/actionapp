import { FETCH_CHAT_USERS } from '../actions/types';


const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CHAT_USERS:
      return action.payload;
    default:
      return state;
  }
};
