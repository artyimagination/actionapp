import { createStackNavigator } from 'react-navigation';
import Home from '../scenes/Home';
import Login from '../scenes/Login';

const DemoStack = createStackNavigator({
  HomeScreen: Login
});


export default DemoStack;
