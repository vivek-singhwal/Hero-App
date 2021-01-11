import React,{useEffect,useState} from 'react';
import { View, TextInput as Input,ScrollView, Alert, KeyboardAvoidingView,  StyleSheet,TouchableHighlight} from 'react-native';
import { Avatar, Button,Text ,Modal} from 'react-native-paper';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import { getOperators, initDB , addOperator,delOperator, updateServerId } from '../services/DBService';
import { setOperatorData,getOperatorData } from '../services/DataService';
import { getOperatorAPI,addOperatorAPI } from '../services/apiService';

export default OperatorProfile= ({navigation}) =>{
    const [count,setCount] = useState(true);
    const [deviceStatus, setDeviceStatus] = useState('');
    const [isDeviceConnected, setisDeviceConnected] = useState(false);
    const [textFocusedName,setTextFocusedName] = useState(false);
    const [textFocusedChem,setTextFocusedChem] = useState(false);
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 10,width:"60%",alignSelf:"center",borderRadius:4};

    const [opName,setOpName] = useState('');
    const [opCompany,setOpCompany] = useState('company');
    const [opChem,setOpChem] = useState('');

    useEffect(()=>{
        if(count){
          initDB('operators').then((res)=>{

          // check and operator with api
            // console.log(">>Res ",res);
            getOperators().then((result)=>{
                console.log(">result ",result);
                if(result && result.length > 0){
                 
                  var operatorDat =  JSON.parse(JSON.stringify(result[0]));
                  // console.log("addOperatorAPI" ,operatorDat.name, result[0].opName);
                  var operatorObj = {
                    opName: operatorDat.opName,
                    company: operatorDat.company,
                    chemistryType: operatorDat.chemistryType
                  }
                  if(result[0].serverId == null){
                    
                    addOperatorAPI(operatorObj).then((resOperator)=>{
                    
                      if(resOperator.result){
                       
                        updateServerId('operators',resOperator.result.id).then((setOpData)=>{
                          var opObj = {"chemistryType": operatorDat.chemistryType, "company": operatorDat.company, "opName": operatorDat.opName, "serverId": resOperator.result.serverId}
                          setOperatorData(opObj);
                          // navigation.navigate('FirstConnection')
                        })
                      }
                    
                    })
                  }
                  // console.log("addOperatorAPI" ,operatorDat.name, result[0].opName);
                  var opObj = {"chemistryType": operatorDat.chemistryType, "company": operatorDat.company, "opName": operatorDat.opName, "serverId": operatorDat.serverId}
                  setOperatorData(opObj);
                  // console.log(getOperatorData())
                  navigation.navigate('FirstConnection')
                }
               
            })
          });
       
        setCount(false);
        }
    })

    var addRecord = ()=>{
      // delOperator(0).then((data)=>{
      //   console.log(">Data ",data);
      // })
      // getOperators().then((result)=>{
      //   console.log(">result ",result);
      // })
      if(opName !== "" && opChem !== ""){
        var operatorObj = {
          opName:opName,
          company:opCompany,
          chemistryType:opChem
        }
        console.log(">>opName ",opChem,opName,opCompany)
        addOperatorAPI(operatorObj).then((resOperator)=>{
          operatorObj.serverId = resOperator.id;
          addOperator(operatorObj).then((data)=>{
            console.log(">Data ",operatorObj,data);
            var opObj = {"chemistryType": opChem, "company": opCompany, "opName": opName, "serverId": data.result.id}
            setOperatorData(opObj);
            navigation.navigate('FirstConnection')
        })
        })
      }else{
        setVisible(true);
        // Alert.alert('HeroApp','Please provide valid info.');

      }
    }

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    return(<>
    <View style={{marginTop:"15%",height:"100%"}}>
    {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset} style={{flexDirection:"column",justifyContent:"center"}}>
        <Avatar.Icon 
        size={155} 
        style={{backgroundColor:'#DFE6ED',marginBottom:50,alignSelf:"center",}}
        icon={props=><AwesomeIcon5 
                    size={45}
                    color={'#9EADBA'}
                    name="user-alt"/>} />
        <View style={{marginBottom:20,alignSelf:"center"}}>
        
        <View style={{ marginBottom:40,borderColor:textFocusedName?'#012554':'gray',borderWidth:1.8,height:45,borderRadius:5,width:250,alignSelf:"center"}}>
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
            <View style={{marginBottom:40, borderColor:textFocusedChem?'#012554':'gray',borderWidth:1.8,height:45,borderRadius:5,width:250,alignSelf:"center"}}>
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
      </KeyboardAvoidingView>
      
      
      {/* </ScrollView> */}
    </View>
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <View style={{alignSelf:"center",height:100,width:"90%"}}>
        <Text>Please provide:{}</Text>
          {opName == "" && <Text style={{fontWeight:"bold"}}>Name</Text>}
          {opChem == "" && <Text style={{fontWeight:"bold"}}>Chemistry</Text>}
          
          <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#012554",width:70,alignSelf:"center",marginTop:20 }}
              onPress={() => {
                setVisible(false)
              }}>
              <Text style={styles.textStyle}>OK</Text>
            </TouchableHighlight>
            </View>
        </Modal>
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
});
