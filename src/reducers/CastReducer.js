import {
  UPDATE_CAST,
  CLEAR_CAST
} from '../actions/types';


const INITIAL_STATE = {
  id: '',
  projectid: '',
  title: '',
  genderType: '',
  gender: '',
  minAge: '',
  maxAge: '',
  language: '',
  minHeight: '',
  maxHeight: '',
  roles: '',
  experience: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CAST:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CLEAR_CAST:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
