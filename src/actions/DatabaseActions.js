//import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import RNFetchBlob from 'react-native-fetch-blob';

import {
  CATEGORIES_FETCHED,
  FETCH_USER,
  USER_PROFILE_PIC_UPLOADED,
  FETCH_CHAT_USERS,
  PROJECT_FETCHED
} from './types';

import NavigationService from '../components/NavigationService';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const fetchCategories = () => {
  return (dispatch) => {
    firebase.database().ref('/categories')
    .on('value', snapshot => {
      dispatch({ type: CATEGORIES_FETCHED, payload: snapshot.val() });
    });
  };
};


export const fetchUserDetails = () => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_USER, payload: snapshot.val() });
    });
  };
};

export const fetchProjectDetails = () => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/projects`)
      .on('value', snapshot => {
        dispatch({ type: PROJECT_FETCHED, payload: snapshot.val() });
    });
  };
};

export const fetchChatUsers = () => {
  return (dispatch) => {
    firebase.database().ref('/users/')
      .on('value', snapshot => {
        //console.log(snapshot.val());
        dispatch({ type: FETCH_CHAT_USERS, payload: snapshot.val() });
    });
  };
};

export const openChat = ({ chatdata }) => {
  return () => {
    //console.log('what is chat data then ', chatdata);
    NavigationService.navigate('ChattingScreen', {
      name: chatdata.name,
      uid: chatdata.uid,
      avatar: chatdata.pic
    });
  };
};

export const uploadUserProfileImage =
({ uri, name = 'ProfilePic', mime = 'application/octet-stream' }) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
        const uploadUri = uri;
        let uploadBlob = null;
        const { currentUser } = firebase.auth();
        const imageRef = firebase.storage().ref(`${currentUser.uid}`).child(`${name}`);

        fs.readFile(uploadUri, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` });
          })
          .then((blob) => {
            uploadBlob = blob;
            return imageRef.put(uri, { contentType: mime });
          })
          .then(() => {
            uploadBlob.close();
            return imageRef.getDownloadURL();
          })
          .then((url) => {
            //console.log('upload image successfully', url);
            dispatch({ type: USER_PROFILE_PIC_UPLOADED, payload: { name, url } });
            resolve(url);
          })
          .catch((error) => {
            reject(error);
        });
    });
  };
};
