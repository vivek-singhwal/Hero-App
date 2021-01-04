import React,{useEffect,useState} from 'react';
import { View , StyleSheet, Text, TextInput as Input,Image} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Button, ActivityIndicator } from 'react-native-paper';
// import { getOperators, initDB , addOperator,delOperator} from '../services/DBService';
import { EventRegister } from 'react-native-event-listeners';
import {setDefaultValue,getReadOk} from '../services/BleService';
export default FirstTimeConnection = () => {
    const [count,setCount] = useState(true);
    const [deviceStatus, setDeviceStatus] = useState('');
    const [isDeviceConnected, setisDeviceConnected] = useState(false);
    var scanAndConenct = () => {
        console.log("scanAndConenct "+isDeviceConnected);
        if(!isDeviceConnected){
          EventRegister.emit('BLECMD', { cmd: 'startScan' });
        }else{
          EventRegister.emit('BLECMD', { cmd: 'disconnect' });
        }
      };
    useEffect(()=>{
        if(count){
        //   initDB('operatorsTable').then((res)=>{
        //     // console.log(">>Res ",res);
            
        //   });
        setCount(false);
        scanAndConenct();
      }
        var listener = EventRegister.addEventListener('BLE_STATUS', (data) => {
          console.log(">>BLE_STATUS ",data);
            if(data.event == "Data_Recieved"){
              console.log(data.value);
            }
            if(data.event == "connected"){
              setisDeviceConnected(true);
              setDeviceStatus("Connected");
            }else if(data.event == "reading"){
              setDeviceStatus("Reading...");
            }else if(data.event == "readOK"){
              setDeviceStatus("Ready");
            }else if(data.event == "scanning"){
              setDeviceStatus("Scanning...");
              setTimeout(()=>{
                if(deviceStatus == "Scanning..."){
                  setDeviceStatus("Scanning");
                }
              },10000)
            }else if(data.event == "disconnected"){
              setDefaultValue();
              setisDeviceConnected(false);
              // navigation.navigate('Home');
              setDeviceStatus("Disconnected");
              setTimeout(()=>{
                setDeviceStatus("Disconnected");
              },500)
            }
          });
          return ()=>{
            EventRegister.removeEventListener(listener);
        }  
    })


return(

 <View style={{justifyContent:"center",height:"100%"}}>
    <View style={{alignItems: 'center',justifyContent:"center"}}>
        <Text style={styles.textStyle}>
            First, you'll need to power on Your
        </Text>
        <Text style={styles.textStyle}>
            sprayer and connect your device.
        </Text>
        <View style={{marginBottom:30}}/>
        <Text style={styles.textStyle}>
            Press and hold the bluetooth button on
        </Text>    
        <Text style={styles.textStyle}>
            your sprayer for two seconds until it
        </Text>    
        <Text style={styles.textStyle}>
            press blue.
        </Text>    
        <View style={{marginBottom:30}}/>
        <Text style={styles.textStyle}>
            Then, go into your device's bluetooth 
        </Text>
        <Text style={styles.textStyle}>
            settings and select the sprayer you 
        </Text>
        <Text style={styles.textStyle}>
            want to connect with.
        </Text>
            {deviceStatus === "Connected" ||  deviceStatus === "Ready" && <MaterialCom size={150} color={'green'} style={{height:200,marginTop:20,marginBottom:40,}} name="check-bold"/>}
           {deviceStatus === "" && deviceStatus !== "Connected" ||  deviceStatus !== "Ready" && <Image style={{height:250,width:"94%",marginTop:20,marginBottom:40,}} source={require('../asset/bluetooth-guide.jpg')}/>}
          {/* <MaterialCom size={150} color={'green'} style={{height:200,marginTop:20,marginBottom:40,}} name="check-bold"/> */}
        {deviceStatus === "Ready" ? 
         <Button 
              color={'#012554'}
              mode={'contained'}
              uppercase={false}
            //   disabled={deviceStatus === "Ready"?false:true}
              labelStyle={{fontSize:16}} 
              icon={props=><Material 
                size={35}
                color={'#fff'}
                name="keyboard-arrow-right"/>}
              contentStyle={{flexDirection:"row-reverse",paddingTop:1,height:47,width:"90%",alignSelf:"center"}}
            //   onPress={addRecord}
              >
               {'Begin Session'}
             </Button>:
             <View style={{flexDirection:"row",backgroundColor:'#012554',borderRadius:4,opacity:0.5,height:47,width:200,justifyContent:"center"}}>
                <ActivityIndicator animating={true} color={'#fff'} style={{marginRight:8}}/>
                 <Text style={{color:'#fff',alignSelf:"center",fontSize:16}}>{deviceStatus}</Text>
         </View>} 

    </View>
    </View>)
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize:15
    }
})