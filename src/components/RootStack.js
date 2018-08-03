import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  DrawerActions
} from 'react-navigation';

import Home from '../scenes/Home';
import LoginScreen from '../scenes/LoginScreen';
import ForgotPasswordScreen from '../scenes/ForgotPasswordScreen';
import {
  UserSignUp,
  UserProfileScreen,
  UserDetailsScreen,
  UserActorDetailsScreen
} from '../scenes/registration';
import LogoutScreen from '../scenes/LogoutScreen';
import MainTabNavigator from './MainTabNavigator';
import CustomDrawerContentComponent from './CustomDrawerContentComponent';
import {
  AboutUs,
  Draft,
  Settings,
  HelpAndSupport,
  NotificationScreen
} from '../scenes/mainscreens';
import {
  UploadProjectScreen1,
  CastScreen,
  OtherCategoryScreen
} from '../scenes/mainscreens/projects';

import NavigationService from './NavigationService';


const MainStack = createStackNavigator(
{
  HomeScreen: Home,
  Login: LoginScreen,
  SignUpScreen: UserSignUp,
  ForgotPassword: ForgotPasswordScreen
},
{
  initialRouteName: 'HomeScreen'
}
);

const ProjectTab = createStackNavigator(
  {
    ProjectScreen1: UploadProjectScreen1,
    ProjectScreen2: CastScreen,
    ProjectScreen3: OtherCategoryScreen
  },
  {
    initialRouteName: 'ProjectScreen1',
    mode: 'Modal',
    headerMode: 'none'
  }
);

const DrawerNavigation = createDrawerNavigator({
  Page1: {
    screen: MainTabNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
      activeTintColor: '#e91e63'
    }
  },
  page2: {
    screen: AboutUs,
    navigationOptions: {
      drawerLabel: 'About Us'
    }
  },
  page3: {
    screen: Draft,
    navigationOptions: {
      drawerLabel: 'Draft'
    }
  },
  page4: {
    screen: Settings,
    navigationOptions: {
      drawerLabel: 'Settings'
    }
  },
  page5: {
    screen: HelpAndSupport,
    navigationOptions: {
      drawerLabel: 'Help And Support'
    }
  },
  Page6: {
    screen: LogoutScreen,
    navigationOptions: {
      drawerLabel: 'Logout'
    }
  }
},
{
  initialRouteName: 'Page1',
  contentComponent: CustomDrawerContentComponent
});

const RegistrationStack = createStackNavigator(
{
  UserProfile: UserProfileScreen,
  UserDetails: UserDetailsScreen,
  UserActorDetails: UserActorDetailsScreen
},
{
  navigationOptions: {
    title: 'Update Profile'
  }
}
);

const HomeStack = createStackNavigator(
  {
    HomeStackScreen1: {
      screen: DrawerNavigation,
      navigationOptions: ({ navigation }) => ({
        title: 'Action',
        headerLeft: (
          <DrawerButton name="navicon" navigation={navigation} style={styles.Headercss} />
        ),
        headerRight: (
          <SearchButton navigation={navigation} style={styles.Headercss}  />
        ),
        // headerStyle: { paddingRight: 10, paddingLeft: 10 },
        headerTitleStyle: { color: 'rgb(234, 94, 32)' }
      })
    },
    Project: {
      screen: ProjectTab,
      navigationOptions: () => ({
        title: 'Update New Project'
      })
    },
    Notification: {
      screen: NotificationScreen
    }
  },
  {
    initialRouteName: 'HomeStackScreen1',
    headerMode: 'screen'
  }
);

const SearchButton = () => {
  return (
    <View>
      <TouchableOpacity
      onPress={() => { NavigationService.navigate('Notification'); }}
      >
        <Icon name="bell" size={25} style={styles.Headercss} />
      </TouchableOpacity>
    </View>
  );
};

const DrawerButton = (props) => {
	return (
    <View>
      <TouchableOpacity
      onPress={() => { props.navigation.dispatch(DrawerActions.toggleDrawer()); }}
      >
        <Icon name={props.name} size={30} style={styles.Headercss} />
      </TouchableOpacity>
    </View>
  );
};

const RootStack = createSwitchNavigator(
  {
    Main: MainStack,
    Registration: RegistrationStack,
    Home: HomeStack
  },
  {
    initialRouteName: 'Main'
  }
);

const styles = {
  Headercss: {
    color: 'rgb(234, 94, 32)',
    justifyContent: 'space-around',
    paddingleft: 45,
    paddingRight: 15,

  }

};


export default RootStack;
