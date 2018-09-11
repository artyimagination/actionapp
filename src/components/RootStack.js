import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
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
  NotificationScreen,
  ViewProject,
  AppliedProjectUsers,
  ViewActorProfileScreen,
  ViewProducerProfile
  
} from '../scenes/mainscreens';
import {
  UploadProjectScreen1,
  CastScreen,
  OtherCategoryScreen,
 // FilterScreen
} from '../scenes/mainscreens/projects';

import Chat from './Chat';
import NavigationService from './NavigationService';


const MainStack = createStackNavigator(
{
  HomeScreen: Home,
  Login: LoginScreen,
  SignUpScreen: UserSignUp,
  ForgotPassword: ForgotPasswordScreen,
  UpdateProfile: UserProfileScreen,
  ViewActorProfile: ViewActorProfileScreen,
  ViewProducer : ViewProducerProfile,
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
      drawerLabel: 'Home'
    },
 
  },
  Page2: {
    screen: AboutUs,
    navigationOptions: {
      drawerLabel: 'About Us'
    },
  
  },
  Page3: {
    screen: Draft,
    navigationOptions: {
      drawerLabel: 'Draft'
    },
  
  }, 
Page4: {
    screen: Settings,
    navigationOptions: {
      drawerLabel: 'Settings'
    },
   
  },
  Page5: {
    screen: HelpAndSupport,
    navigationOptions: {
      drawerLabel: 'Help And Support'
    },
   
  },
  Page6: {
    screen: LogoutScreen,
    navigationOptions: {
      drawerLabel: 'Logout'
    },
    
  }

},
{
  initialRouteName: 'Page1',
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    activeTintColor: 'rgb(234, 94, 32)'
  }
});

const RegistrationStack = createStackNavigator(
{
  UserProfile: UserProfileScreen,
  UserDetails: UserDetailsScreen,
  UserActorDetails: UserActorDetailsScreen
},
{
  navigationOptions: {
    title: 'Update Profile',
    contentOptions: {
      activeTintColor: 'rgb(234, 94, 32)'
    }
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
          <DrawerButton name="navicon" style={styles.Headercss} navigation={navigation} />
        ),
        headerRight: (
          <SearchButton style={styles.Headercss} navigation={navigation} />
        ),
        headerStyle: { paddingRight: 5, paddingLeft: 5 },
        headerTitleStyle: { color: 'rgb(234, 94, 32)' }
        
      })
    },
    Project: {
      screen: ProjectTab,
      navigationOptions: () => ({
        title: '  Create New Project',
        headerTintColor: 'rgb(234, 94, 32)', 
      })
    },
    Notification: {
      screen: NotificationScreen
    },
    // Filters: {
    //  screen: FilterScreen
    // },
    ProjectView: {
      screen: ViewProject,
      navigationOptions: () => ({
        title: 'View Project',
        headerTintColor: 'rgb(234, 94, 32)', 
      })
    },
    AppliedProjectScreen: {
      screen: AppliedProjectUsers,
      navigationOptions: () => ({
        title: 'Applied Users',
        headerTintColor: 'rgb(234, 94, 32)', 
      })
    },
    ChattingScreen: {
      screen: Chat,
      navigationOptions: {
        title: 'Chat'
      }
    },
    ViewProfileScreen: {
      screen: ViewActorProfileScreen,
      navigationOptions: () => ({
        title: 'View Profile',
        headerTintColor: 'rgb(234, 94, 32)',
      })
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
      {/* <Image  src={require('../images/logo/Icon/notificationButton.png')}></Image> */}
        <Icon name="bell" size={20} style={styles.Headercss} />
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
        <Icon name={props.name} size={20} style={styles.Headercss} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
    Headercss: {
     color: 'rgb(234, 94, 32)',
     justifyContent: 'space-around',
     paddingLeft: 15,
     paddingRight: 15,
   }
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


export default RootStack;
