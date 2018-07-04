import {
  FORGOT_PASSWORD,
  MOBILE_PASSWORD_CODE,
  PASSWORD_RESET,
  PASSCODE_TEXT,
  NEW_PASSWORD,
  CONFIRM_PASSWORD,
  OLD_PASSWORD
} from '../actions/types';


const INITIAL_STATE = {
  email: '',
  mobile: '',
  passcodeText: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD:
      return { ...state, email: action.payload };
    case MOBILE_PASSWORD_CODE:
      return { ...state, mobile: action.payload };
    case PASSWORD_RESET:
      return { ...state, ...INITIAL_STATE };
    case PASSCODE_TEXT:
        return { ...state, passcodeText: action.payload };
    case NEW_PASSWORD:
      return { ...state, newPassword: action.payload };
    case CONFIRM_PASSWORD:
        return { ...state, newPassword: action.payload };
    case OLD_PASSWORD:
        return { ...state, oldPassword: action.payload };
    default:
      return state;
  }
};
