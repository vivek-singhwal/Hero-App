import * as React from 'react';
import { View, Text,StatusBar, SafeAreaView,StyleSheet,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Home from './container/Home';
// import DeviceStatus from './container/DeviceStatus';
// import Settings from './container/Settings';
import HomePage from './container/HomePage';
import Profile from './container/OperatorProfile';
import BleAppManager from './container/BleAppMananger';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

function App() {
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView></SafeAreaView>
    <BleAppManager/>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen name="Profile" component={Profile} options={{
          headerShown: false,
        }} />

      <Stack.Screen name="HomePage" component={HomePage}
        options={{
          title: "RANGER",
          headerTitleStyle: {fontSize:24,color:"#012554",fontWeight:"bold",fontStyle:"italic"},
          headerLeft: (()=><AwesomeIcon 
          onPress={()=>{
            console.log(">>Click share")
          }}
          size={32}
          // color={'#2C88D9'}
          color='#012554'
          style={{backgroundColor:"pink"}}
          style={{
            // transform: [{ rotate: '270deg'}]
            transform: [
              { scaleX: -1 }
            ]
          }} 
          name="share-square-o"/>),
          headerLeftContainerStyle:{paddingLeft:20},
          headerRight:(()=><AwesomeIcon
          onPress={()=>{
            console.log(">>Click bluetooth")
          }}
          size={36}
          // color={'#2C88D9'}
          color='#012554'
          style={{paddingRight:20}}
          name="bluetooth-b"/>
          ),
          headerStyle:{height:80}
        }}
        
      />  
      {/* <Stack.Screen name="Home" component={Home} options={{
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
        }}/> */}
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
