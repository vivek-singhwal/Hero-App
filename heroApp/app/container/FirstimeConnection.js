import React,{useEffect,useState} from 'react';
import { View , StyleSheet, Text, TextInput as Input,Image, Alert, BackHandler,TouchableHighlight ,FlatList} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Button, ActivityIndicator,Modal } from 'react-native-paper';
import { getOperatorData, setDeviceData, getDeviceHWData, setDeviceHWData , sessionDataList } from '../services/DataService';
import { EventRegister } from 'react-native-event-listeners';
import {setDefaultValue,getReadOk, } from '../services/BleService';
import {initDB, addSprayer, getSprayers, getSprayersByHwId, delSprayer} from '../services/DBService';
import {addSprayerAPI} from '../services/apiService';
import { useBluetoothStatus ,BluetoothStatus} from 'react-native-bluetooth-status';

export default FirstTimeConnection = ({navigation}) => {
 let deviceListAr = [];
  const [btStatus, isPending, setBluetooth] = useBluetoothStatus();
    const [count,setCount] = useState(true);
    const [btStatusState,setBtStatusState] = useState(!btStatus);
    const [deviceStatus, setDeviceStatus] = useState('');
    const [deviceList, setDeviceList] = useState([]);
    const [isDeviceConnected, setisDeviceConnected] = useState(false);
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white',width:"70%",alignSelf:"center",borderRadius:10,paddingBottom:10};

    var  getBluetoothState=async()=> {
      return await BluetoothStatus.state();
    }
    var scanAndConenct = () => {
      showModal();  
        getBluetoothState().then((state)=>{
          console.log(">getBluetoothState ",state);
          
          if(state != false){
             if(!isDeviceConnected){
              EventRegister.emit('BLECMD', { cmd: 'startScan' });
            }else{
              EventRegister.emit('BLECMD', { cmd: 'disconnect' });
            }
          }else{
            setDeviceStatus('BT Enable..');
            setBluetooth(true);
            setDeviceStatus('Scanning...');
            EventRegister.emit('BLECMD', { cmd: 'startScan' });
          }
          // console.log(">>scanAndConenct ",state)
        })
        // console.log("scanAndConenct "+isDeviceConnected,isEnabled);
      };
    useEffect(()=>{
       console.log(">>getOperatorData ",getOperatorData())
        if(count){
          initDB('sprayers').then((res)=>{
            console.log(">>Res ",res);
          });
        setCount(false);
      }

      scanAndConenct();
      BackHandler.addEventListener('hardwareBackPress', () => true)
        var listener = EventRegister.addEventListener('BLE_STATUS1', (data) => {
          // console.log(">>BLE_STATUS ",data);
            if(data.event == "Data_Recieved"){
              console.log(data.value);
            }
           
            if(data.event == "error"){
                setisDeviceConnected(false);
                setDeviceStatus("Disconnected");
                navigation.navigate('FirstConnection');
              }
            if(data.event == "connected"){
              setisDeviceConnected(true);
              setDeviceStatus("Connected");
              hideModal()
            //   setSessionDataList([]); // set temp

            }else if(data.event == "bleDevices"){
                // console.log(">>devices ",data.devices);
                deviceListAr.push(data.devices);
                var arrayUniqueByKey = [...new Map(deviceListAr.map(item =>
                  [item['id'], item])).values()];
                setDeviceList(arrayUniqueByKey);
             
            }else if(data.event == "reading"){
              setDeviceStatus("Reading...");
            }else if(data.event == "readOK"){
              setDeviceStatus("Ready");
            }else if(data.event == "scanning"){
              setDeviceStatus("Scanning...");
              showModal();  
            }else if(data.event == "disconnected"){
              setDefaultValue();
            //   setSessionDataList([]); // set temp
              setisDeviceConnected(false);
              // navigation.navigate('Home');
              setDeviceStatus("Disconnected");
              navigation.navigate('FirstConnection');
            //   setTimeout(()=>{
            //     setDeviceStatus("Disconnected");
            //   },500)
            }else if(data.event ==='stopScan'){
                // Alert.alert('HeroApp','No device found.')
                setDeviceStatus("stopScan");
            }
          });
          return ()=>{
            EventRegister.removeEventListener(listener);
            BackHandler.removeEventListener('hardwareBackPress', () => true)
        }  
    },[])
  
  var emptyList=()=>{
      return( <View style={{padding:15}}>
      <Text style={{alignSelf:"center",fontSize:15}}>No device found</Text>
    </View>);
    }

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
            {isDeviceConnected && <MaterialCom size={150} color={'green'} style={{height:200,marginTop:20,marginBottom:40,}} name="check-bold"/>}
           {!isDeviceConnected && <Image style={{height:250,width:"94%",marginTop:20,marginBottom:40,}} source={require('../asset/bluetooth-guide.jpg')}/>}
        { deviceStatus === "Ready" ? 
         <Button 
              color={'#012554'}
              mode={'contained'}
              uppercase={false}
            //   disabled={deviceStatus === "Ready"?false:true}
              labelStyle={{fontSize:16,}} 
              icon={props=><Material 
                size={35}
                color={'#fff'}
                name="keyboard-arrow-right"/>}
              contentStyle={{flexDirection:"row-reverse",paddingTop:1,height:47,width:"90%",alignSelf:"center"}}
              onPress={()=>{
                var deviceObj = {
                    sdName:getDeviceHWData().sdName,
                    hardwareId:getDeviceHWData().hardwareId,
                    serverId:null,
                    isSync:0,
                    sprayerName:getDeviceHWData().sprayerName
                }
              
                getSprayersByHwId(getDeviceHWData().hardwareId).then((resDevice)=>{
                  if(resDevice.length){
                      console.log(">>resDevice",resDevice);
                      deviceObj.serverId = resDevice[0].serverId;
                      deviceObj.sprayerName = resDevice[0].sprayerName;
                  }else{
                      addSprayer(deviceObj).then(()=>{
                       
                      })
                  }
                  setDeviceHWData(deviceObj);
                  navigation.navigate('HomePage');
              })
                console.log(">>getDeviceHWData() ",getDeviceHWData())
                // if(getDeviceHWData().hardwareId != 0){
                //     addSprayerAPI(deviceObj).then((result)=>{
                //         console.log(">>result ",result.result);
                //         if(result.result){
                //           deviceObj.serverId = result.result.id;
                          
                //           setDeviceHWData(deviceObj);
                //           if(result.success){
                             
                //           }
                //         }
                        
                //      })
                //     // navigation.navigate('HomePage');
                // }
               
              }}
              >
               {'Begin Session'}
             </Button> :
            deviceStatus === 'Disconnected' || (deviceStatus === 'stopScan')?
            // deviceStatus === 'Disconnected' || (deviceStatus === 'stopScan' && !isDeviceConnected)?
             <Button 
                style={{flexDirection:"row",borderRadius:4,height:47,width:200,justifyContent:"center"}}
                color={'#012554'}
                mode={'contained'}
                uppercase={false}
                labelStyle={{fontSize:16}} 
                icon={props=><MaterialCom 
                size={25}
                color={'#fff'}
                name="bluetooth-connect"/>}
                contentStyle={{flexDirection:"row-reverse",paddingTop:1,height:47,width:"90%",alignSelf:"center"}}
                onPress={scanAndConenct}
             >
              {'Scan Devices'}
            </Button>:
             <View style={{flexDirection:"row",backgroundColor:'#012554',borderRadius:4,opacity:0.5,height:47,width:200,justifyContent:"center"}}>
                <ActivityIndicator animating={true} color={'#fff'} style={{marginRight:8}}/>
                 <Text style={{color:'#fff',alignSelf:"center",fontSize:16}}>{deviceStatus == 'Connected'?'Reading request':deviceStatus}</Text>
            </View>
         } 
    </View>
    <Modal dismissable={false} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <View style={{alignSelf:"center",width:"100%"}}>
          <View style={{height:30,backgroundColor:"#012554",}}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={{color:"#fff",marginLeft:10,alignSelf:"center"}}>Devices: </Text>
          <MaterialCom onPress={hideModal} style={{alignSelf:"flex-end", marginRight:5,paddingTop:2.5}} color={'#fff'} size={25} name="close"/>
          </View>
          </View>
          <View style={{padding:10}}>
          <FlatList
           data={deviceList}
           ListEmptyComponent={emptyList}
           keyExtractor={(item, index) => item.id}
           renderItem={({item,index})=>
            <TouchableHighlight onPress={()=>{
              console.log(">>Click",item);
              hideModal();
              EventRegister.emit('BLECMD',{event:'reqConnect',device:item})
              }} key={index} style={{height:40,borderBottomColor:'gray',borderBottomWidth:1}}>
              <Text style={{fontSize:13,fontWeight:"bold",textTransform:'capitalize',marginStart:15,marginTop:5}}>{item.name}</Text>
             </TouchableHighlight>
            }
         />
          </View>
        
            </View>
        </Modal>
    </View>)
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize:15
    },openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 4,
      padding: 10,
      elevation: 2
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
})