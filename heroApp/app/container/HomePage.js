import React,{useEffect,useState,useContext} from 'react';
import { View , StyleSheet, Text, BackHandler, TextInput as Input,Image,FlatList,TouchableHighlight, ScrollView} from 'react-native';
import { Button } from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Ionicons';
import {getReadingStatus, setReadingStatus,setSessionId, sessionDataList,getOperatorData , getDeviceHWData,
         currentSessionData, setLocalSessionId, getLocalSessionId} from '../services/DataService';
import SaveModal from './SaveModal';
import { EventRegister } from 'react-native-event-listeners';
import { initDB, addSession, getSessions, updateSessions, getSessionWithParam ,getDashboardSessions } from '../services/DBService';
import { enableInterval, disableInterval } from '../services/BleService';
import KeepAwake from 'react-native-keep-awake';
import AppContext from "../AppContext";
import SubSession from './SubSession';

let setStartTime ,setEndTime;

export default HomePage = ({navigation})=>{

    let currentRoute = useRoute().name;
    const [counter,setCounter] = useState(true);
    const [visible, setVisible] = useState(false);
    const [locationText, setLocationText] = useState('');
    const [locationImg, setLocationImg] = useState('');
    const [commentText, setCommentText] = useState('');
    const [imageList, setImageList] = useState([]);
    // const [imageList, setImageList] = useState(Array.from(Array(12).keys()));
    // const [s3UploadedImages, setS3UploadedImages] = useState([]);

    const [sessionList,setSessionList] = useState(sessionDataList);
    const hideModal = () => setVisible(false);
    const [readingStatus,setReadStatus] = useState(getReadingStatus());
    const appContext = useContext(AppContext);
    
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
    function handleBackButtonClick() {
     BackHandler.exitApp();
    }
   
    var getSessionDBList = ()=>{
      getSessions().then((resSessions)=>{
        // console.log(">>Res ",resSessions);
        var listSession = resSessions;
        if(resSessions){
          for(let i=0;i<listSession.length;i++){
            // console.log(">>resSessions ",resSessions);
            if(listSession[i].sessionData != undefined && listSession[i].sessionData != null){
              listSession[i]['sessionData'] = JSON.parse(listSession[i]['sessionData']);
            }
          }
          setSessionList(listSession);
        }
      })
    }

    useEffect(()=>{
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      if(currentRoute == "SesstionStart" && readingStatus){
        setReadingStatus(false);
      }
      const unsubscribe = navigation.addListener('focus', () => {
        // do something
        // console.log(">>currentRoute "+currentRoute);
        if(currentRoute == "HomePage"){
          getSessionDBList();
          setReadingStatus(false);
          appContext.doChangeRinseStatus(false);
          setReadStatus(false);
        }
      });
      if(counter){
        initDB('sessions').then((res)=>{
          // delsession(8).then(()=>{})
          // delsession(9).then(()=>{})
          // delsession(10).then(()=>{})
          if(currentRoute == "Dashboard"){
            getDashboardSessions().then((resSessions)=>{
              // console.log(">>Res ",resSessions);
              var listSession = resSessions;
              if(resSessions){
                for(let i=0;i<listSession.length;i++){
                  // console.log(">>resSessions ",resSessions);
                  if(listSession[i].sessionData !=undefined && listSession[i].sessionData != null){
                    listSession[i]['sessionData'] = JSON.parse(listSession[i]['sessionData']);
                  }
                  if(listSession[i].locationImages !=undefined && listSession[i].locationImages != null){
                    listSession[i]['locationImages'] = JSON.parse(listSession[i]['locationImages']);
                  }
                }
                setSessionList(listSession);
              }
              // setSessionList(listSession);
            })
          }else{
            getSessionDBList();
          } 
        });
        setCounter(false);
      }

      let listner = EventRegister.addEventListener('BLE_DATA', (value) => {
         console.log(">>BLE_STATUS ",value,readingStatus);
         if(value.event == 'completed' && readingStatus){
          // EventRegister.emit('StopInterval');
          // EventRegister.emit('BLECMD', { event: "homepageEvent" , cmd:'getSerial\r'})
         }
         if(value.event == 'error'){
            EventRegister.emit('BLE_STATUS', { event: "disconnected" })
         }
        });

      return ()=>{
        EventRegister.removeEventListener(listner);
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        unsubscribe;
    }  
    },[]);
    
    var addSessionList = (comment,location)=>{
    
      disableInterval();
      EventRegister.emit('StopInterval');
      KeepAwake.deactivate();
      // sessionDataList.push({location:'abc',comment:'',serverId:'0',startTime:this.sessionStartTime,endTime:Date.now()});
      
      var sessionListAr = [...sessionList];
      var sessionObj = {
          // serverId:0,
          operatorId: getOperatorData().serverId,
          sprayerId: getDeviceHWData().serverId,
          chemistryType: getOperatorData().chemistryType,
          startTime: setStartTime,
          ozSparayed:parseInt(currentSessionData.getFlowRate)/29.57,
          endTime: setEndTime,
          sessionLocation: locationText,
          sessionComment: commentText,
          locationImages:"", // set images after this session.
          // sessionData: JSON.stringify(currentSessionData),
          id: getLocalSessionId(),
          isSync:0,
          // isFinished:1,
          // isRinse:0,
          // appVersion:"1.1",
      } 
      sessionListAr.push({ sessionLocation: locationText, startTime: setStartTime, endTime: setEndTime, ozSparayed: parseInt(currentSessionData.getPumpedVolume)/29.57 })
      sessionListAr = sessionListAr.sort((a,b)=> b.startTime - a.startTime)
      setSessionList(sessionListAr); // 
      console.log(">>Session set "+sessionListAr.length,sessionList.length);
      // update location,comment and endtime in sessions data.
      updateSessions(sessionObj).then((respUpdateSession)=>{
        console.log(">>Update session ",respUpdateSession);
      });
      
      // console.log(">>imageList "+JSON.stringify(imageList))
      AsyncStorage.setItem(String(getLocalSessionId()),JSON.stringify(imageList));  
      setCommentText('');
      setLocationText('');
      setLocationImg('');
      setImageList([]);
      // console.log(">>Navigate ");
      setTimeout(()=>{
        navigation.navigate('HomePage');
      },500);
    }

    var startReading=()=>{
      KeepAwake.activate();
      console.log(">>getLocalSessionId() ",getOperatorData(),getDeviceHWData());
    
     var sessionObj = {
      // serverId:0,
      operatorId: getOperatorData().serverId,
      sprayerId: getDeviceHWData().serverId,
      chemistryType: getOperatorData().chemistryType,
      startTime: setStartTime,
      // endTime: setEndTime,
      // sessionLocation: locationText,
      // sessionComment: commentText,
      sessionData: JSON.stringify(currentSessionData),
      ozSparayed: parseInt(currentSessionData.getFlowRate)/29.57,
      isSync: 0,
      isFinished: 1,
      isRinse: 0,
      // rinseId:0,
      appVersion: "1.0.4",
  } 
  addSession(sessionObj).then((res)=>{
    // console.log(">Added ",res);
    getSessionWithParam('startTime',setStartTime).then((resSession)=>{
      // console.log(">>resSession",resSession);
      setLocalSessionId(resSession[0].id)
        enableInterval();
       EventRegister.emit('StartInterval')
    })
  })
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
      <Text style={{color:"#fff",alignSelf:"center",fontSize:18}}>Begin a new route to get started.</Text>
    </View>);
    }
    return(<>
    <View style={{height:"100%"}}>
      <View style={{flex:1,flexDirection:"column",height:"100%",backgroundColor:"#fff"}}>
          <View style={{height:"85%"}}>
          {currentRoute == "SesstionStart" ? 
          // <View style={{padding:18}}>
          //      <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:20,width:"100%"}}>
          //       <Text style={{fontSize:20}}>Electrostatic</Text>
          //       <Switch value={isSwitchEleOn} onValueChange={onToggleEleSwitch} color={'#012554'}/>
          //      </View>
          //      <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:20}}>
          //       <Text style={{fontSize:20}}>Trigger Lock</Text>
          //       <Switch value={isSwitchTrgOn} onValueChange={onToggleTrgSwitch} color={'#012554'}/>
          //      </View>
          //      <View style={{flexDirection:"row",justifyContent:"space-between",paddingBottom:20}}>
          //       <Text style={{fontSize:20,}}>Battery</Text>
          //       <Text style={{fontSize:18,}}>{btryPerct} %</Text>
          //      </View>
          //      <ProgressBar style={{height:10}} progress={btryPerct/100} color={'#012554'} />
          //   </View>
          <ScrollView>
            <SubSession locationText={locationText} setLocationText={setLocationText} commentText={commentText} setCommentText={setCommentText} imageList={imageList} setImageList={setImageList}/>
            </ScrollView>
            :  
          <FlatList
           data={sessionList}
           ListEmptyComponent={emptyList}
           keyExtractor={(item, index) => String(index)}
           renderItem={({item,index})=>
            <View key={index} style={{height:100,backgroundColor:item.isRinse == 1? item.isFinished ==  1?'red':'green':item.isFinished == 0?'#484848':item.sessionLocation?'#012554':'#a3780b',width:"100%",borderBottomColor:'#fff',borderBottomWidth:1,padding:15}}>
              <Text style={{color:'#fff',fontSize:18,fontWeight:"bold",textTransform:'capitalize',marginStart:15,paddingBottom:4}}>{item.sessionLocation?item.sessionLocation:'Incomplete session'}</Text>
                <View style={{justifyContent:"space-around",flexDirection:'row'}}>
                  <View>
                  <Text style={{color:'#fff',fontSize:13}}>Start time</Text>
                  <Text style={{color:'#fff',fontSize:13}}>{formatAMPM(item.startTime)}</Text>
                  </View>
                  {item.isRinse ?<View/>:<View>
                    <Text style={{color:'#fff',fontSize:13}}>Time elapsed</Text>
                    <Text style={{color:'#fff',fontSize:13}}>{item.endTime ? convertTime(Math.ceil(Math.abs(new Date(item.startTime).getTime()-new Date(item.endTime).getTime()) / 1000)):'00:00:00 '}</Text>
                  </View>}

                  <View>
                    <Text style={{color:'#fff',fontSize:13}}>{item.isRinse?'Date':'Oz sprayed'}</Text>
                    <Text style={{color:'#fff',fontSize:13}}>{item.isRinse? new Date(item.startTime).toLocaleDateString():item.ozSparayed != null ? parseFloat(item.ozSparayed).toFixed(2)+' Oz':'0.00 Oz'}</Text>
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
            {currentRoute == "HomePageRinse"? 
            <TouchableHighlight 
            style={[styles.circle,{justifyContent:"center",marginTop:19}]}
            onPress={() => {
                 navigation.navigate('Dashboard')
              }}
            >
              <Feather 
              name={"ios-open-outline"} 
              size={45}
              color={'#D8D8D8'}
              style={{alignSelf:"center",paddingLeft:"5%"}}/>
             
            </TouchableHighlight>:readingStatus ?
            <TouchableHighlight 
            disabled={locationText.length < 3}
            style={[styles.circle,{justifyContent:"center",marginTop:19}]}
            onPress={() => {
                  setEndTime = Date.now()
                  console.log(">>end ",setEndTime);
                  setReadStatus(false);
                  setReadingStatus(false);
                  // uploadS3Images();
                  appContext.doChangeRinseStatus(false);
                  addSessionList(commentText, locationText);

                  // showModal();
              }}>
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
              appContext.doChangeRinseStatus(true);
              setReadStatus(true);
              setReadingStatus(true);
              navigation.navigate('SesstionStart');
            // if(readingStatus){
            //   showModal();
            //  }
             }}>
              <AwesomeIcon name={"play"} 
              size={50}
              color={'#D8D8D8'}
              style={{alignSelf:"center",paddingLeft:"7%"}}/>
            </TouchableHighlight>
           }
            
          </View>
          <View style={{marginTop:"10%",width:"30%"}}>
     
            </View>
        </View>
      </View>
  </View>
  
  <SaveModal locationImg={locationImg} setLocationImg={setLocationImg} addSessionList={addSessionList} setLocationText={setLocationText} locationText={locationText} commentText={commentText} setCommentText={setCommentText} visible={visible} hideModal={hideModal} SetReadingStatus={(isBack)=>{setReadStatus(isBack)}} />
   {/* <RinseModal/> */}
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