import * as React from 'react';
import { View, StatusBar, NativeModules, NativeEventEmitter ,SafeAreaView,StyleSheet, Alert, TouchableHighlight,Modal, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TestPageAPI from './container/TestPageAPI';
import HomePage from './container/HomePage';
import OfflineSync from './container/OfflineSync';
import SettingPage from './container/SettingPage';
import FirstConnection from './container/FirstimeConnection';
import Profile from './container/OperatorProfile';
import DeviceConnection from './container/DeviceConnection';
import BleAppManager from './container/BleAppMananger';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Text,Button ,IconButton} from 'react-native-paper';
import RinseProcess from './container/RinseProcessScreens';
import { EventRegister } from 'react-native-event-listeners';
import { initDB } from './services/DBService';
import { getReadingStatus } from './services/DataService';
import Material from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppCtx from './AppContext'
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

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


function App() {
  // const rinseModalContext = { isRinseStart: false }
  // const contextData = React.useContext(GlbContext);
  // console.log(">>contextData ",contextData)
  const [isRinseStatus, setRinseStatus] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [rinseModal, setRingseModal] = React.useState(false);
  const [navigation, setNavigation] = React.useState({}); 
  
  const RinseModal = ({ modalVisible,setModalVisible})=>{
    return(  
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
  
        <View style={[styles.modalView,{justifyContent:"space-around"}]}>
          <Text style={styles.modalText}>Finished spraying ?</Text>
          <Text style={[styles.modalText]}>Time to do rinse cycle !</Text>
          <Image style={{height:150,width:150,marginTop:20}} source={require('./asset/spray-icon.png')}/>
      <View style={{flexDirection:"row",marginTop:35,marginBottom:15}}>
          <TouchableHighlight
            style={{ ...styles.openButton,backgroundColor: "#fff",marginRight:10 ,borderColor:'#012554',borderWidth:1}}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={[styles.textStyle,{color:'#012554',}]}>Cancel</Text>
          </TouchableHighlight>
          <Button
          style={{justifyContent:"center",width:"40%",paddingStart:5}}
          color={'#012554'}
           contentStyle={{flexDirection:"row-reverse"}}
           icon={()=><Material 
                      // style={{backgroundColor:"pink"}}
                     size={25}
                      color={'#fff'}
                      name="keyboard-arrow-right"/>} 
          mode="contained"
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('RinseProcess')
          }}>
            Start
          </Button>
        </View>
      </View>
    </View>
  </Modal>)
  }
  React.useEffect(()=>{
      initDB('sessions').then((res)=>{});
    initDB('sprayers').then((res)=>{});
    initDB('sessionData').then((res)=>{});
   
  })
  if(navigation && navigation.dangerouslyGetState && navigation.dangerouslyGetState().routes &&  navigation.dangerouslyGetState().routes[0].params){
    console.log(">>Inside if")
    setRingseModal(true);
  }
  return (
    <>
    <AppCtx.Provider
        value={{
          doChangeRinseStatus: (status) => {
            console.log("status:"+status);
            setRinseStatus(status);
          }
        }}
      >
    <MessageModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView></SafeAreaView>
    <RinseModal modalVisible={rinseModal} setModalVisible={setRingseModal}/>
    <BleAppManager/>
    <NavigationContainer>
    <OfflineSync/>  
    <Stack.Navigator initialRouteName="HomePage">
    
    <Stack.Screen name="TestPageAPI" component={TestPageAPI} options={{headerShown: false}}/>
    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    <Stack.Screen name="RinseProcess" component={RinseProcess} options={{ headerShown: false }}/>
    {/* <Stack.Screen name="FirstConnection" component={FirstConnection} options={{ headerShown: false }}/> */}
    <Stack.Screen name="DeviceConnection" component={DeviceConnection} options={{ title: 'SCOUT', headerTitleStyle:{fontWeight:"bold",fontSize:25},headerBackTitleVisible:false,headerLeft: ()=> null }}/>
    {/* DeviceConnection */}
    <Stack.Screen 
          name="SettingPage" 
          component={SettingPage} 
          options={{
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
        options={({navigation})=>({
          title: "RANGER",
          headerBackTitleVisible:true,
          headerTitleStyle: {fontSize:24,color:"#012554",fontWeight:"bold",fontStyle:"italic"},
          headerLeft: (()=>
          <IconButton
          disabled={isRinseStatus}
            onPress={()=>{
              setNavigation(navigation);
              setTimeout(()=>{
                setRingseModal(true);
              },600)
            }}
           icon={props=><AwesomeIcon 
            
            size={32}
            // color={'#2C88D9'}
            color={'#012554'}
            style={{
              transform: [
                { scaleX: -1 }
              ]
            }} 
            name="share-square-o"/>}
          />
          ),
          
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
       })}/>

<Stack.Screen name="Dashboard" component={HomePage}
        options={({navigation})=>({
          title: "Dashboard",
          headerBackTitleVisible:true,
          headerTitleStyle: {fontSize:24,color:"#012554",fontWeight:"bold",fontStyle:"italic"},
          headerLeft: (()=>
          <IconButton
          disabled={isRinseStatus}
            onPress={()=>{
              setNavigation(navigation);
              setTimeout(()=>{
                setRingseModal(true);
              },600)
            }}
           icon={props=><AwesomeIcon 
            
            size={32}
            // color={'#2C88D9'}
            color={'#012554'}
            style={{
              transform: [
                { scaleX: -1 }
              ]
            }} 
            name="share-square-o"/>}
          />
          // <AwesomeIcon 
          // onPress={()=>{
          //   setNavigation(navigation);
          //   setTimeout(()=>{
          //     setRingseModal(true);
          //   },600)
          // }}
          // size={32}
          // // color={'#2C88D9'}
          // color={'#012554'}
          // style={{
          //   transform: [
          //     { scaleX: -1 }
          //   ]
          // }} 
          // name="share-square-o"/>
          ),
          
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
       })}/>

    <Stack.Screen 
          name="HomePageRinse" component={HomePage}
          options={({navigation})=>({
          title: "Finished Session",
          headerBackTitleVisible:true,
          headerTitleStyle: {fontSize:24,color:"#012554",fontWeight:"bold",fontStyle:"italic"},
          headerLeft: (()=><Ionicons 
          
          onPress={()=>{
            navigation.navigate('Dashboard');
            // setNavigation(navigation);
            // setTimeout(()=>{
            //   setRingseModal(true);
            // },600)
          }}
          size={32}
          // color={'#2C88D9'}
          color={'#012554'}
          // style={{
          //   transform: [
          //     { scaleX: -1 }
          //   ]
          // }} 
          name="ios-open-outline"/>),
          
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
       })}/>
        </Stack.Navigator>  
    </NavigationContainer>
    </AppCtx.Provider>
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
