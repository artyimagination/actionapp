import firebase from 'react-native-firebase';

import {
  ADD_CAST,
  UPDATE_CAST,
  FETCH_CAST_LIST,
  CLEAR_CAST
} from './types';


export const addCast = ({ currentcast }) => {
  return (dispatch) => {
    dispatch({ type: ADD_CAST, payload: currentcast });
    dispatch({ type: CLEAR_CAST });
  };
};


export const updateCast = ({ prop, value }) => {
  return {
    type: UPDATE_CAST,
    payload: { prop, value }
  };
};


export const fetchCastList = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_CAST_LIST
    });
  };
};
