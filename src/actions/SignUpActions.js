import { Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import NavigationService from '../components/NavigationService';

import {
  SIGNUP_DATA,
  USER_PROFILE_DATA,
  USER_PROFILE_DATA_SAVED,
  USER_PROFILE_DATA_SAVE_PROCESS,
  CLEAR_USER_DATA,
  ERROR_SIGNIN
} from './types';

import CurrentUser from '../utils/CurrentUser';


export const signUp = ({ prop, value }) => {
  return {
    type: SIGNUP_DATA,
    payload: { prop, value }
  };
};

export const userProfile = ({ prop, value }) => {
  return {
    type: USER_PROFILE_DATA,
    payload: { prop, value }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    firebase.auth().signOut()
    .then(() => {
      dispatch({ type: CLEAR_USER_DATA });
      NavigationService.navigate('Main');
    });
  };
};

export const saveUserProfile = ({ userprofile }) => {
  return (dispatch) => {
    //console.log(userprofile);
    const {
      name, category, date, language, gender, address, selectedstate, city, mobile
    } = userprofile;
    dispatch({ type: USER_PROFILE_DATA_SAVE_PROCESS });
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}`)
    .update({ name, category, date, mobile, language, gender, address, selectedstate, city })
    .then(() => {
      dispatch({ type: USER_PROFILE_DATA_SAVED });
      if (category === 'Actor(Male)'
      || category === 'Actor(Female)'
      || category === 'Child Actor(Male)'
      || category === 'Child Actor(Female)') {
        NavigationService.navigate('UserActorDetails');
      } else {
        NavigationService.navigate('UserDetails');
      }
    });
  };
};

export const saveUserDetails = ({ userprofile }) => {
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
      CurrentUser.isFirstTimeUser = false;
      NavigationService.navigate('Home');
    });
  };
};

export const signUpUser = ({ email, name, password, mobileNo }) => {

  console.log(name);
  return (dispatch) => {
    // firebase.auth().verifyPhoneNumber(mobileNo)
    // .on('state_changed', phoneAuthSnapshot => {
    //   switch (phoneAuthSnapshot.state) {
    //     case firebase.auth.PhoneAuthState.CODE_SENT:
    //       console.log('Verification Code Sent');
    //       break;
    //     case firebase.auth.PhoneAuthState.ERROR:
    //       console.log('Error : ', phoneAuthSnapshot.error);
    //     break;
    //     default:
    //       console.log('Default Case');
    //   }
    // });
  
    //     dispatch({ type: USER_PROFILE_DATA_SAVE_PROCESS });
    // CurrentUser.isFirstTimeUser = true;
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then(user => saveIntoDatabase(dispatch, user, name, mobileNo))
    //   .catch(() => ErrorWhileSignIn(dispatch));
  

           // If user is not exist signup
      firebase.auth().signInWithPhoneNumber(mobileNo)
        .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
        .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
      
      //saveToDatabase
        const { currentUser } = firebase.auth();
        console.log(currentUser.uid);
        const ref = firebase.database().ref(`/users/${currentUser.uid}`)
       .set({ 'name': name, 'mobile' : mobileNo });
  };
};

export const signInWithGoogle = () => {
  return (dispatch) => {
    dispatch({ type: USER_PROFILE_DATA_SAVE_PROCESS });
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '962384235593-408lom4cv4iq250v2mlls4mtkad18j4k.apps.googleusercontent.com',
      offlineAccess: true,
      forceConsentPrompt: true,
    })
    .then(() => {
        GoogleSignin.signIn()
        .then((data) => {
          const credential =
            firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
          return firebase.auth().signInAndRetrieveDataWithCredential(credential);
        })
        .then((user) => {
          //console.log('Sign in successfully with google ', user.additionalUserInfo.isNewUser);
          CurrentUser.isFirstTimeUser = true;
          if (isUserNew(user.additionalUserInfo)) {
            const { _user } = user.user;
            updateUserProfileData(dispatch, _user);
            saveIntoDatabase(dispatch, user, _user.displayName, _user.email, '');
          } else {
            CurrentUser.isFirstTimeUser = false;
            NavigationService.navigate('Home');
          }
        })
        .catch((error) => {
          console.log('Error While Sign in with google ', error);
        });
    });
  };
};

export const signInWithFacebook = () => {
  return (dispatch) => {
    dispatch({ type: USER_PROFILE_DATA_SAVE_PROCESS });
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error(
            'the User Cancelled the request'
          ));
        }
        return AccessToken.getCurrentAccessToken();
      })
      .then((data) => {
        const credential =
          firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        return firebase.auth().signInAndRetrieveDataWithCredential(credential);
      })
      .then((user) => {
        //console.log('Facebook Login : ', user);
        CurrentUser.isFirstTimeUser = true;
        if (isUserNew(user.additionalUserInfo)) {
          const { _user } = user.user;
          updateUserProfileData(dispatch, _user);
          saveIntoDatabase(dispatch, user, _user.displayName, _user.email, '');
        } else {
          CurrentUser.isFirstTimeUser = false;
          NavigationService.navigate('Home');
        }
      })
      .catch((error) => {
        console.log('Error While facebook log - in', error);
      });
  };
};

const isUserNew = ({ isNewUser }) => {
  return isNewUser;
};

const updateUserProfileData = (dispatch, { displayName, email }) => {
  dispatch({ type: USER_PROFILE_DATA,
    payload: {
      prop: 'name',
      value: displayName
   } });

   dispatch({ type: USER_PROFILE_DATA,
     payload: {
       prop: 'email',
       value: email
    } });
};

const saveIntoDatabase = (dispatch, user, name, email) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}`)
  .update({ email, uid: currentUser.uid })
  .then(() => {
    CurrentUser.isFirstTimeUser = true;
    dispatch({ type: USER_PROFILE_DATA_SAVED });
    NavigationService.navigate('Registration');
  });
};

const ErrorWhileSignIn = (dispatch, error = '') => {
  if (error !== '') {
    Alert.alert('Error', error);
  } else {
    Alert.alert('Error', 'Some went wrong');
  }

  dispatch({ type: ERROR_SIGNIN });
};
