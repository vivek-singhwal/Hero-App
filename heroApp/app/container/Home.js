import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, Button, View, ActivityIndicator, TouchableOpacity ,Image,TouchableHighlight} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

export default function Home({navigation}){
  const [deviceStatus, setDeviceStatus] = useState('');
  const [isDeviceConnected, setisDeviceConnected] = useState(false);

  useEffect(()=>{
      var listener = EventRegister.addEventListener('BLE_STATUS', (data) => {
      if(data.event == "Data_Recieved"){
        console.log(data.value);
      }
      if(data.event == "connected"){
        setisDeviceConnected(true);
        setDeviceStatus("Connected");
      }
      if(data.event == "scanning"){
        setDeviceStatus("Scanning...");
      }
      if(data.event == "disconnected"){
        setisDeviceConnected(false);
        setDeviceStatus("Disconnected");
        setTimeout(()=>{
          setDeviceStatus("");
        },500)
      }
    });

    return ()=>{
      EventRegister.removeEventListener(listener);
    }
  })

  var scanAndConenct = () => {
    console.log("scanAndConenct"+isDeviceConnected);
    if(!isDeviceConnected){
      EventRegister.emit('SCAN', { cmd: 'startScan' });
    }else{
      EventRegister.emit('SCAN', { cmd: 'disconnect' });
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
                  Connect
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStyles}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Settings')} >
                <Text style={styles.buttonText}>
                  Settings
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStyles}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('DeviceStatus')} >
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