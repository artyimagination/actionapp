import {
  SIGNUP_USER,
  SIGNUP_DATA
} from '../actions/types';


const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  mobile: '',
  loading: false
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_DATA:
        return { ...state, [action.payload.prop]: action.payload.value };
    case SIGNUP_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
