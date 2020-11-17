import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,Image} from 'react-native';
import {bleResults } from '../services/BleService';

export default function DeviceStatus({navigation}){
//const [isDeviceConnected, setisDeviceConnected] = useState(false);

  useEffect(()=>{
  return ()=>{
  }
  });
/**   
 *  'getSerial\r' ,
    'getModel\r',
    'getPumpTime\r' ,
    'getPumpedVolume\r' ,
    'getUnitName\r' ,
    'getHWVersion\r' ,
    'setUnitName\r' ,
    //'getTriggerLatchState\r' ,
    'getTriggerLatchMode\r' ,
    'resetPump\r' ,
    'getESVState\r' ,
    'getFlowRate\r' ,
    'getFirmware\r' ,
    'updateFirmware\r' ,
    //'sprayDisable\r',
    //'sprayEnable\r',
    'getPumpState\r',
    //'getHVState\r',
    //'getError\r',
    //'getFlow\r',
    //'getESV\r',
    'getBatteryLevel\r',
 */
  var displayList =[
    {name:"getUnitName\r", title:"Unit Name"},
    {name:"getSerial\r", title:"Serial No"},
    {name:"getModel\r", title:"Model No"},
    {name:"getBatteryLevel\r", title:"Battery"},
    {name:"getFlowRate\r", title:"Flow Rate"},
    {name:"getFirmware\r", title:"Firmware"},
    {name:"updateFirmware\r", title:"Firmware Update"},
    {name:"getPumpState\r", title:"Pump State"},
    {name:"getPumpTime\r", title:"Total Time"},
    {name:"getPumpedVolume\r", title:"Total Volume"},
    {name:"getHWVersion\r", title:"HW Version"},
    {name:"getTriggerLatchMode\r", title:"Latch Mode"},
    {name:"resetPump\r", title:"Reset Pump"},
    {name:"getESVState\r", title:"ESV State"},
  ];
  return ( 
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            { displayList.map((item)=>(
               <View key= {item.name} style={{marginLeft:'15%', flexDirection:'row'}}>
               <Text style={{fontSize:16,textAlign:'left',color: '#DFECF5'}}>
               {item.title} :</Text>
              <View style={{margin:'1%'}}></View>
                    <Text style={{fontSize:16,textAlign:'center',color: '#DFECF5'}}>{bleResults[item.name].replace('.','\r')} </Text>
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



