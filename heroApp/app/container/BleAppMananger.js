import React, { Component } from 'react';
import {
  StyleSheet , Text , View , TouchableHighlight , NativeEventEmitter , NativeModules , Platform , PermissionsAndroid , ScrollView , AppState , FlatList , Dimensions , Button , SafeAreaView ,Alert} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { EventRegister } from 'react-native-event-listeners';
import BleService, {getInterval, getReadOk, setReadOk , getCurrentCmd,setCurrentCmd, bleCommands,initCmdSeq,bleResults, dataCmdSeq} from '../services/BleService';
import { predefinedSessionData,setPredefinedessionData ,
        setDeviceHWData,currentSessionData,setCurrentSessionData,
        getLocalSessionId,setBtStatus,
         getSessionId, setSecondRead,getSecondRead, secondRead,setDeviceData, setInternetConnection,currentReadData,setCurrentReadData} from '../services/DataService';
import NetInfo from "@react-native-community/netinfo";
import { addSessionDataDB } from '../services/DBService';
import { apiEndPoint } from '../services/constants';

const window = Dimensions.get('window');
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
var BLE_SPP_Service = BleService.bleService;
var BLE_SPP_Notify_Characteristic = BleService.TXCharacteristic;
var BLE_SPP_Write_Characteristic = BleService.RXCharacteristic;

export default class BleAppmanager extends Component {
  constructor(props){
    super(props)
    this.state = {
      scanning:false ,
      peripherals: new Map(),
      appState: '',
      readInterval:0,
      readSessionData:0,
      btStatus:true
    }
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }
  sessionData = {};
  currentReadData=[]
  sessionStartTime = {};
  
