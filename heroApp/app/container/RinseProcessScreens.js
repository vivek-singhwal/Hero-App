import React,{useEffect,useState} from 'react';
import { View , StyleSheet, Text, TextInput as Input,Image, Alert, TouchableHighlight} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import { addRinseProcessSession, updateIsFinished,delsession,updateFininshedSession,getSessionWithParam } from '../services/DBService';
import { Button, Switch, ProgressBar, Modal, Portal, Provider, TextInput } from 'react-native-paper';
export default RinseProcess = ({navigation}) =>{
    const [counter,setCounter] = useState(1);
    const [progressValue,setProgressValue] = useState(0);
    const [seconds,setSeconds] = useState(30);
    useEffect(()=>{
        let interval ;
        if(counter ==   4){
            interval = setInterval(() => {
                if(progressValue <= 100 && seconds){
                    setProgressValue(value=>value+3.4); 
                    setSeconds(seconds =>seconds - 1);
                }else{
                    setCounter(preCount=>preCount+1)
                    clearInterval(interval)
                }
            }, 1000);
        }
        return()=>{
            clearInterval(interval);
        }
    })
    var addRinseSession = () =>{
        var sessionObj = {
            // serverId:0,
            startTime: Date.now(),
            sessionLocation: 'Rinse Cycle Complete  ✔',
            isSync:0,
            isFinished: 0,
            isRinse: 1,
            appVersion:'1.0.4',
            // rinseId:0,
        }
        // delsession(16).then(()=>{})
        // delsession(17).then(()=>{})
        addRinseProcessSession(sessionObj).then((res)=>{
          
          // updateIsFinished(s)
          updateFininshedSession().then(()=>{
            console.log(">Added ",res);
           
          })
          setCounter(1)
          navigation.navigate('HomePageRinse');
        })
      console.log(">Add rinse session ",new Date(sessionObj.startTime).getTime());
    }
    return(<>
        <View style={[styles.modalView,{ justifyContent:"space-between",flexDirection:"column",height:"80%"}]}>
        <View style={{marginTop:40}}>
        <Text style={[styles.modalText]}>
        {counter == 1 && 'Step 1: Replace chemistry '}
        {counter == 2 && 'Step 2: Posititon spray tip in'}
        {counter == 3 && "Step 3: Pressing 'Start"}
        {counter == 4 && "Rinse cycle is running "}
        {counter == 5 && "Rinse cycle is complete."}
        {counter == 6 && "Rinse cycle could not be"}
        </Text>
     
         <Text style={[styles.modalText]}>
             {counter == 1 && 'tank with fresh water rinse \n tank.'}
             {counter == 2 && 'cachement area, over a \n bucket,drain or sink.'}
             {counter == 3 && "Rinse' will initiate the pump \n to run for 30 seconds."}
             {counter == 4 && "please wait until is \n finished."}
             {counter == 5 && "Now please store the sprayer \n safely and securely."}
             {counter == 6 && "completed. Please try rising \n again for 30 seconds."}
        </Text>
        </View>
        {counter == 5 && 
        <MaterialCom size={150} color={'green'} style={{height:200,marginTop:20,marginBottom:40,}} name="check-bold"/>}
        {counter == 6 && 
        <View style={{height:90,width:85,backgroundColor:"#990000",justifyContent:"center",borderRadius:10}}>
           <MaterialCom style={{alignSelf:"center"}} size={80} color={'#fff'}  name="exclamation-thick"/>
        </View>}
       
        {/* <Image style={{height:150,width:150,marginTop:20}} source={require('./asset/spray-icon.png')}/> */}
   {counter == 4 &&
        <View style={{flexDirection:"column"}}>
            <View style={{flexDirection:"row",alignSelf:"center"}}>
                <Material size={25} color={'#012554'} name="timer"/>
                <Text style={{fontSize:20}}> {parseInt(seconds)}s </Text>
            </View>
            
             <ProgressBar style={{height:10,width:320,marginTop:10,backgroundColor:"#ECECECEC",borderRadius:3}} progress={progressValue/100} color={'green'} />
        </View>
       
    } 
     {counter ==6 && 
     <View style={{paddingBottom:50}}>
       <Button
        style={{marginBottom:20}}
        color={'#012554'}
        contentStyle={{flexDirection:"row-reverse",}}
        mode="contained"
        onPress={()=>{
          setCounter(1)
        }}
       >
          Rinse again
        </Button>
        <Button
        style={{justifyContent:"center",width:"85%",}}
        color={'#012554'}
        contentStyle={{flexDirection:"row-reverse"}}
        // mode="contained"
        onPress={()=>{
          // setCounter(1)
          var sessionObjAr = {
            // serverId:0,
            startTime: Date.now(),
            sessionLocation: 'Rinse Cycle Incomplete  X',
            isSync:0,
            isFinished: 1,
            isRinse: 1,
            appVersion:'1.0.4',
            // rinseId:0,
        }
        console.log(">>sessionObjAr ",JSON.stringify(sessionObjAr))
        // delsession(16).then(()=>{})
        // delsession(17).then(()=>{})
        addRinseProcessSession(sessionObjAr).then((res)=>{
          updateFininshedSession().then(()=>{
            console.log(">Added ",res);
           
          })
          setCounter(1);
          navigation.navigate('HomePageRinse');
        })
        }}
       >
         Finish without rising
        </Button>
     </View>
     }

    {counter !=6 && <View style={{flexDirection:"row",marginBottom:15,width:"100%",paddingBottom:20,justifyContent:"space-around"}}>
        {/* <TouchableHighlight
          style={{ ...styles.openButton,backgroundColor: "#fff",marginRight:10 ,borderColor:'#012554',borderWidth:1}}
          onPress={() => {
            // EventRegister.emit('BLECMD',{cmd:'disconnect'}) 
            // setModalVisible(!modalVisible);
            setModalVisible(false);
          }}>
          <Text style={[styles.textStyle,{color:'#012554',}]}>Back</Text>
        </TouchableHighlight> */}
        {counter == 1 && <View style={{justifyContent:"center",width:"30%"}}/>}
       
        {counter > 1 && counter != 6 && 
        <Button
            style={{justifyContent:"center",width:"30%"}}
            color={'#012554'}
            //  contentStyle={{flexDirection:"row-reverse"}}
            icon={()=><Material 
                        // style={{backgroundColor:"pink"}}
                    size={25}
                        color={'#012554'}
                        name="keyboard-arrow-left"/>} 
            mode="outlined"
            
            onPress={() =>{
              if(counter == 4){
                setCounter(6)
              }else{
                setCounter(preCount=>preCount-1)
              }
             }
              }>
            Back
        </Button>}  
        
       {counter < 4 ? 
       <Button
        style={{justifyContent:"center",width:"32%"}}
        color={'#012554'}
         contentStyle={{flexDirection:"row-reverse",}}
         icon={()=><Material 
                    // style={{backgroundColor:"pink"}}
                   size={25}
                    color={'#fff'}
                    name="keyboard-arrow-right"/>} 
        mode="contained"
        
        onPress={() => {
          if(counter == 3){
            startTime = Date.now()
          }
          setCounter(preCount=>preCount+1)}}>
         {counter < 3 ?'Next':'Start'} 
        </Button> :
        counter == 6 ?<View/>: <Button
        style={{justifyContent:"center",width:"35%"}}
        color={'#012554'}
        disabled={counter == 4}
         contentStyle={{flexDirection:"row-reverse",}}
         icon={()=><Material 
                    // style={{backgroundColor:"pink"}}
                   size={25}
                    color={'#fff'}
                    name="keyboard-arrow-right"/>} 
        mode="contained"
        
        onPress={() => {
            addRinseSession();
        }}>
          Finish
        </Button> }
       
      </View>}
     
    </View>
    </>)
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    //   marginTop: 22,
      
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 4,
    //   padding: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 4,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
    //   marginTop: 20,
    fontSize:20,
      textAlign: "center"
    }
  });
  