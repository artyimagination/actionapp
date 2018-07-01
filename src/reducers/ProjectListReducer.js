import {
  PROJECT_LIST_FETCHED,
  DRAFT_PROJECT_FETCHED
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_LIST_FETCHED:
      return action.payload;
    case DRAFT_PROJECT_FETCHED:
      return action.payload;
    default:
      return state;
  }
};
