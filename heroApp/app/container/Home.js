import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, Button, View, ActivityIndicator, TouchableOpacity ,Image,TouchableHighlight, Alert} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import {setDefaultValue,getReadOk} from '../services/BleService';

export default function Home({navigation}){
  const [deviceStatus, setDeviceStatus] = useState('');
  const [isDeviceConnected, setisDeviceConnected] = useState(false);

  useEffect(()=>{
      var listener = EventRegister.addEventListener('BLE_STATUS', (data) => {
      if(data.event == "Data_Recieved"){
        console.log("Data_Recieved"+data.value);
      }
      if(data.event == "connected"){
        setisDeviceConnected(true);
        setDeviceStatus("Connected");
      }else if(data.event == "reading"){
        setDeviceStatus("Reading...");
      }else if(data.event == "readOK"){
        setDeviceStatus("Ready.");
      }else if(data.event == "scanning"){
        setDeviceStatus("Scanning...");
        setTimeout(()=>{
          if(deviceStatus == "Scanning..."){
            setDeviceStatus("");
          }
        },5000)
      }else if(data.event == "disconnected"){
        setDefaultValue();
        setisDeviceConnected(false);
        navigation.navigate('Home');
        setDeviceStatus("Disconnected");
        setTimeout(()=>{
          setDeviceStatus("");
        },500)
      }
    });

    return ()=>{
      EventRegister.removeEventListener(listener);
    }
  });

  var scanAndConenct = () => {
    console.log("scanAndConenct"+isDeviceConnected);
    if(!isDeviceConnected){
      EventRegister.emit('BLECMD', { cmd: 'startScan' });
    }else{
      EventRegister.emit('BLECMD', { cmd: 'disconnect' });
    }
  };

  return ( 
    <View style={styles.container}>
      <View>
        <Text style={styles.buttonText}>
              {deviceStatus}
        </Text>
      </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyles}>
            <TouchableOpacity 
              onPress={() => {
                scanAndConenct();
              }} >
                <Text style={styles.buttonText}>
                  {!isDeviceConnected?"Connect":"Disconnect"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStyles}>
            <TouchableOpacity 
              onPress={() => {
                if(getReadOk()){
                  navigation.navigate('Settings')
                }else{
                  Alert.alert("Hero App","Device is not ready. " )
                }
                }} >
                <Text style={styles.buttonText}>
                  Settings
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStyles}>
            <TouchableOpacity 
              onPress={() => {
                if(getReadOk()){
                  navigation.navigate('DeviceStatus')
                }else{
                  Alert.alert("Hero App","Device data is not ready" )
                }
                }} >
                <Text style={styles.buttonText}>
                  Device Status
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#0D294E',
    // color:'white',
  },buttonStyles:{
    backgroundColor:'#0071ba',alignSelf:'center',padding:'5%',width:'70%', borderRadius: 10,marginBottom:'5%',color:'white'
  },
  buttonContainer: {
    width: '100%',
    height:'100%',
    alignSelf:"center",
    justifyContent: 'center',
    backgroundColor: '#0D294E',
  },buttonText: {
    textAlign: 'center',
    // justifyContent: 'center',
    fontSize: 25,
    color: '#DFECF5',
  }
});