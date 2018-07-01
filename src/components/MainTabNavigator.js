import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import {
  HomeScreen,
  DashboardScreen,
  SearchScreen,
  ChatScreen,
  UserProfileScreen
} from '../scenes/mainscreens';

import Chat from './Chat';

const ChatScreenNavigation = createStackNavigator({
  ChatMainScreen: {
    screen: ChatScreen,
    navigationOptions: {
      title: 'Chat'
    }
  },
  ChattingScreen: {
    screen: Chat,
    navigationOptions: {
      title: 'Chat'
    }
  }
},
{
    initialRouteName: 'ChatMainScreen'
});

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home'
    }
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      title: 'Search'
    }
  },
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: 'Dashboard'
    }
  },
  Chat: {
    screen: ChatScreenNavigation,
    navigationOptions: {
      title: 'Chat'
    }
  },
  Profile: {
    screen: UserProfileScreen,
    navigationOptions: {
      title: 'Profile'
    }
  }

},
{
  navigationOptions: ({ navigation }) => ({
    title: 'Header Title',
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName = '';
      if (routeName === 'Home') {
        iconName = `home${focused ? '' : ''}`;
      } else if (routeName === 'Dashboard') {
        iconName = `table${focused ? '' : ''}`;
      } else if (routeName === 'Search') {
        iconName = `search${focused ? '' : ''}`;
      } else if (routeName === 'Chat') {
        iconName = `comment${focused ? '' : ''}`;
      } else if (routeName === 'Profile') {
        iconName = `user${focused ? '' : ''}`;
      }

      return <Icon name={iconName} size={25} color={tintColor} />;
    }
  }),
  tabBarOptions: {
    activeTinkColor: 'rgb(234, 94, 32)',
    inactiveTinkColor: 'gray'
  }
});

class MainTabNavigator extends Component {

  static navigationOptions = {
    drawerIcon: (
      <Icon name="home" size={25} />
    )
  }

  render() {
    return (
      <TabNavigator />
    );
  }
}

export default MainTabNavigator;
