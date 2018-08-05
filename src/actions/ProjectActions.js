import firebase from 'react-native-firebase';

import {
  UPDATE_PROJECT_DETAILS,
  SAVE_INTO_DRAFT,
  SAVE_PROJECT_ID,
  CLEAR_PROJECT_DATA,
  PROJECT_LIST_FETCHED,
  DRAFT_PROJECT_FETCHED,
  APPILED_PROJECT,
  APPLIED_USERS_FETCHED,
  CLEAR_PROJECT_LIST
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


export const applyProject = (projectId) => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref('/appliedProject')
    .push({ uid: currentUser.uid, projectId })
    .then(() => {
      console.log('successfully applied for project');
      //applied for project
      dispatch({ type: APPILED_PROJECT });
    });
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

export const fetchAppliedUsersToProject = (projectId) => {
  return (dispatch) => {
    //console.log('project id in fetch user detaisl ', projectId);
    /*firebase.database().ref('users').on('value', (snapshot) => {
      snapshot.forEach((child) => {
        const id = child.key;
        const ref = firebase.database().ref(`users/${id}/appliedProject`);
        const query = ref.orderByChild('projectId').equalTo(`${projectId}`);
        query.on('value', (secondSnapshot) => {
          if (secondSnapshot.val() !== null) {
            dispatch({ type: APPLIED_USERS_FETCHED, payload: child });
            console.log('project id in fetch user detaisl ', child.val(), secondSnapshot.val());
          }
        /*snapshot.forEach((child) => {
          console.log(child.key, child.val().name);
        });*/
      //});
        //console.log(child.key, child.val());
      //});
    /*});*/
    /*const query = ref.orderByChild('projectId').equalTo(`${projectId}`);
    query.on('value', (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.key, child.val());
        /*child.val().appliedProject.forEach((nextChild) => {
          console.log(nextChild.key, nextChild.val());
        });*/
      /*});*/
    /*});*/
    const ref = firebase.database().ref('appliedProject');
    const query = ref.orderByChild('projectId').equalTo(`${projectId}`);
    query.on('value', (snapshot) => {
      //dispatch({ type: APPLIED_USERS_FETCHED, payload: snapshot.val() });
      console.log('project id in fetch user detaisl ', snapshot.val());
      snapshot.forEach((child) => {
        //console.log(child.key, child.val().uid);
        getUserById(child.val().uid, dispatch);
      });
    });
  };
};

export const clearProjectList = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_PROJECT_LIST });
  };
};

export const getUserById = (uid, dispatch) => {
  firebase.database().ref(`/users/${uid}`).on('value', (snapshot) => {
    dispatch({ type: APPLIED_USERS_FETCHED, payload: snapshot.val() });
  });
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
