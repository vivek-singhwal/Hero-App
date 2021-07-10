import React,{useEffect,useState} from 'react';
import { View, TextInput as Input,FlatList,Text,TouchableOpacity,StyleSheet ,Image, TouchableHighlight , ScrollView} from 'react-native';
import { Button,Modal } from 'react-native-paper';
import Material from 'react-native-vector-icons/MaterialIcons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Foundation from 'react-native-vector-icons/Foundation';
import { EventRegister } from 'react-native-event-listeners';
import { BluetoothStatus } from 'react-native-bluetooth-status';
import { getDeviceHWData, setDeviceHWData } from '../services/DataService';
import {initDB, addSprayer, getSprayers, getSprayersByHwId, delSprayer} from '../services/DBService';
import LearnHow from './LearnHow';
let deviceListAr = [];
export default DeviceConnection = ({navigation})=>{
    var deviceArray = [];
    const [count,setCount] = useState(true);
    const [selectedId, setSelectedId] = useState();
    const [deviceStatus, setDeviceStatus] = useState('');
    const [deviceList, setDeviceList] = useState(deviceArray);
    const [isDeviceConnected, setisDeviceConnected] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [bleErrorModal,setBleErrorModal] = useState(false);
    const [blueToothOFF,setBlueToothON] = useState(false);
    listEmptyComponent = () => {
        return (
            <View>
               <View style={{flexDirection:"row",paddingBottom:5}}>
                 <Foundation color={'red'} size={22} name="alert" style={{paddingRight:5}}/>
                 <Text style={{fontSize: 18, color:"red", textDecorationStyle:"solid", textDecorationLine:"underline"}}>No Sprayer found.</Text>
                </View>
                <Text style={{fontSize: 18,}}>Make sure your sprayer is charged,</Text>
                <Text  style={{fontSize: 18,}}>Powered ON, and in range.</Text>
                <TouchableOpacity onPress={()=>setModalVisible(true)}>
                    <Text style={{color:"#012554",fontSize: 18,paddingTop:5,textDecorationLine:"underline"}}>How to connect your sprayer.</Text>
                </TouchableOpacity>
            </View>
        )
    }
    var checkDeviceConnection = function(){
      var deviceObj = {
        sdName:getDeviceHWData().sdName,
        hardwareId:getDeviceHWData().hardwareId,
        serverId:null,
        isSync:0,
        sprayerName:getDeviceHWData().sprayerName
      }
      getSprayersByHwId(getDeviceHWData().hardwareId).then((resDevice)=>{
        if(resDevice.length){
            deviceObj.serverId = resDevice[0].serverId;
            deviceObj.sprayerName = resDevice[0].sprayerName;
        }else{
            addSprayer(deviceObj).then(()=>{
            
            })
        }
        setDeviceHWData(deviceObj);
        navigation.navigate('HomePage');
      })
    }
    useEffect(()=>{
        if(count){
            initDB('sprayers').then((res)=>{
            });
          setCount(false);
        }
        if(deviceStatus == ''){
            EventRegister.emit('BLECMD', { cmd: 'startScan' });
        }
        
        var listener = EventRegister.addEventListener('BLE_STATUS', (data) => {
            //console.log(">>BLE_STATUS ",data);
            if(data.event == "Data_Recieved"){
                //console.log("Data_Recieved:",data.value);
              }
             
              if(data.event == "error"){
                  setisDeviceConnected(false);
                  setDeviceStatus("Disconnected");
                  setBleErrorModal(true);
                  navigation.navigate('DeviceConnection');
                }else if(data.event == "deviceNotAvaible"){
                  setBleErrorModal(true);
                  // empty array
                  deviceArray.length = 0;
                  deviceListAr.length = 0
                  setDeviceList(deviceArray);
                }
              if(data.event == "connected"){
                setisDeviceConnected(true);
                setDeviceStatus("Connecting");
              } else if(data.event == "bleDevices"){
                  deviceListAr.push(data.devices);
                  var arrayUniqueByKey = [...new Map(deviceListAr.map(item =>
                    [item['id'], item])).values()];
                  setDeviceList(arrayUniqueByKey);
              } else if(data.event == "reading"){
                //setDeviceStatus("Reading...");
              } else if(data.event == "readOK"){
                // setDeviceStatus("Ready");
                // if ready then automatically goto homepage
                checkDeviceConnection();
              } else if(data.event == "scanning"){
                setDeviceStatus("Scanning...");  
              } else if(data.event == "disconnected"){
                setisDeviceConnected(false);
                setDeviceStatus("Disconnected");
                navigation.navigate('DeviceConnection');
              }else if(data.event ==='stopScan'){
                  // Alert.alert('HeroApp','No device found.')
                  setDeviceStatus("stopScan");
              }
            });
            return ()=>{
              EventRegister.removeEventListener(listener);
            //   BackHandler.removeEventListener('hardwareBackPress', () => true)
          }  
    },[]);
  return(<>  
    <ScrollView>
    <View style={{flex:1,width:"85%",height:"100%",alignSelf:"center",marginTop:30,marginBottom:10}}>
        <View style={{justifyContent:"space-between",flexDirection:"row"}}>  
            <Text style={{fontSize:18,paddingBottom:10,}}>Power ON sprayer</Text>
            <TouchableOpacity onPress={()=>{setModalVisible(true)}} style={{paddingBottom:10}}>
            <Text style={{fontSize:18,color:"#012554", textDecorationLine:"underline",fontWeight:"700"}}>Learn how</Text>
            </TouchableOpacity>
        </View>
        <Image source={require('../asset/sprayDevice.png')} style={{alignSelf:"center",width:"100%",borderWidth:0.7,borderColor:"gray"}}/>
        <View style={{flexDirection:"row",justifyContent:"space-between",paddingBottom:10,marginTop:20}}>
            <Text style={{fontSize:18}}>Select sprayer</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('HomePage')}} style={{paddingBottom:2}}>
            <Text style={{fontSize:18, textDecorationLine:"underline",}}>Sessions</Text>
            </TouchableOpacity>
        </View>
        <View style={{height:200,backgroundColor:"white",padding:15,paddingLeft:20,borderWidth:0.7,borderColor:"gray"}}> 
            <FlatList
                showsVerticalScrollIndicator={true}
                ListEmptyComponent={listEmptyComponent}
                data={deviceList}
                // data={[...Array(10).keys()]}
                renderItem={({ item,index }) => {
                    const backgroundColor = item === selectedId ? "#fff" : "#fff";
                    const color = item === selectedId ? '#012554' : 'black';
                    const boldness = item === selectedId ? "bold":"300";
                    return (
                        <TouchableOpacity style={{width:'100%'}} onPress={
                          ()=>{
                            setSelectedId(item);
                            // no direct select and connect
                            //EventRegister.emit('BLECMD',{event:'reqConnect',device:item})
                          }
                          } style={[styles.item,{backgroundColor:backgroundColor,borderLeftWidth:item === selectedId ?5:0,borderLeftColor:color}]}>
                             <Text style={[styles.title,{color:color,paddingLeft:12,fontWeight:boldness}]}>{item.name}</Text>
                        </TouchableOpacity>
                    );
                  }}
                keyExtractor={(item) => String(item.id)}
                extraData={selectedId}
        />
        </View>
        {deviceList.length > 0 ?<Button 
                style={{flexDirection:"row",borderRadius:4,height:47,justifyContent:"center",marginTop:30}}
                color={'#012554'}
                mode={'contained'}
                disabled={selectedId != null ?deviceStatus == "Reading..." || deviceStatus == 'Connected' ?true:false:true}
                uppercase={false}
                labelStyle={{fontSize:18, textTransform: 'capitalize'}} 
                icon={props=><Material 
                    size={25}
                    color={'#fff'}
                    name="keyboard-arrow-right"/>}
                contentStyle={{flexDirection:"row-reverse",paddingTop:1,height:47,width:"90%",alignSelf:"center"}}
                onPress={()=>{
                    if(deviceStatus != 'Connecting' && deviceStatus != 'Ready'){
                        EventRegister.emit('BLECMD',{event:'reqConnect',device:selectedId})
                    }
                    if(deviceStatus == 'Ready'){
                      checkDeviceConnection();
                    }/*else if (deviceStatus == 'Disconnected'){
                      setBleErrorModal(true);
                    }else if (deviceStatus == 'stopScan'){
                      EventRegister.emit('BLECMD', { cmd: 'startScan' });
                      setDeviceList([]);
                    }*/
                }}>
              {deviceStatus == "Reading..." || deviceStatus == 'Connecting' || deviceStatus=='Ready'?deviceStatus:'Connect'}
            </Button>:<Button 
                style={{flexDirection:"row",borderRadius:4,height:47,justifyContent:"center",marginTop:30}}
                color={'#012554'}
                mode={'contained'}
                disabled={deviceStatus == 'Scanning...'}
                uppercase={false}
                labelStyle={{fontSize:18, textTransform: 'capitalize'}} 
                icon={props=><Material 
                    size={25}
                    color={'#fff'}
                    name="keyboard-arrow-right"/>}
                contentStyle={{flexDirection:"row-reverse",paddingTop:1,height:47,width:"90%",alignSelf:"center"}}
                onPress={ async()=> {
                  if(await BluetoothStatus.state()){
                    EventRegister.emit('BLECMD', { cmd: 'startScan' });
                  }else{
                    console.log(" state false ...");
                    setBlueToothON(true);
                  }
                }}>
              {deviceStatus == 'Scanning...'?deviceStatus:'Scan'}
            </Button>}
    </View>
    <LearnHow modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    </ScrollView>
    <Modal
        animationType="slide"
        transparent={true}
        visible={bleErrorModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          // backgroundColor: 'rgba(100,100,100, 0.5)',
          padding: 40,
        }}>
          <View style={[styles.modalView]}>
            {/* <Material name="logout" size={30} color={'red'}/> */}
            <Text style={[styles.modalText,{fontSize:16}]}>Unable to establish bluetooth connection</Text>
            <Text style={[styles.modalText,{fontSize:16,paddingBottom:15}]}>Make sure Scout is charged,powered ON, and in range.</Text>
            <TouchableOpacity onPress={()=>{setModalVisible(true)}} style={{paddingBottom:10}}>
            <Text style={{fontSize:18,color:"#012554", textDecorationLine:"underline",fontWeight:"700"}}>Learn how</Text>
            </TouchableOpacity>
            <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:15, marginBottom:15}}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#012554",paddingRight:25,paddingLeft:25 }}
              onPress={async () => {
                setBleErrorModal(!bleErrorModal);
                if(await BluetoothStatus.state()){
                  EventRegister.emit('BLECMD', { cmd: 'startScan' });
                }
              }}>
              <Text style={styles.textStyle}>Try Again</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
    <Modal
        animationType="slide"
        transparent={true}
        visible={blueToothOFF}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          padding: 40,
        }}>
          <View style={[styles.modalView]}>
            <Text style={[styles.modalText,{fontSize:16}]}>BlueTooth is off.</Text>
            <Text style={[styles.modalText,{fontSize:16,paddingBottom:15}]}>Turn on bluetooth from Smart Phone settings.</Text>
            <TouchableOpacity onPress={()=>{setModalVisible(true)}} style={{paddingBottom:10}}>
            <Text style={{fontSize:18,color:"#012554", textDecorationLine:"underline",fontWeight:"700"}}>Learn how</Text>
            </TouchableOpacity>
            <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:15, marginBottom:15}}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#012554",paddingRight:25,paddingLeft:25 }}
              onPress={async() => {
                setBlueToothON(false);
                if(await BluetoothStatus.state()){
                  EventRegister.emit('BLECMD', { cmd: 'startScan' });
                }
              }}>
              <Text style={styles.textStyle}>Try Again</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
    </>)
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
    },
    item: {
      marginVertical: 12,
      minWidth:300
    },
    title: {
      fontSize: 18,
    },
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
      elevation: 5,
      // alignSelf:"center"
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