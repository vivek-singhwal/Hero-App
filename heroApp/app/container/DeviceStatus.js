import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,Image} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { EventRegister } from 'react-native-event-listeners';
import BleService from '../services/BleService';

export default function DeviceStatus({navigation}){

  const [readData, setDeviceStatus] = useState(BleService.getData());
  //const [isDeviceConnected, setisDeviceConnected] = useState(false);

  useEffect(()=>{

  return ()=>{
  }
  });

  return ( 
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:22,textAlign:'center',color: '#DFECF5'}}>
                      Serial No :</Text>
            <View style={{margin:'3%'}}></View>
                  <Text style={{fontSize:22,textAlign:'center',color: '#DFECF5'}}>{readData.model} </Text>
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
    backgroundColor: '#fff',
    color:'white',
  },
  buttonContainer: {
    width: '100%',
    height:'100%',
    alignSelf:"center",
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#0D294E',
  }
});



