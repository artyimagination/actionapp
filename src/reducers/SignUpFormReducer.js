import {
  SIGNUP_USER,
  SIGNUP_DATA,
  ERROR_SIGNIN
} from '../actions/types';


const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  loading: false
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_DATA:
        return { ...state, [action.payload.prop]: action.payload.value };
    case SIGNUP_USER:
      return INITIAL_STATE;
    case ERROR_SIGNIN:
      //console.log('ERROR_SIGNIN');
      return { ...state, loading: false };
    default:
      return state;
  }
};
