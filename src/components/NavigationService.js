import { NavigationActions, navigation } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function getParams(param){
  console.log("param: " + param);
  _navigator.dispatch(
    console.log("param: " + param),
    navigation.getParam(param)
  );
}


export default { setTopLevelNavigator, navigate, getParams };
