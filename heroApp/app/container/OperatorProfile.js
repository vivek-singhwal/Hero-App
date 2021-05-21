import React,{useEffect,useState} from 'react';
import { View, TextInput as Input,ScrollView, Linking, TouchableOpacity, KeyboardAvoidingView, NativeModules, NativeEventEmitter, StyleSheet,TouchableHighlight, Keyboard} from 'react-native';
import { Avatar, Button,Text ,Modal} from 'react-native-paper';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import { getOperators, initDB , addOperator } from '../services/DBService';
import { setOperatorData } from '../services/DataService';
import RNPickerSelect from 'react-native-picker-select';
import BleStatusModal from './BleStatusModal';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
import BleManager from 'react-native-ble-manager';

export default OperatorProfile= ({navigation}) =>{
    const [count,setCount] = useState(true);
    const [textFocusedName,setTextFocusedName] = useState(false);
    const [textFocusedChem,setTextFocusedChem] = useState(false);
    const [visible, setVisible] = useState(false);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 10,width:"70%",alignSelf:"center",borderRadius:4};
    const [opName,setOpName] = useState('');
    const [opCompany,setOpCompany] = useState('');
    const [opChem,setOpChem] = useState('NaDCC');
    const [loading,setLoading] = useState(false);
    const [btStatus, setBtStatus]=useState(false);
    const [bleModal, setBleModal] = useState(false);
    const hideBleModal = () => setBleModal(false);
    const [blueToothOFF,setBlueToothON] = useState(false);
    useEffect(()=>{
      // console.log(">>Status "+BleManager.checkState());
      BleManager.checkState();
      bleManagerEmitter.addListener("BleManagerDidUpdateState", (args) => {
        if(args.state == "off"){
          setBtStatus(true);
        }else{
          setBtStatus(false);
        }
        // The new state: args.state
      });
        if(count){
          initDB('operators').then((res)=>{
            getOperators().then((result)=>{
                if(result && result.length > 0){
                  var operatorDat =  JSON.parse(JSON.stringify(result[0]));
                  var opObj = {"chemistryType": operatorDat.chemistryType, "company": operatorDat.company, "opName": operatorDat.opName, "serverId": operatorDat.serverId}
                  setOperatorData(opObj);
                  navigation.navigate('DeviceConnection')
                }
            })
          });
       setCount(false);
      }
        return()=>{
          bleManagerEmitter.removeAllListeners('BleManagerDidUpdateState');
          // unsubscribe();
        }
    },[])

    goDevices = async () =>{
      if(await BluetoothStatus.state()){
        navigation.navigate('DeviceConnection')
      }else{
        setBlueToothON(true);
        console.log(">> BlueTooth is Off");
      }
    }
    var addRecord = async ()=>{
      setLoading(true);
      if(opName.length > 2 && opCompany.length > 2){
        var operatorObj = {
          opName: opName,
          company: opCompany,
          chemistryType: opChem,
          isSync:0
        }
             addOperator(operatorObj).then((data)=>{
                  // console.log(">addOperator ",operatorObj,JSON.stringify(data));
              })
              var opObj = {"chemistryType": operatorObj.chemistryType, "company": operatorObj.company, "opName": operatorObj.opName, "serverId":null,}
              setOperatorData(opObj);
              goDevices();
              setLoading(false);
          }else{
            setLoading(false);
            setVisible(true);
          }
  
    }

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0
    return(<>
    <View style={{marginTop:"15%",height:"100%"}}>
    <ScrollView keyboardShouldPersistTaps='never'>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset} style={{flexDirection:"column",justifyContent:"center"}}>
        <Avatar.Icon 
        size={155} 
        style={{backgroundColor:'#DFE6ED',marginBottom:50,alignSelf:"center",}}
        icon={props=><AwesomeIcon5 
                    size={45}
                    color={'#9EADBA'}
                    name="user-alt"/>} />
        <View style={{marginBottom:20,alignSelf:"center"}}>
        
        <View style={{ marginBottom:20,borderColor:textFocusedName?'#012554':'gray',borderWidth:1.8,height:45,borderRadius:5,width:250,alignSelf:"center"}}>
               <Input onFocus={()=> setTextFocusedName(true)}
                        onBlur={()=> {setTextFocusedName(false);Keyboard.dismiss()}}
                        placeholder={'Name'}
                        style={{padding:10,marginTop:1,fontSize:20}}
                        value={opName}
                        onChangeText={text => setOpName(text)}
                    />
            </View>
            <View style={{marginBottom:40,borderColor:'#012554',borderWidth:1.8,borderRadius:5,width:250,alignSelf:"center",flexDirection:"row"}}>
                <Input onFocus={()=> setTextFocusedChem(true)}
                        onBlur={()=> setTextFocusedChem(false)}
                        placeholder={'Company'}
                        style={{padding:10,marginTop:1,fontSize:20}}
                        value={opCompany}
                        onChangeText={text => setOpCompany(text)}/>
            </View>
            {/* <View style={{flexDirection:"row",marginBottom:40, borderColor:textFocusedChem?'#012554':'gray',borderWidth:1.8,height:45,borderRadius:5,width:250,justifyContent:"center"}}> */}
           
               <RNPickerSelect
                    // icon={<Entypo size={20} name="select-arrows" style={{alignSelf:"center"}}/>}
                    value={opChem}
                    placeholder={{}}
                    style={{
                      inputIOS:{
                        bottom:20,
                        marginBottom:10,
                        paddingStart:10,
                        fontSize:16,
                        borderRadius:4,
                        borderColor:textFocusedChem?'#012554':'gray',borderWidth:1.8,
                        height:45,
                      },
                      inputAndroid: {
                        backgroundColor: 'transparent',
                      },
                      iconContainer: {
                        // top: 5,
                        right: 15,
                        bottom:42,
                        // marginBottom:10
                      },
                    }}
                    textInputProps={{ underlineColor: 'yellow' }}
                    // useNativeAndroidPickerStyle={false}
                    onValueChange={(value) => setOpChem(value)}
                    Icon={() => {
                      return <Entypo size={20} name="select-arrows" style={{alignSelf:"center"}}/>;
                    }}
                    items={[
                        {key:'1', label: 'NaDCC', value: 'NaDCC'},
                        {key:'2', label: 'AHP', value: 'AHP'}
                      ]}
                />
            {/* </View> */}
           {loading?
           <Button 
           mode={'contained'}
           disabled={true}
           labelStyle={{fontSize:16}} 
            uppercase={false}
           contentStyle={{flexDirection:"row-reverse",paddingTop:1,height:47}}
          //  onPress={addRecord}
           >
            Please wait..
          </Button>
           :<Button 
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
             </Button>} 

        </View>
       
       {btStatus &&  <TouchableHighlight style={{alignSelf:"center",marginTop:10}} onPress={()=>{setBleModal(true);}}>
          <View style={{flexDirection:"row"}}>
          <Foundation color={'red'} size={22} name="alert" style={{paddingRight:10}}/>
          <Text style={{fontSize:18, color:"red",textDecorationStyle:"solid",textDecorationColor:"red",textDecorationLine:"underline"}}>
           Bluetooth is OFF 
          </Text>
          <Foundation color={'red'} size={22} name="bluetooth" style={{paddingLeft:10}}/>
          </View>
        </TouchableHighlight>}
       

      </KeyboardAvoidingView>
    </ScrollView>
    </View>
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <View style={{alignSelf:"center",height:130,width:"95%"}}>
        <Text>Please enter minimum 3 characters in below fields: </Text>
          {opName.length < 3 && <Text style={{fontWeight:"bold",paddingTop:4,paddingBottom:3}}>Name</Text>}
          {opCompany.length < 3 && <Text style={{fontWeight:"bold"}}>Company</Text>}
          <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#012554",width:70,alignSelf:"center",marginTop:20 }}
              onPress={() => {
                setVisible(false)
              }}>
              <Text style={styles.textStyle}>OK</Text>
            </TouchableHighlight>
            </View>
        </Modal>
        <Modal
        animationType="slide"
        transparent={true}
        visible={blueToothOFF}
        onRequestClose={() => {
        }}>
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          padding: 40,
        }}>

          <View style={[styles.modalView]}>
            <Text style={[styles.modalText,{fontSize:16}]}>BlueTooth is off.</Text>
            <Text style={[styles.modalText,{fontSize:16,paddingBottom:15}]}>Turn on bluetooth from Smart Phone settings.</Text>
            <TouchableOpacity onPress={()=>{setModalVisible(true)}} style={{paddingBottom:10}}>
            <Text style={{fontSize:18,color:"#012554", textDecorationLine:"underline",fontWeight:"700"}}>Learn how</Text>
            </TouchableOpacity>
            <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:15, marginBottom:15}}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#012554",paddingRight:25,paddingLeft:25 }}
              onPress={() => {
                setBlueToothON(!blueToothOFF);
              }}>
              <Text style={styles.textStyle}>Try Again</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
      <BleStatusModal status={bleModal} hideModal={hideBleModal} containerStyle={containerStyle}/>
    </>)
}

const styles = StyleSheet.create({

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 4,
    padding: 10,
    elevation: 2
  },
  modalStyle:{
    alignSelf:"center",
    fontSize:15,
    paddingBottom:5
  }
});