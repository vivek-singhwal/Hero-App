import * as React from 'react';
import { View, Text,StatusBar, SafeAreaView,StyleSheet,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './container/Home';
import BleAppManager from './container/BleAppMananger';


function AboutScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>About Screen</Text>
    </View>
  );
}

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
          headerTitle: "",
        }} />
      <Stack.Screen name="About" component={AboutScreen} />
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
