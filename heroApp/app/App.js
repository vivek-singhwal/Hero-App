import * as React from 'react';
import { View, StatusBar, SafeAreaView,StyleSheet, Alert, TouchableHighlight,Modal, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Material from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import TestPageAPI from './container/TestPageAPI';
import HomePage from './container/HomePage';
import OfflineSync from './container/OfflineSync';
import SettingPage from './container/SettingPage';
import FirstConnection from './container/FirstimeConnection';
import Profile from './container/OperatorProfile';
import BleAppManager from './container/BleAppMananger';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Text, } from 'react-native-paper';
import { EventRegister } from 'react-native-event-listeners';
import { initDB } from './services/DBService';


const Stack = createStackNavigator();
const MessageModal = ({modalVisible,setModalVisible}) => {
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: 'rgba(100,100,100, 0.5)',
          padding: 40,
        }}>

          <View style={styles.modalView}>
            <Text style={styles.modalText}>Bluetooth is currently {'\n'} connected.</Text>
            <Text style={[styles.modalText]}>Would you like to disconnect ?</Text>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:35,marginBottom:15}}>
            <TouchableHighlight
              style={{ ...styles.openButton,backgroundColor: "#fff",marginRight:10 ,borderColor:'#012554',borderWidth:1}}
              onPress={() => {
                EventRegister.emit('BLECMD',{cmd:'disconnect'}) 
                setModalVisible(!modalVisible);
              }}>
              <Text style={[styles.textStyle,{color:'#012554'}]}>Disconnect</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#012554" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const RinseModal = ({modalVisible,setModalVisible})=>{
  const containerStyle = {backgroundColor: 'white',width:"70%",alignSelf:"center",borderRadius:10,paddingBottom:10};
  return(  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}>

  <View
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      backgroundColor: 'rgba(100,100,100, 0.5)',
      padding: 40,
    }}>

      <View style={styles.modalView}>
        <Text style={styles.modalText}>Finished spraying ?</Text>
        <Text style={[styles.modalText]}>Time to do rinse cycle !</Text>
        <Image style={{height:150,width:150,marginTop:20}} source={require('./asset/spray-icon.png')}/>
    <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:35,marginBottom:15,height:50}}>
        <TouchableHighlight
          style={{ ...styles.openButton,backgroundColor: "#fff",marginRight:10 ,borderColor:'#012554',borderWidth:1}}
          onPress={() => {
            // EventRegister.emit('BLECMD',{cmd:'disconnect'}) 
            // setModalVisible(!modalVisible);
            setModalVisible(false);
          }}>
          <Text style={[styles.textStyle,{color:'#012554'}]}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#012554" }}
          onPress={() => {
            // setModalVisible(!modalVisible);
            setModalVisible(false);
          }}>
            <View style={{flexDirection:"row",flex:1}}>
              <Text style={styles.textStyle}>Start</Text>
              <Material 
                    style={{alignSelf:"center",marginLeft:10}}
                    size={25}
                    color={'#fff'}
                    name="keyboard-arrow-right"/>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  </View>
</Modal>)
}


function App() {
  
  const [modalVisible, setModalVisible] = React.useState(false);
  const [rinseModal, setRingseModal] = React.useState(false);



  React.useEffect(()=>{
  
      initDB('sessions').then((res)=>{
        
      });
      initDB('sprayers').then((res)=>{});
      initDB('sessionData').then((res)=>{});
  })
  
  return (
    <>
    <MessageModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    {/* <ConnectionStatus/> */}
    <StatusBar barStyle="dark-content" />
    <SafeAreaView></SafeAreaView>
    {/* <MessageModal/> */}
    <RinseModal modalVisible={rinseModal} setModalVisible={setRingseModal}l/>
    <BleAppManager/>
    <NavigationContainer>
    <OfflineSync/>  
    <Stack.Navigator initialRouteName="HomePage">
    <Stack.Screen name="TestPageAPI" component={TestPageAPI} options={{headerShown: false}}/>
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
            // console.log(">>Click bluetooth");
            // EventRegister.emit('BLE_STATUS',{event:'reqDisconnect'})
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
            console.log(">>Click share");
            setRingseModal(true);
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
            // console.log(">>Click bluetooth")
           setModalVisible(true);
          }}
          size={36}
          // color={'#2C88D9'}
          color='#012554'
          style={{paddingRight:20}}
          name="bluetooth-b"/>
          ),
          headerStyle:{height:80}
       }}/>
        </Stack.Navigator>  
    </NavigationContainer>
  </>);
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
    marginTop: 22,
    
  },
  modalView: {
    margin: 20,
    backgroundColor:"black",
   
    backgroundColor: "white",
    borderRadius: 4,
    padding: 15,
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
    borderRadius: 4,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginTop: 20,
    textAlign: "center"
  }
});
