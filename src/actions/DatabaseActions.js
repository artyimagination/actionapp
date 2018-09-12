//import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import RNFetchBlob from 'react-native-fetch-blob';

import {
  CATEGORIES_FETCHED,
  FETCH_USER,
  USER_PROFILE_PIC_UPLOADED,
  FETCH_CHAT_USERS,
  PROJECT_FETCHED,
  FETCH_PROJECT_USER_DETAILS,
  USER_PROFILE_DATA_SAVE_PROCESS,
  USER_PROFILE_DATA_SAVED,
  CLEAR_CHAT_LIST
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
   console.log(currentUser);
    firebase.database().ref(`/users/${currentUser}`)
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


export const createChatUsers = (fuid) => {
  return () => {
    const { currentUser } = firebase.auth();
    const ref = firebase.database().ref(`/chat/${generateChatId(currentUser.uid, fuid)}`);
    ref.on('value', (snapshot) => {
      fetchUserAndRedirectToChat(fuid);
      console.log('value of chat >>>> ', snapshot.val());
    });
  };
};

const fetchUserAndRedirectToChat = (fuid) => {
  firebase.database().ref(`/users/${fuid}`).on('value', (snapshot) => {
    NavigationService.navigate('ChattingScreen', {
      name: snapshot.val().name,
      uid: snapshot.val().uid,
      avatar: snapshot.val().ProfilePic
    });
  });
};


export const fetchChatUsers = () => {
  return (dispatch) => {
    firebase.database().ref('/users/')
      .on('value', (snapshot) => {
        console.log(snapshot);
        snapshot.forEach((child) => {
          console.log(child.key, child.val().uid);
          isChatUser(child, dispatch);
          /*if () {
            console.log(child.key, child.val());
            dispatch({ type: FETCH_CHAT_USERS, payload: child });
          }*/
        });
        //dispatch({ type: FETCH_CHAT_USERS, payload: snapshot.val() });
    });
  };
};

const isChatUser = (child, dispatch) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/chat/${generateChatId(currentUser.uid, child.key)}`)
  .on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        dispatch({ type: FETCH_CHAT_USERS, payload: child.val() });
      }
  });
};

export const openChat = (user) => {
  return () => {
    console.log('what is chat data then ', user);
    NavigationService.navigate('ChattingScreen', {
      name: user.name,
      uid: user.uid,
      avatar: user.ProfilePic
    });
  };
};

export const clearChatList = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_CHAT_LIST });
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

export const fetchProjectUserDetails = (id) => {
  return (dispatch) => {
    firebase.database().ref(`/users/${id}`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_PROJECT_USER_DETAILS, payload: snapshot.val() });
    });
  };
};

export const updateUserProfile = ({ userprofile }) => {
  return (dispatch) => {
    const {
      height, weight, waist, experience, ProfilePic, description, youtubelink, fblink, instalink, pic1, pic2, pic3
    } = userprofile;
    dispatch({ type: USER_PROFILE_DATA_SAVE_PROCESS });
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}`)
    .update(
      { height, weight, waist, experience, ProfilePic, description, youtubelink, fblink, instalink, pic1, pic2, pic3 })
    .then(() => {
      dispatch({ type: USER_PROFILE_DATA_SAVED });
    });
  };
};

const generateChatId = (cuid, fuid) => {
  if (cuid > fuid) return `${cuid}-${fuid}`;
  return `${fuid}-${cuid}`;
};
