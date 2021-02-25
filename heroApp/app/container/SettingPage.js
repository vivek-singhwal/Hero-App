import React,{useEffect,useState} from 'react';
import { View , Text , TextInput as Input,ScrollView} from 'react-native';
import { Button, Switch, ProgressBar, Modal, Portal, Provider, TextInput } from 'react-native-paper';
import {getOperatorData,getDeviceData,getDeviceHWData, setDeviceHWData} from '../services/DataService';
import { updateSprayerName } from '../services/DBService';
import Material from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default SettingPage = ({navigation}) => {
    console.log(">>Data ",getOperatorData(),JSON.stringify(getDeviceHWData()))
    const [deviceData] = useState(getDeviceData());
    const [sprayerInput,setSprayerInput] = useState(getDeviceHWData().sprayerName);
    const [isEditable,setEditable] = useState(false);
    const [isSwitchEleOn, setIsSwitchEleOn] = useState(false);
    const [isSwitchTrgOn, setIsSwitchTrgOn] = useState(false);
    const onToggleEleSwitch = () => setIsSwitchEleOn(!isSwitchEleOn);
    const onToggleTrgSwitch = () => setIsSwitchTrgOn(!isSwitchTrgOn);
    return(<>
     <View style={{backgroundColor:'#fff',height:"100%"}}>
            <View style={{padding:18}}>
                   <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:20,width:"100%"}}>
                    <Text style={{fontSize:20}}>Electrostatic</Text>
                    <Switch value={isSwitchEleOn} onValueChange={onToggleEleSwitch} color={'#012554'}/>
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:20}}>
                    <Text style={{fontSize:20}}>Trigger Lock</Text>
                    <Switch value={isSwitchTrgOn} onValueChange={onToggleTrgSwitch} color={'#012554'}/>
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",paddingBottom:20}}>
                    <Text style={{fontSize:20,}}>Battery</Text>
                    <Text style={{fontSize:18,}}>{isNaN(parseInt(deviceData["getBatteryLevel\r"]))?'0':parseInt(deviceData["getBatteryLevel\r"])} %</Text>
                   </View>
                   <ProgressBar style={{height:10}} progress={parseInt(deviceData["getBatteryLevel\r"])/100} color={'#012554'} />

                   <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:30}}>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>System Info.</Text>
                    {/* <Text style={{fontSize:18,}}>90%</Text> */}
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
                    <Text style={{fontSize:20}}>Operator:</Text>
                    <Text style={{fontSize:18,}}>{getOperatorData().opName}</Text>
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
                    <Text style={{fontSize:20}}>Device:</Text>
                    <Text style={{fontSize:18,}}>{getDeviceHWData().sdName}</Text>
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
                    <Text style={{fontSize:20}}>Sprayer:</Text>
                    {!isEditable ? <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:18,}}>{getDeviceHWData().sprayerName}</Text> 
                    <MaterialIcons 
                       onPress={()=>{setEditable(true)}}
                            size={25}
                            color={'#012554'}
                            name="edit"/>
                    </View>:<View style={{flexDirection:"row"}}>
                    <Input style={{width:100,borderColor:"black",borderBottomWidth:1,padding:0}}
                    defaultValue={sprayerInput}
                     onChangeText={text => setSprayerInput(text)}
                    />
                    
                    <Material 
                            onPress={()=>{
                                if(sprayerInput != ""){
                                    let sprayerObj = getDeviceHWData();
                                    sprayerObj.sprayerName = sprayerInput;
                                    setDeviceHWData(sprayerObj);
                                    updateSprayerName(sprayerObj.hardwareId,sprayerInput).then(()=>{
                                        console.log(">Success")
                                    })
                                    console.log(">>sprayerInput ",sprayerInput,getDeviceHWData())
                                }
                                setEditable(false);
                            }}
                            size={25}
                            color={'#012554'}
                            name="ios-checkmark"/>
                    </View>}
                    
                    {/* <Text style={{fontSize:18,}}>{getDeviceHWData().sprayerName}</Text> */}
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
                    <Text style={{fontSize:20}}>Area Sprayed:</Text>
                    <Text style={{fontSize:18,}}>22,431 sq ft</Text>
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
                    <Text style={{fontSize:20}}>Time Sprayed:</Text>
                    {/* <Text style={{fontSize:18,}}>90%</Text> */}
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10,marginBottom:35}}>
                    <Text style={{fontSize:20}}>Session Start:</Text>
                    {/* <Text style={{fontSize:18,}}>90%</Text> */}
                   </View>
                   <Button 
                        color={'#012554'}
                        // mode={'outlined'}
                        uppercase={false}
                        //   disabled={deviceStatus === "Ready"?false:true}
                        labelStyle={{fontSize:18}} 
                        icon={props=><Material 
                            size={25}
                            color={'#012554'}
                            name="exit-outline"/>}
                        contentStyle={{ borderColor:'#012554',borderWidth:1,borderRadius:4,flexDirection:"row-reverse",paddingTop:1,height:47,width:"75%",alignSelf:"center"}}
                        onPress={()=>{
                            console.log(">>finish")
                            navigation.navigate('HomePage',{isRinseModal:true});
                        }}
                        >
               {'Finish Spraying'}
             </Button>
                </View>
              
          </View>
    </>)
}