  componentDidMount() {
    NetInfo.configure({
      reachabilityUrl: apiEndPoint,
      reachabilityTest: async (response) => response.status === 204,
      reachabilityLongTimeout: 60 * 1000, // 60s
      reachabilityShortTimeout: 5 * 1000, // 5s
      reachabilityRequestTimeout: 15 * 1000, // 15s
    });

    AppState.addEventListener('change', this.handleAppStateChange);
    BleManager.start({showAlert: true});
    this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
    this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
    this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );
    if (Platform.OS === 'android' && Platform.Version >= 29) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
          if (result) {
            console.log("Permission is OK");
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
              if (result) {
                console.log("User accept");
              } else {
                console.log("User refuse");
              }
            });
          }
    });
  } else if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              console.log("Permission is OK");
            } else {
              PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  console.log("User accept");
                } else {
                  console.log("User refuse");
                }
              });
            }
      });
    }

    this.startInterval = EventRegister.addEventListener('StartInterval', ()=>{
      //clear OLD interval if pending
      clearInterval(this.readInterval);
      setSecondRead(true);
      if(this.state.readSessionData == 0){
        // this.writeData('getSerial\r');
        this.readInterval = setInterval(()=>{
          if(getInterval == false){
            return;
          }
          console.log("currentSessionData.getBatteryLevel:"+currentSessionData.getBatteryLevel);
          // console.log(">>> interval method..."+this.state.readSessionData);
          var sessionObjApi = {
            "batteryLevel": currentSessionData.getBatteryLevel,
            "esvStatusState":  currentSessionData.getESVState,
            "firmware": predefinedSessionData.getFirmware, // not frequently required
            "flow": currentSessionData.getFlow ,
            "flowRate":  parseInt(currentSessionData.getFlowRate),
            "HWVersion": predefinedSessionData.getHWVersion, // not frequently required
            "model": predefinedSessionData.getModel, // not frequently required
            "pumpStatus": currentSessionData.getPumpState,
            "pumpStatusTime": currentSessionData.getPumpTime,
            // "triggerLatchStatusState": "this.sessionData.getTriggerLatchState",
            "triggerLatchStatusState": currentSessionData.getTriggerLatchState,
            "pumpedVolume": currentSessionData.getPumpedVolume ,
            "serial": predefinedSessionData.getSerial, // not frequently required
            "triggerLatchMode": currentSessionData.getTriggerLatchMode,
            "unitName": predefinedSessionData.getUnitName,
            "resetPump": predefinedSessionData.resetPump, // not frequently required
            // "setUnitName": this.sessionData.setUnitName,
            "updateFirmware": predefinedSessionData.updateFirmware, // not frequently required
            "totalOnTime": currentSessionData.getTotalOnTime,
            "rinseCycles": currentSessionData.getRinseCycles,
          }
          sessionObjApi.timeStamp = Date.now();
          sessionObjApi.sessionId = getSessionId();
            this.writeData('getPumpTime\r');
        var localSessionDtaObj = {};
        localSessionDtaObj.sessionData= JSON.stringify(sessionObjApi);
        localSessionDtaObj.isSync=0;
        localSessionDtaObj.isFinished=1;
        localSessionDtaObj.sessionId=getLocalSessionId();
        localSessionDtaObj.serverId=null;
        localSessionDtaObj.serverSessionId = null;
        addSessionDataDB(localSessionDtaObj).then((respSessionData)=>{
          console.log(">>respSessionData ",respSessionData);
        })
       },10000) //every 10 seconds
      }
    });
    this.stopInterval = EventRegister.addEventListener('StopInterval', ()=>{
      //clear interval
      clearInterval(this.readInterval);
      setReadOk(false);
      setSecondRead(false);
    });
    this.scanListener = EventRegister.addEventListener('BLECMD', (data) => {
      // if(data.event == 'initCmdSeq'){
        if (data.cmd == "startScan"){
          this.turnOnBle();
          this.startScan();
        } 
        if(data.event == "test"){
        return 'test';
        }
        if(data.event == "reqConnect"){
          var peripherals = this.state.peripherals;
          peripherals.set(data.device.id, data.device);
          this.connect(data.device);
          }
        else if (data.cmd == "doDisconnect"){
          this.BleDisconnect();
            //this.connect(BleService.getPeripherial());
        } 
        else if (data.cmd == "disconnect"){
          this.connect(BleService.getPeripherial());
        } 
        else if(data.cmd == 'sprayEnable'){
          this.writeSingleData('sprayEnable\r');
        } else if(data.cmd == 'sprayDisable'){
          this.writeSingleData('sprayDisable\r');
  
        } else if(data.cmd == 'getESVState'){
          this.writeSingleData('getESVState\r');
  
        } else if(data.cmd == 'setUnitName'){
          this.writeSingleData(data.cmdValue);
        } else if(data.cmd == 'getUnitName'){
          this.writeSingleData(data.cmdValue);
        }else if(data.cmd == 'setTriggerLatchState'){
          this.writeSingleData('setTriggerLatchState\r');
        }
         else {
          //  console.log(">>elsepart ",data.cmd)
          if(bleCommands.indexOf(data.cmd) >= 0 && data.event == 'initCmdSeq'){
            this.writeData(data.cmd);
          }if(data.event == 'homepageEvent'){
            // clearInterval(this.readInterval);
            this.sessionStartTime = Date.now();
            setReadOk(false);
          }
          if(data.event  == "secCmdSec"){
            this.writeData(data.cmd);
          }
        }
    } );
  }

  //not working
  BleDisconnect(){
    console.log("do BleDisconnect");
    BleManager.disconnect(BleService.getPeripherial().id)
        .then(() => {
          EventRegister.emit('BLE_STATUS', { event: "disconnected" });
          setSecondRead(false); //for reset 
          setReadOk(false); //for reset 
          console.log("Successfully Disconnected");
        })
        .catch((error) => {
          console.log(error);
        });
  }
  handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!',nextAppState)
    }
    this.setState({appState: nextAppState});
  }
  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }
  handleDisconnectedPeripheral(data) {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({peripherals});
    }
    console.log('Disconnected from ' + data.peripheral);
    EventRegister.emit('BLE_STATUS', { event: "disconnected" });
  }
  handleUpdateValueForCharacteristic(data) {
    if(getCurrentCmd() !=""){
      bleResults[getCurrentCmd()] = this.getStringFromAscii(data.value);
      this.sessionStartTime = Date.now();
      this.sessionData[getCurrentCmd().replace(/(\r\n|\n|\r)/gm, "")] = this.getStringFromAscii(data.value).replace(/(\r\n|\n|\r)/gm, "")
      this.currentReadData.push(this.currentReadData);
    }
    
     if( !getReadOk() && initCmdSeq.indexOf(getCurrentCmd()) >= 0 && !secondRead) {
      let cmdIndex = initCmdSeq.indexOf(getCurrentCmd());
      let nextCmd = initCmdSeq[cmdIndex +1];
      
      if(nextCmd != 'done'){
        EventRegister.emit('BLE_STATUS', { event: "reading" });
        EventRegister.emit('BLECMD', { event: "initCmdSeq" , cmd:nextCmd});
      }else{
        // console.log('final result...');
        setReadOk(true);
        // firstTimeRead =true;
        setCurrentSessionData(this.sessionData);
        setPredefinedessionData(this.sessionData);
        setCurrentReadData(this.currentReadData);        
        this.sessionData = {};
        EventRegister.emit('BLE_STATUS', { event: "readOK" });
        EventRegister.emit('BLE_DATA', { event: "completed" });
        var batteryLevel = Number(bleResults['getBatteryLevel\r']);
        if(!isNaN(batteryLevel) && batteryLevel < 11 && batteryLevel > 0 ){
          EventRegister.emit('BATTERY', { value:batteryLevel });
        }
      }
    }
    if(secondRead && dataCmdSeq.indexOf(getCurrentCmd() >= 0)){
     // console.log(">secondRead >",dataCmdSeq.indexOf(getCurrentCmd()),getCurrentCmd())
      let cmdIndex = dataCmdSeq.indexOf(getCurrentCmd());
      let nextCmd = dataCmdSeq[cmdIndex +1];
      if(nextCmd != 'done'){
        EventRegister.emit('BLE_STATUS', { event: "reading" });
        EventRegister.emit('BLECMD', { event: "secCmdSec" , cmd:nextCmd});
      }else{
        console.log('final result...');
        setReadOk(true);
        // firstTimeRead =true;
        setCurrentSessionData(this.sessionData);
        this.sessionData = {};
        // setCurrentSessionData({});
        this.state.readSessionData = 0;
        EventRegister.emit('BLE_STATUS', { event: "readOK" });
        EventRegister.emit('BLE_DATA', { event: "completed" });
        console.log(JSON.stringify(bleResults));
      }
    }
    EventRegister.emit('BLE_STATUS', { event: "Data_Recieved" , value:this.getStringFromAscii(data.value)});
  }
  handleStopScan() {
    console.log('Scan is stopped');
    EventRegister.emit('BLE_STATUS', { event: "stopScan" });
    this.setState({ scanning: false });
  }
  startScan() {
    if (BleService.getPeripherial().isConnectable == undefined) {
      this.setState({ peripherals: new Map() });
      //scan for 20 seconds
      BleManager.scan([], 4, true).then((results) => {
        if (typeof (results) != undefined) { 
          EventRegister.emit('BLE_STATUS', { event: "scanning"});
          this.setState({ scanning: true 
          }); 
        }else{
        }
      }).catch((error) => {
      });
    }
  }
  writeSingleData = function(writeCommand){
    var peripheral = BleService.getPeripherial();
    if(writeCommand != null){
       BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
           BleManager.startNotification(peripheral.id, BLE_SPP_Service, BLE_SPP_Notify_Characteristic).then((res) => {
             setTimeout(() => {
               var asciValue =this.getAsciValue(writeCommand);
               BleManager.write(peripheral.id, BLE_SPP_Service, BLE_SPP_Write_Characteristic,asciValue).then((resWrite) => {
                 // response here..
               }).catch((error)=>console.log(">>Error",error));
             }, 20);
           }).catch((error) => {
             console.log('Notification error', error);
            //  EventRegister.emit('BLE_STATUS', { event: "error"});
            EventRegister.emit('BLE_STATUS', { event: "disconnected" });
           })
       }).catch((error) => {
        //  EventRegister.emit('BLE_DATA',{event:'error'});
         console.log('service error writeSingleData ', error);
         EventRegister.emit('BLE_STATUS', { event: "disconnected" });
        //  EventRegister.emit('BLE_STATUS', { event: "error"});
       });
    }else{
      console.log("Command null");
    }
  };
  writeData = (writeCommand) => {
  //console.log(">> writeData: "+writeCommand);
   setCurrentCmd(writeCommand);
   var peripheral = BleService.getPeripherial();
   if(this.state.btStatus){
    if(writeCommand != null){
      BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
        //console.log(BLE_SPP_Service);
          BleManager.startNotification(peripheral.id, BLE_SPP_Service, BLE_SPP_Notify_Characteristic).then((res) => {
            // console.log('Started notification on ' + res);
            setTimeout(() => {
              var asciValue =this.getAsciValue(writeCommand);
              BleManager.write(peripheral.id, BLE_SPP_Service, BLE_SPP_Write_Characteristic,asciValue).then((resWrite) => {
                // console.log('writeBLEResponce ',resWrite);
              }).catch((error)=>console.log(">>Error",error));
            }, 20);
          }).catch((error) => {
            console.log('Notification error', error);
            EventRegister.emit('BLE_STATUS', { event: "error" });
          })
      }).catch((error) => {
        console.log('service error writeData', error);
        EventRegister.emit('BLE_STATUS', { event: "error"});
      });
   }else{
     console.log("Command null");
   }
   }
  }
  turnOnBle() {
    BleManager.enableBluetooth().then(() => {
      // Success code
      console.log("The bluetooth is already enabled or the user confirm");
    }).catch((error) => {
      // Failure code
      console.log("The user refuse to enable bluetooth");
    });
  }
  retrieveConnected(){
    BleManager.getConnectedPeripherals([]).then((results) => {
      console.log(">>retrieveConnected ",results);
      if (results.length == 0) {
        console.log('No connected peripherals')
      }
      var peripherals = this.state.peripherals;
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        //console.log(results.length)
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
        break;
      }
    });
  }
  handleDiscoverPeripheral(peripheral){
    //console.log("handleDiscoverPeripheral>>>"+peripheral.name)
    var peripherals = this.state.peripherals;
   if(peripheral.name){
    // console.log('Got ble peripheral', peripheral.name );
    this.setState({ peripherals });
    EventRegister.emit('BLE_STATUS', { event: "bleDevices" ,devices: JSON.parse(JSON.stringify(peripheral))});
    // console.log(JSON.stringify(peripheral))
   }
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    if(peripheral.name.startsWith("Ghost") || 
      peripheral.name.startsWith("ES")||
      peripheral.name.startsWith("es") ||
      peripheral.name.startsWith("Blue")){
    }
  }
  connect(peripheral) {
    //console.log(peripheral)
    var localHw = {};
    if (peripheral){
      if (peripheral.connected){
        console.log("connected",peripheral);    
        BleManager.disconnect(peripheral.id);
        EventRegister.emit('BLE_STATUS', { event: "error" });
      }else{
        let deviceConnected = false;
        BleManager.connect(peripheral.id).then(() => {
          let peripherals = this.state.peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            BleService.setPeripherial(peripheral);
            this.setState({peripheral});
            peripherals.set(peripheral.id, p);
          }
          EventRegister.emit('BLE_STATUS', { event: "connected" });
          deviceConnected = true;
          localHw.sdName = peripheral.name;
          localHw.hardwareId = peripheral.id;
          localHw.sprayerName = peripheral.name;
          setDeviceHWData(localHw);
          setTimeout(() => { 
            this.writeData('getSerial\r');
          }, 90);

        }).catch((error) => {
          deviceConnected = true;
          console.log('Connection error', error);
        });
        setTimeout(()=>{
          if(!deviceConnected){
            //App must be reload after scan if not connected
            EventRegister.emit('BLE_STATUS', { event: "deviceNotAvaible" });
          }
        },2000)
      }
    }
  }
  
  getAsciValue(value){
    var ascivalue=[];
    for(let i=0;i<value.length;i++){
        ascivalue[i]=value.charCodeAt(i);
    }
    return ascivalue;
  }
  getStringFromAscii(value){
    var ascivalue="";
    for(let i=0; i < value.length; i++){
        ascivalue +=String.fromCharCode(value[i]);
    }
    return ascivalue;
  }
  renderItem(item) {
    //console.log(item);
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableHighlight onPress={() => this.connect(item) }>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    const list = Array.from(this.state.peripherals.values());
    //console.log(list);
    const btnScanTitle = 'Scan Bluetooth (' + (this.state.scanning ? 'on' : 'off') + ')';
    return (
      <SafeAreaView style={styles.container,{height:'0%'}}>
        <View style={styles.container}>
          <View style={{margin: 10}}>
            <Button title="Turn On Bluetooth" onPress={() => this.turnOnBle() } />
          </View>
          <View style={{margin: 10}}>
            <Button title={btnScanTitle} onPress={() => this.startScan() } />
          </View>
          <View style={{margin: 10}}>
            <Button title="Retrieve connected peripherals suman" onPress={() => this.retrieveConnected() } /> 
          </View>
          <View style={{margin: 10}}>
            <Button title="send data" onPress={() => this.sendData() } /> 
          </View>
          {/* <ScrollView style={styles.scroll}> */}
            {(list.length == 0) &&
              <View style={{flex:1, margin: 20}}>
                <Text style={{textAlign: 'center'}}>No peripherals</Text>
              </View>
            }
            <FlatList
              data={list}
              renderItem={({ item }) => this.renderItem(item) }
              keyExtractor={item => item.id}
            />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1 ,   backgroundColor: '#FFF' ,   width: window.width ,   height: window.height
  } , scroll: {
    flex: 1 ,   backgroundColor: '#f0f0f0' ,   margin: 10 , } , row: {
    margin: 10
  },
});