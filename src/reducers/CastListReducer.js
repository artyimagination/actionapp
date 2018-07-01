import {
  FETCH_CAST_LIST
} from '../actions/types';

const INITIAL_STATE = {
  casts: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CAST_LIST:
      return state;
    default:
      return state;
  }
};
