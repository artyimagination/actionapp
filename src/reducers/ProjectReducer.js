import {
  UPDATE_PROJECT_DETAILS,
  SAVE_INTO_DRAFT,
  ADD_CAST,
  SAVE_PROJECT_ID,
  CLEAR_PROJECT_DATA
} from '../actions/types';

const INITIAL_STATE = {
  id: '',
  title: '',
  image: '',
  type: '',
  description: '',
  cast: [],
  location: '',
  language: '',
  category: '',
  isDraft: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PROJECT_DETAILS:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SAVE_PROJECT_ID:
      return { ...state, isDraft: true, id: action.payload };
    case SAVE_INTO_DRAFT:
      return { ...state, isDraft: true };
    case ADD_CAST:
      return { ...state, cast: [...state.cast, action.payload] };
    case CLEAR_PROJECT_DATA:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
