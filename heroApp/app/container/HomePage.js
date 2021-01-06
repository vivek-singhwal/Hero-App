import React,{useEffect,useState} from 'react';
import { View , StyleSheet, Text, TouchableOpacity, TextInput as Input,ScrollView,FlatList} from 'react-native';
import { Button, Switch, ProgressBar, Modal, Portal, Provider, TextInput } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Ionicons';
import {getOperator} from '../services/apiService';
import {getReadingStatus,setReadingStatus, sessionList, sessionDataList , getDeviceHWData} from '../services/DataService';
import SaveModal from './SaveModal';
import { EventRegister } from 'react-native-event-listeners';

export default  HomePage = ({navigation})=>{

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [readingStatus,setReadStatus] = useState(getReadingStatus);
    const [isSwitchEleOn, setIsSwitchEleOn] = useState(false);
    const [isSwitchTrgOn, setIsSwitchTrgOn] = useState(false);
    const onToggleEleSwitch = () => setIsSwitchEleOn(!isSwitchEleOn);
    const onToggleTrgSwitch = () => setIsSwitchTrgOn(!isSwitchTrgOn);
    const toggleSetReading = () => setReadStatus(preState=>!preState);
    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
    var interval ;
    useEffect(()=>{
     console.log(">>DeviceHWData ",getDeviceHWData())
      let listner = EventRegister.addEventListener('BLE_DATA', (value) => {
         console.log(">>BLE_STATUS ",value,readingStatus);
         if(value.event == 'completed' && readingStatus){
          EventRegister.emit('BLECMD', { event: "homepageEvent" , cmd:'getSerial\r'})
         }
          
        });

         getOperator().then((res)=>{
        console.log(">Res ",res);
      })
      return ()=>{
        clearInterval(interval);
        EventRegister.removeEventListener(listner);
    }  
    })
    var startReading=()=>{
      if(!readingStatus){
        console.log(">>inside if ",sessionDataList);
        EventRegister.emit('BLECMD', { event: "homepageEvent" , cmd:'getSerial\r'})
        // interval = setInterval(()=>{
          
        // },1000)
      }else{

      }
      console.log(">>readDeviceData ",sessionDataList,readingStatus);
    }
    return(<>
    <View style={{height:"100%"}}>
      <View style={{flex:1,flexDirection:"column",height:"100%",backgroundColor:"#fff"}}>
          <View>
          {sessionList.length > 0 ? 
           <FlatList
           data={sessionList}
           renderItem={({item,index})=>
            <View key={index} style={{height:100,backgroundColor:'#012554',width:"100%",borderBottomColor:'#fff',borderBottomWidth:1,padding:15}}>
              <Text style={{color:'#fff',fontSize:20,marginStart:15,paddingBottom:4}}>{item.sessionName}</Text>
                <View style={{justifyContent:"space-around",flexDirection:'row'}}>
                  <View>
                  <Text style={{color:'#fff'}}>Start time</Text>
                  <Text style={{color:'#fff'}}>{formatAMPM(item.startTime)}</Text>
                  </View>
                  <View>
                  <Text style={{color:'#fff'}}>Time elapsed</Text>
                  <Text style={{color:'#fff'}}>{formatAMPM(item.elapseTime)}</Text>
                  </View>
                  <View>
                    <Text style={{color:'#fff'}}>Oz sprayed</Text>
                    <Text style={{color:'#fff'}}>{item.ozSparayed} Oz</Text>
                  </View>
                </View>
             </View>
            }
           keyExtractor={item => item.name}
         />
         :
               readingStatus ? <View style={{padding:18}}>
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
                <Text style={{fontSize:18,}}>90%</Text>
               </View>
               <ProgressBar style={{height:10}} progress={0.8} color={'#012554'} />
            </View>: <View style={{backgroundColor:"#012554",padding:35}}>
            <Text style={{color:"#fff",alignSelf:"center",fontSize:18,paddingBottom:5}}>Your spray history will show up here.</Text>
            <Text style={{color:"#fff",alignSelf:"center",fontSize:18}}>Begin a new route to ge started.</Text>
          </View>
          }
           
          </View>

          <View style={{backgroundColor:"#fff",width:"100%",flexDirection:"row",justifyContent:"space-around",position:"absolute",bottom:0}}>
            <View style={{marginTop:"10%",width:"33%"}}>
              <Button
              icon={props=><Feather size={35} name="settings-sharp" onPress={()=>{navigation.navigate('SettingPage')}}
              />}/>
            </View>
          <View style={{bottom:70,}}>
            {readingStatus ?<Button 
            icon={props=><AwesomeIcon name={'stop-circle'} 
              size={115}
              color={'#012554'}
              style={{paddingTop:10,}}/>} 
              onPress={() => {
                console.log(">>end ");
                setReadStatus(false);
                // toggleSetReading();
              
            }}/>:<Button 
            icon={props=><AwesomeIcon name={"play-circle"} 
              size={115}
              color={'#012554'}
              style={{paddingTop:10,}}/>} 
              onPress={() => {
                console.log(">>start ");
                startReading();
                setReadStatus(true);
              // if(readingStatus){
              //   showModal();
              //  }
              //  readDeviceData();
              
            }}/> }
            
          </View>
          <View style={{marginTop:"10%",width:"30%"}}>
            {readingStatus? <View/>:
            <Button
              icon={props=><AwesomeIcon5 
                              size={35}
                              color={'#2C88D9'}
                              name="recycle"/>}/>}
            </View>
        </View>
      </View>
  </View>
  <SaveModal visible={visible} hideModal={hideModal} SetReadingStatus={(isBack)=>{setReadStatus(isBack)}} />
    </>)
}