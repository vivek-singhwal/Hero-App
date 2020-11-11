import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,Image} from 'react-native';
import {bleResults } from '../services/BleService';

export default function DeviceStatus({navigation}){
//const [isDeviceConnected, setisDeviceConnected] = useState(false);

  useEffect(()=>{
  return ()=>{
  }
  });

  var displayList =[
    {name:"getSerial", title:"Serial No"},
    {name:"getModel", title:"Model No"},
    {name:"getTotalTime", title:"Total Time"},
    {name:"getTotalVolume", title:"Total Volume"},
    {name:"getFirmware", title:"Firmware"},
    {name:"getPumpState", title:"Pump State"},
    {name:"getHVState", title:"HV"},
    {name:"getFlow", title:"Flow"},
    {name:"getESV", title:"ESV"},
    {name:"getBatteryLevel", title:"Battery"},
    {name:"getError", title:"Error"},
  ];
  return ( 
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            { displayList.map((item)=>(
               <View key= {item.name} style={{marginLeft:'15%', flexDirection:'row'}}>
               <Text style={{fontSize:16,textAlign:'left',color: '#DFECF5'}}>
               {item.title} :</Text>
              <View style={{margin:'3%'}}></View>
                    <Text style={{fontSize:16,textAlign:'center',color: '#DFECF5'}}>{bleResults[item.name]} </Text>
              </View>
            ))}
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
    paddingTop:"10%",
    //justifyContent: 'center',
    color: 'white',
    backgroundColor: '#0D294E',
  }
});



