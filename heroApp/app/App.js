import * as React from 'react';
import { View, StatusBar, SafeAreaView,StyleSheet, Alert, TouchableHighlight,Modal, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
// import Home from './container/Home';
// import DeviceStatus from './container/DeviceStatus';
// import Settings from './container/Settings';
import HomePage from './container/HomePage';
import SettingPage from './container/SettingPage';
import FirstConnection from './container/FirstimeConnection';
import Profile from './container/OperatorProfile';
import BleAppManager from './container/BleAppMananger';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Text, } from 'react-native-paper';

const Stack = createStackNavigator();
const MessageModal = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
};
function App() {

  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView></SafeAreaView>
    {/* <MessageModal/> */}
    <BleAppManager/>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="FirstConnection">
    <Stack.Screen name="Profile" component={Profile} options={{
          headerShown: false,
    }}/>
       <Stack.Screen name="FirstConnection" component={FirstConnection} options={{
          headerShown: false,
    }}/>
    <Stack.Screen name="SettingPage" component={SettingPage}  options={{
          headerBackTitle:'Back',
          headerTitleStyle: {fontSize:24,color:"#012554",fontWeight:"bold",fontStyle:"italic"},
          headerRight:(()=><AwesomeIcon
          onPress={()=>{
            console.log(">>Click bluetooth")
            Alert.alert('','Bluetooth is currently connected.\n\n Would you like to disconnect');
          }}
          size={36}
          // color={'#2C88D9'}
          color='#012554'
          style={{paddingRight:20}}
          name="bluetooth-b"/>
          ),
          headerStyle:{height:80}
        }}/>

      <Stack.Screen name="HomePage" component={HomePage}
        options={{
          title: "RANGER",
          
          headerBackTitleVisible:true,
          headerTitleStyle: {fontSize:24,color:"#012554",fontWeight:"bold",fontStyle:"italic"},
          headerLeft: (()=><AwesomeIcon 
          
          onPress={()=>{
            console.log(">>Click share")
          }}
          size={32}
          // color={'#2C88D9'}
          color={'#012554'}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
