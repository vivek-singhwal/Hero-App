import React,{useEffect,useState} from 'react';
import { View, TextInput as Input,ScrollView, Alert } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import { getOperators, initDB , addOperator,delOperator} from '../services/DBService';
import { EventRegister } from 'react-native-event-listeners';
import {setDefaultValue,getReadOk} from '../services/BleService';

export default OperatorProfile= ({navigation}) =>{
    const [count,setCount] = useState(true);
    const [deviceStatus, setDeviceStatus] = useState('');
    const [isDeviceConnected, setisDeviceConnected] = useState(false);
    const [textFocusedName,setTextFocusedName] = useState(false);
    const [textFocusedChem,setTextFocusedChem] = useState(false);

    const [opName,setOpName] = useState('');
    const [opCompany,setOpCompany] = useState('company');
    const [opChem,setOpChem] = useState('');

    useEffect(()=>{
        if(count){
          initDB('operatorsTable').then((res)=>{
            // console.log(">>Res ",res);
            
          });
        setCount(false);
        }
        
        // var listener = EventRegister.addEventListener('BLE_STATUS', (data) => {
        //   // console.log(">>data ",data,getReadOk());
        //     if(data.event == "Data_Recieved"){
        //       console.log(data.value);
        //     }
        //     if(data.event == "connected"){
        //       setisDeviceConnected(true);
        //       setDeviceStatus("Connected");
        //     }else if(data.event == "reading"){
        //       setDeviceStatus("Reading...");
        //     }else if(data.event == "readOK"){
        //       setDeviceStatus("Ready.");
        //     }else if(data.event == "scanning"){
        //       setDeviceStatus("Scanning...");
        //       setTimeout(()=>{
        //         if(deviceStatus == "Scanning..."){
        //           setDeviceStatus("");
        //         }
        //       },10000)
        //     }else if(data.event == "disconnected"){
        //       setDefaultValue();
        //       setisDeviceConnected(false);
        //       // navigation.navigate('Home');
        //       setDeviceStatus("Disconnected");
        //       setTimeout(()=>{
        //         setDeviceStatus("");
        //       },500)
        //     }
        //   });
        //   return ()=>{
        //     EventRegister.removeEventListener(listener);
        //   }  
    })

    var addRecord = ()=>{
        var opObj = {
            name:'abc',
            company:'xyz',
            chemistry:'ADD',
            serverId:'0'
        }
        // addOperator(opObj).then((data)=>{
        //     console.log(">Data ",data);
        // })
        // getOperators().then((result)=>{
        //     console.log(">result ",result);
        // })
        // delOperator(0).then((result)=>{
        //     console.log(">result ",result);
        // })
        
        // scanAndConenct();
        
        if(!getReadOk()){
          navigation.navigate('FirstConnection');
        }else{
          Alert.alert("Hero App","Device is not ready. " )
        }
    }
    var scanAndConenct = () => {
        console.log("scanAndConenct "+isDeviceConnected);
        if(!isDeviceConnected){
          EventRegister.emit('BLECMD', { cmd: 'startScan' });
        }else{
          EventRegister.emit('BLECMD', { cmd: 'disconnect' });
        }
      };
    
    return(<>
    <View style={{marginTop:"15%"}}>
    <ScrollView>
      <View style={{flexDirection:"column",justifyContent:"center"}}>
        <Avatar.Icon 
        size={155} 
        style={{backgroundColor:'#DFE6ED',marginBottom:50,alignSelf:"center"}}
        icon={props=><AwesomeIcon5 
                    size={45}
                    color={'#9EADBA'}
                    name="user-alt"/>} />
        <View style={{marginBottom:20,alignSelf:"center"}}>
        
        <View style={{ marginBottom:40,borderColor:textFocusedName?'#012554':'gray',borderWidth:1.8,height:40,borderRadius:5,width:250,alignSelf:"center"}}>
               <Input onFocus={()=> setTextFocusedName(true)}
                        onBlur={()=> setTextFocusedName(false)}
                        placeholder={'Name'}
                        style={{padding:10,marginTop:1,fontSize:20}}
                        value={opName}
                        onChangeText={text => setOpName(text)}
                    />
            </View>
            <View style={{marginBottom:40,borderColor:'#012554',borderWidth:1.8,borderRadius:5,width:250,alignSelf:"center",flexDirection:"row"}}>
            
            <Picker
                selectedValue={opCompany}
                mode={'dialog'}
                itemStyle={{height:41,width:200,textAlign:"left",marginLeft:15,fontSize:18,color:"black"}}
                style={{fontSize:16}}
                onValueChange={(itemValue, itemIndex) =>setOpCompany(itemValue)
                }>
                <Picker.Item label="Company" value="company" />
                <Picker.Item label="Lighthouse" value="lighthouse" />
                </Picker>
                <Entypo size={20} name="select-arrows" style={{alignSelf:"center"}}/>
            </View>
            <View style={{marginBottom:40, borderColor:textFocusedChem?'#012554':'gray',borderWidth:1.8,height:40,borderRadius:5,width:250,alignSelf:"center"}}>
               <Input onFocus={()=> setTextFocusedChem(true)}
                        onBlur={()=> setTextFocusedChem(false)}
                        placeholder={'Chemistry'}
                        style={{padding:10,marginTop:1,fontSize:20}}
                        value={opChem}
                        onChangeText={text => setOpChem(text)}/>
            </View>
            <Button 
              color={'#012554'}
              mode={'contained'}
            //   disabled={opChem && opCompany && opName && opName !== "" && opChem !== "" && opCompany !== "company"?false:true}
              labelStyle={{fontSize:16}} 
              icon={props=><Material 
                size={35}
                color={'#fff'}
                name="keyboard-arrow-right"/>}
              contentStyle={{flexDirection:"row-reverse",paddingTop:1,height:47}}
              onPress={addRecord}
              >
               Connect
             </Button>
        </View>
      </View>
      </ScrollView>
    </View>
    </>)
}