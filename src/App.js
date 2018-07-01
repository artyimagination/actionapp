import React, { Component } from 'react';
//import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import RootStack from './components/RootStack';
import NavigationService from './components/NavigationService';

console.disableYellowBox = true;

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const DEV = false;
    const navigationPersistenceKey = DEV ? 'NavigationStateDEV' : null;

    return (
      <Provider store={store}>
        <RootStack
          persistenceKey={navigationPersistenceKey}
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}


export default App;
