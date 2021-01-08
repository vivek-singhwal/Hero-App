import React,{useEffect,useState} from 'react';
import { View , StyleSheet, Text, TouchableOpacity, TextInput as Input,ScrollView,FlatList,TouchableHighlight} from 'react-native';
import { Button, Switch, ProgressBar, Modal, Portal, Provider, TextInput } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Ionicons';
import {getOperator} from '../services/apiService';
import {getReadingStatus,setReadingStatus, sessionDataList,getOperatorData , getDeviceHWData,setSessionDataList,currentSessionData} from '../services/DataService';
import SaveModal from './SaveModal';
import { EventRegister } from 'react-native-event-listeners';
import {initDB, addSession, getSessions} from '../services/DBService';
let setStartTime ,setEndTime;
export default  HomePage = ({navigation})=>{

    const [counter,setCounter] = useState(true);
    const [visible, setVisible] = useState(false);
    const [locationText, setLocationText] = useState('');
    const [commentText, setCommentText] = useState('');
    const [sessionList,setSessionList] = useState(sessionDataList);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [readingStatus,setReadStatus] = useState(getReadingStatus);
    const [isSwitchEleOn, setIsSwitchEleOn] = useState(false);
    const [isSwitchTrgOn, setIsSwitchTrgOn] = useState(false);
    const onToggleEleSwitch = () => setIsSwitchEleOn(!isSwitchEleOn);
    const onToggleTrgSwitch = () => setIsSwitchTrgOn(!isSwitchTrgOn);
    const toggleSetReading = () => setReadStatus(preState=>!preState);

    function formatAMPM(date) {
      var hours = new Date(date).getHours();
      var minutes = new Date(date).getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
    var interval ;
    useEffect(()=>{
      if(counter){
        initDB('sessions').then((res)=>{
         
          getSessions(getOperatorData().serverId).then((resSessions)=>{
            console.log(">>Res ",getOperatorData().serverId,resSessions,);
            var listSession = resSessions;
            if(resSessions){
              for(let i=0;i<listSession.length;i++){
                if(listSession[i].sessionData !=undefined && listSession[i].sessionData != null){
                  listSession[i]['sessionData'] = JSON.parse(listSession[i]['sessionData']);
                }
              }
              setSessionList(listSession);
              console.log(">>listSession ",listSession)
              // 
            }
            // setSessionList(listSession);
          })
        });
        
        setCounter(false);
      }
      let listner = EventRegister.addEventListener('BLE_DATA', (value) => {
         console.log(">>BLE_STATUS ",value,readingStatus);
         if(value.event == 'completed' && readingStatus){
          
          EventRegister.emit('BLECMD', { event: "homepageEvent" , cmd:'getSerial\r'})
         }
         if(value.event == 'error'){
          EventRegister.emit('BLE_STATUS', { event: "disconnected" })
         }
        });

      return ()=>{
        clearInterval(interval);
        EventRegister.removeEventListener(listner);
    }  
    })
    
    var stopReading=()=>{
      setReadStatus(false);
      showModal();
    }

    var addSessionList = (comment,location)=>{
     
      // sessionDataList.push({location:'abc',comment:'',serverId:'0',startTime:this.sessionStartTime,endTime:Date.now()});
      var sessionListAr = [...sessionList];
      var sessionObj = {
          // serverId:0,
          operatorId: getOperatorData().serverId,
          sprayerId: getDeviceHWData().hardwareId,
          chemistryType: getOperatorData().opChem,
          startTime: setStartTime,
          ozSparayed:parseInt(currentSessionData.getPumpedVolume)/29.57,
          endTime: setEndTime,
          sessionLocation: locationText,
          sessionComment: commentText,
          sessionData: JSON.stringify(currentSessionData)
      } 
      addSession(sessionObj).then((res)=>{
        console.log(">Added ",res);
      })
      console.log(">>sessionObj ",JSON.stringify(sessionObj))
      sessionListAr.push({location:locationText,startTime:setStartTime,elapseTime:Math.ceil(Math.abs(new Date(setStartTime).getTime()-new Date(setEndTime).getTime()) / 1000),ozSparayed:parseInt(currentSessionData.getPumpedVolume)/29.57})
      setSessionList(sessionListAr);
      setCommentText('');
      setLocationText('');
      // console.log("ADd request",commentText,locationText,currentSessionData,setStartTime,setEndTime,Math.ceil(Math.abs(new Date(setStartTime).getTime()-new Date(setEndTime).getTime()) / 1000));
      
    }
    var startReading=()=>{
      
        // console.log(">>inside if ",sessionDataList);
      //  interval = setInterval(()=>{
      //     setCounter(counter=>counter+1)
      //   },2000)
        // if(counter > 0){
          EventRegister.emit('BLECMD', { event: "homepageEvent" , cmd:'getSerial\r'})
        // }
      
    }

    function convertTime(sec) {
      var hours = Math.floor(sec/3600);
      (hours >= 1) ? sec = sec - (hours*3600) : hours = '00';
      var min = Math.floor(sec/60);
      (min >= 1) ? sec = sec - (min*60) : min = '00';
      (sec < 1) ? sec='00' : void 0;
      (min.toString().length == 1) ? min = '0'+min : void 0;    
      (sec.toString().length == 1) ? sec = '0'+sec : void 0;    
      return hours+':'+min+':'+sec;
  }

    
    var emptyList=()=>{
      return( <View style={{backgroundColor:"#012554",padding:35}}>
      <Text style={{color:"#fff",alignSelf:"center",fontSize:18,paddingBottom:5}}>Your spray history will show up here.</Text>
      <Text style={{color:"#fff",alignSelf:"center",fontSize:18}}>Begin a new route to ge started.</Text>
    </View>);
    }
    return(<>
    <View style={{height:"100%"}}>
      <View style={{flex:1,flexDirection:"column",height:"90%",backgroundColor:"#fff"}}>
          <View style={{height:"80%"}}>
          {readingStatus ? <View style={{padding:18}}>
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
            </View>:  
          <FlatList
           data={sessionList}
           ListEmptyComponent={emptyList}
           keyExtractor={(item, index) => String(index)}
           renderItem={({item,index})=>
            <View key={index} style={{height:100,backgroundColor:'#012554',width:"100%",borderBottomColor:'#fff',borderBottomWidth:1,padding:15}}>
              <Text style={{color:'#fff',fontSize:23,fontWeight:"bold",textTransform:'capitalize',marginStart:15,paddingBottom:4}}>{item.location}</Text>
                <View style={{justifyContent:"space-around",flexDirection:'row'}}>
                  <View>
                  <Text style={{color:'#fff'}}>Start time</Text>
                  <Text style={{color:'#fff'}}>{formatAMPM(item.startTime)}</Text>
                  </View>
                  <View>
                  <Text style={{color:'#fff'}}>Time elapsed</Text>
                  <Text style={{color:'#fff'}}>{convertTime(Math.ceil(Math.abs(new Date(item.startTime).getTime()-new Date(item.endTime).getTime()) / 1000))}</Text>
                  </View>
                  <View>
                    <Text style={{color:'#fff'}}>Oz sprayed</Text>
                    <Text style={{color:'#fff'}}>{parseFloat(item.ozSparayed).toFixed(2)} Oz</Text>
                  </View>
                </View>
             </View>
            }
         />
         }
          </View>
          <View style={{backgroundColor:"#C8C8C8", width:"100%",flexDirection:"row",justifyContent:"space-around",position:"absolute",bottom:0}}>
            <View style={{marginTop:"10%",width:"33%"}}>
              <Button
              icon={props=><Feather size={35} name="settings-sharp" onPress={()=>{navigation.navigate('SettingPage')}}
              />}/>
            </View>
          <View style={{bottom:70,}}>
            {readingStatus ?
            <TouchableHighlight 
            style={[styles.circle,{justifyContent:"center",marginTop:19}]}
            onPress={() => {
                  setEndTime = Date.now()
                  console.log(">>end ",setEndTime);
                  stopReading();
              }}
            >
              <AwesomeIcon name={"stop"} 
              size={45}
              color={'#D8D8D8'}
              style={{alignSelf:"center",paddingLeft:"2%"}}/>
             
            </TouchableHighlight>
           :
            <TouchableHighlight 
            style={[styles.circle,{justifyContent:"center",marginTop:19}]}
            onPress={() => {
              setStartTime = Date.now()
              console.log(">>start ",setStartTime);
              startReading();
              setReadStatus(true);
            if(readingStatus){
              showModal();
             }}}>
              <AwesomeIcon name={"play"} 
              size={50}
              color={'#D8D8D8'}
              style={{alignSelf:"center",paddingLeft:"7%"}}/>
            </TouchableHighlight>
           }
            
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
  <SaveModal addSessionList={addSessionList} setLocationText={setLocationText} locationText={locationText} commentText={commentText} setCommentText={setCommentText} visible={visible} hideModal={hideModal} SetReadingStatus={(isBack)=>{setReadStatus(isBack)}} />
    </>)
}

const styles =StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "#012554",
  },
});