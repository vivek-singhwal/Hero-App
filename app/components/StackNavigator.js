import HomePage from './HomePage';
import DeviceStatus from './DeviceStatus';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

const AppNavigator = createStackNavigator({
  HomePage: HomePage,
  DeviceStatus:DeviceStatus
}, 
    navigationOptions = Platform.OS == "android" ? 
    {
        headerTitleStyle: {
                    alignSelf: 'center' 
            }, 
    } : {
            headerLeft:{
            visible:null
            }
        },{
            initialRouteName: 'HomePage'
});

export default createAppContainer(AppNavigator);