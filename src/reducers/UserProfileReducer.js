import {
        USER_PROFILE_DATA,
        USER_PROFILE_DATA_SAVED,
        USER_PROFILE_DATA_SAVE_PROCESS,
        USER_PROFILE_PIC_UPLOADED,
        FETCH_USER,
        CLEAR_USER_DATA,
        FETCH_USER_NAME,
        ERROR_SIGNIN
      } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  category: 'Director',
  date: '1992-11-30',
  gender: 'male',
  language: 'hindi',
  address: '',
  selectedstate: 'Andaman and Nicobar Islands',
  city: '',
  mobile: '',
  height: '',
  weight: '',
  waist: '',
  complexation: '',
  experience: '',
  description: '',
  youtubelink: '',
  fblink: '',
  instalink: '',
  ProfilePic: '',
  pic0: '',
  pic1: '',
  pic2: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  //console.log(action.payload);
  switch (action.type) {
    case USER_PROFILE_DATA:
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_PROFILE_DATA_SAVED:
      return { ...state, loading: false };
    case USER_PROFILE_DATA_SAVE_PROCESS:
      return { ...state, loading: true };
    case USER_PROFILE_PIC_UPLOADED:
      return { ...state, [action.payload.name]: action.payload.url };
    case FETCH_USER_NAME:
     return state.name;
    case CLEAR_USER_DATA:
      return { ...state, INITIAL_STATE };
    case ERROR_SIGNIN:
      return { ...state, loading: false };
    case FETCH_USER:
      const { name,
              email,
              category,
              date,
              gender,
              language,
              address,
              selectedstate,
              city,
              mobile,
              experience,
              description,
              youtubelink,
              fblink,
              instalink,
              ProfilePic,
              pic0,
              pic1,
              pic2
      } = action.payload;
      return { ...state,
        name,
        email,
        date,
        gender,
        language,
        category,
        address,
        selectedstate,
        city,
        mobile,
        experience,
        description,
        youtubelink,
        fblink,
        instalink,
        ProfilePic,
        pic0,
        pic1,
        pic2
      };
    default:
      return state;
  }
};
