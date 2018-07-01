import firebase from 'react-native-firebase';

import {
  UPDATE_PROJECT_DETAILS,
  SAVE_INTO_DRAFT,
  SAVE_PROJECT_ID,
  CLEAR_PROJECT_DATA,
  PROJECT_LIST_FETCHED,
  DRAFT_PROJECT_FETCHED
} from './types';
import NavigationService from '../components/NavigationService';

export const updateProjectDetails = ({ prop, value }) => {
  return {
    type: UPDATE_PROJECT_DETAILS,
    payload: { prop, value }
  };
};


export const onProjectSaved = ({ title, type, description, language, cast, location, isDraft }) => {
  return (dispatch) => {
    const now = new Date().getTime();
    const { currentUser } = firebase.auth();
    const ref = firebase.database().ref('/projects')
    .push({
      title, type, description, language, cast, location, isDraft: true, userid: currentUser.uid, time: now });
    if (!isDraft) {
      NavigationService.navigate('ProjectScreen2');
      dispatch({ type: SAVE_PROJECT_ID, payload: ref.key });
    } else {
      NavigationService.navigate('Page1');
      dispatch({ type: SAVE_PROJECT_ID, payload: ref.key });
    }
  };
};

export const onProjectSaveToDraft = ({ id }) => {
  return (dispatch) => {
    firebase.database().ref(`/projects/${id}`)
    .update({ isDraft: true })
    .then(() => {
      dispatch({ type: SAVE_INTO_DRAFT });
      NavigationService.navigate('Page1');
    });
  };
};

export const onCastDataSaved = ({ cast, id }) => {
  return (dispatch) => {
    firebase.database().ref('/casts')
    .push({ cast })
    .then(() => {
      NavigationService.navigate('ProjectScreen3');
      dispatch({ type: SAVE_PROJECT_ID, payload: id });
    });
  };
};

export const postProject = ({ id }) => {
  return (dispatch) => {
    firebase.database().ref(`/projects/${id}`)
    .update({ isDraft: false })
    .then(() => {
      dispatch({ type: CLEAR_PROJECT_DATA });
      NavigationService.navigate('Page1');
    });
    //console.log('is this not navigating to Home');
  };
};


export const fetchProjectList = () => {
  return (dispatch) => {
    firebase.database().ref('/projects')
    .on('value', snapshot => {
      dispatch({ type: PROJECT_LIST_FETCHED, payload: snapshot.val() });
    });
  };
};

export const fetchDraftProject = () => {
  return (dispatch) => {
    //const { currentUser } = firebase.auth();
    const ref = firebase.database().ref('/projects');
    //const query = ref.orderBy('userid').equalTo(`${currentUser.uid}`);
    //console.log('query >>> ', query);
    ref.on('value', snapshot => {
      console.log('data >>>> ', snapshot.val());
      dispatch({ type: DRAFT_PROJECT_FETCHED, payload: snapshot.val() });
    });
  };
};
