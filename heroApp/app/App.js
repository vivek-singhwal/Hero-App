import * as React from 'react';
import { View, Text,StatusBar, SafeAreaView,StyleSheet,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './container/Home';
import DeviceStatus from './container/DeviceStatus';
import Settings from './container/Settings';
import BleAppManager from './container/BleAppMananger';

const Stack = createStackNavigator();

function App() {
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView></SafeAreaView>
    <BleAppManager/>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{
          headerShown: false,
        }} />
        
      <Stack.Screen name="DeviceStatus" component={DeviceStatus} options={{
          title:"Device Status",
          headerStyle: {
            backgroundColor: '#556983',
          },
          headerBackTitleVisible:false,
          headerTintColor: '#DFECF5',
          headerTitleStyle: {
            textAlign:'center',
            fontWeight: 'bold',
          }
        }} />
      <Stack.Screen name="Settings" component={Settings} options={{
          title:"Settings",
          headerStyle: {
            backgroundColor: '#556983',
          },
          headerBackTitleVisible:false,
          headerTintColor: '#DFECF5',
          headerTitleStyle: {
            textAlign:'center',
            fontWeight: 'bold',
          }
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
export default App;

/*
export default  App = () => {
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView></SafeAreaView>
    <View>
      <Text>Hello App</Text>
    </View>
    </>
  );
}
  /*
export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <View style={{ height: '100%', width: '100%' }}>
        <BleComponent />
        <StackNavigator/>
      </View>
    );
  }
}
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
