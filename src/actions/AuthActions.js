import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  FORGOT_PASSWORD,
  PASSCODE_TEXT,
  NEW_PASSWORD,
  CONFIRM_PASSWORD,
  PASSWORD_RESET
} from './types';

import NavigationService from '../components/NavigationService';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const enterEmail = (text) => {
  return {
    type: FORGOT_PASSWORD,
    payload: text
  };
};

export const passcodeText = (text) => {
  return {
    type: PASSCODE_TEXT,
    payload: text
  };
};

export const newPassword = (text) => {
  return {
    type: NEW_PASSWORD,
    payload: text
  };
};

export const confirmPassword = (text) => {
  return {
    type: CONFIRM_PASSWORD,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};


export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(() => {
      console.log('some error occurs');
      //Alert('Error', 'Email or Password incorrect');
      loginUserFail(dispatch);
      /*firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));*/
    });
  };
};


export const confirmForgotPassword = (email) => {
  return (dispatch) => {
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      console.log('code sent to your mail id, please check and enter the code');
      dispatch({ type: PASSWORD_RESET });
      Alert.alert(
        'Password Reset',
        'Link sent to your mail id, please check and reset your Password',
        [
          {
            text: 'OK',
            onPress: () => NavigationService.navigate('Login')
          }
        ]
      );
    })
    .catch((error) => {
      console.log('error details >>> ', error);
      Alert.alert(
        'Error',
        'Invalid Email id'
      );
    });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  NavigationService.navigate('Home');
  //NavigationService.navigate('UserDetails');
};
