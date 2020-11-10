import React, { Component } from 'react';
import {
  StyleSheet , Text , View , TouchableHighlight , NativeEventEmitter , NativeModules , Platform , PermissionsAndroid , ScrollView , AppState , FlatList , Dimensions , Button , SafeAreaView ,Alert} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { EventRegister } from 'react-native-event-listeners';

const window = Dimensions.get('window');
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      scanning:false ,
      peripherals: new Map(),
      appState: ''
    }

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    BleManager.start({showAlert: false});
    this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
    this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
    this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );
    if (Platform.OS === 'android' && Platform.Version >= 23) {
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
    this.scanListener = EventRegister.addEventListener('SCAN', (data) => {
      if (data.cmd == "startScan"){
        this.turnOnBle();
        this.startScan();
      }
    } );
  }
  handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
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
    // this.getStringFromAscii(data.value);
    console.log('Received data ' + data.value+' String',this.getStringFromAscii(data.value));
    EventRegister.emit('BLE_STATUS', { event: "Data_Recieved" , value:this.getStringFromAscii(data.value)});
  }
  handleStopScan() {
    console.log('Scan is stopped');
    this.setState({ scanning: false });
  }
  startScan() {
    if (!this.state.scanning) {
      this.setState({ peripherals: new Map() });
      //scan for 20 seconds
      BleManager.scan([], 4, true).then((results) => {
        if (typeof (results) != undefined) { this.setState({ scanning: true }); }
      }).catch((error) => {
      });
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
      if (results.length == 0) {
        console.log('No connected peripherals')
      }
      var peripherals = this.state.peripherals;
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
      }
    });
  }
/*
 {"advertising": {"isConnectable": true, "localName": "GhostBaster_V1", "manufacturerData": {"CDVType": "ArrayBuffer", "bytes": [Array], "data": "AgEGDwlHaG9zdEJhc3Rlcl9WMQUSZADoAwIKCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="}, "serviceData": {}, "serviceUUIDs": [], "txPowerLevel": 8}, "id": "00:80:E1:00:00:AA", "name": "GhostBaster_V1", "rssi": -66}
*/
  handleDiscoverPeripheral(peripheral){
    console.log("handleDiscoverPeripheral>>>"+peripheral.name)
    var peripherals = this.state.peripherals;
    console.log('Got ble peripheral', peripheral.name );
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    if(peripheral.name == "GhostBaster_V1"){
        console.log(peripheral.name);
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
    }
  }
  test(peripheral) {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
        EventRegister.emit('BLE_STATUS', { event: "disconnected" });
      }else{
        BleManager.connect(peripheral.id).then(() => {
          let peripherals = this.state.peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            this.setState({peripherals});
          }
          EventRegister.emit('BLE_STATUS', { event: "connected" });
          Alert.alert("Hero", "Connected to "+peripheral.id  +"\n"+peripheral.name)
          console.log('Connected to ' + peripheral.id +"\n"+peripheral.name);

          setTimeout(() => {
            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
             
              var BLE_SPP_Service = "d973f2e0-b19e-11e2-9e96-0800200c9a66";
              var BLE_SPP_Notify_Characteristic = "d973f2e1-b19e-11e2-9e96-0800200c9a66";
              var  BLE_SPP_Write_Characteristic = "d973f2e2-b19e-11e2-9e96-0800200c9a66";
              var  BLE_SPP_AT_Characteristic = "0000fee3-0000-1000-8000-00805f9b34fb";
              
                BleManager.startNotification(peripheral.id, BLE_SPP_Service, BLE_SPP_Notify_Characteristic).then((res) => {
                  console.log('Started notification on ' + res);
                  setTimeout(() => {
                    var asciValue =this.getAsciValue('getSerial');
                    BleManager.write(peripheral.id, BLE_SPP_Service, BLE_SPP_Write_Characteristic,asciValue).then((resWrite) => {
                      console.log('responce ',resWrite);
                    }).catch((error)=>console.log(">>Error",error));
                  }, 500);
                }).catch((error) => {
                  console.log('Notification error', error);
                });
              // }, 500);
            });

          }, 900);
        }).catch((error) => {
          console.log('Connection error', error);
        });
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
    for(let i=0;i<value.length;i++){
        ascivalue +=String.fromCharCode(value[i]);
    }
    return ascivalue;
  }
  renderItem(item) {
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableHighlight onPress={() => this.test(item) }>
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
    const btnScanTitle = 'Scan Bluetooth (' + (this.state.scanning ? 'on' : 'off') + ')';
    return (
      <SafeAreaView style={styles.container}>
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
          <ScrollView style={styles.scroll}>
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

          </ScrollView>
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