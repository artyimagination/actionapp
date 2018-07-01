
import { createStackNavigator } from 'react-navigation';
import {
  AboutUs
} from '../scenes/mainscreens';


const DrawerStack = createStackNavigator({
  AboutUsScreen: AboutUs
},
{
  mode: 'modal',
  headerMode: 'none',
});


export default DrawerStack;
