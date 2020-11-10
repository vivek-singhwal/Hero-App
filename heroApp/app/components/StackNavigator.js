import HomePage from './HomePage';
import DeviceStatus from './DeviceStatus';
import Setting from './Settings';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

const AppNavigator = createStackNavigator({
  'HomePage': HomePage,
  'DeviceStatus':DeviceStatus,
  'Setting':Setting
},
  {
    initialRouteName: 'HomePage'
    //initialRouteName: 'HomePage'
  });
export default createAppContainer(AppNavigator);