import React,{useEffect,useState} from 'react';
import { View, TextInput as Input } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';

export default OperatorProfile= () =>{
    const [textFocusedName,setTextFocusedName] = useState(false);
    const [textFocusedChem,setTextFocusedChem] = useState(false);

    const [opName,setOpName] = useState('');
    const [opCompany,setOpCompany] = useState('company');
    const [opChem,setOpChem] = useState('');

    return(<>
    <View style={{width:"100%",height:"100%",marginTop:"30%"}}>
      <View style={{flexDirection:"column",justifyContent:"center"}}>

        <Avatar.Icon 
        size={155} 
        style={{backgroundColor:'#DFE6ED',marginBottom:50,alignSelf:"center"}}
        icon={props=><AwesomeIcon5 
                    size={45}
                    color={'#9EADBA'}
                    name="user-alt"/>} />
        <View style={{marginBottom:20,alignSelf:"center"}}>
        
        <View style={{ marginBottom:40,borderColor:textFocusedName?'#012554':'gray',borderWidth:1.8,height:40,borderRadius:5,width:250,alignSelf:"center"}}>
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
            <View style={{marginBottom:40, borderColor:textFocusedChem?'#012554':'gray',borderWidth:1.8,height:40,borderRadius:5,width:250,alignSelf:"center"}}>
               <Input onFocus={()=> setTextFocusedChem(true)}
                        onBlur={()=> setTextFocusedChem(false)}
                        placeholder={'Chemistry'}
                        style={{padding:10,marginTop:1,fontSize:20}}
                        value={opChem}
                        onChangeText={text => setOpChem(text)}
                    />
            </View>
            <Button 
              color={'#012554'}
              mode={'contained'}
              disabled={opChem && opCompany && opName && opName !== "" && opChem !== "" && opCompany !== "company"?false:true}
              labelStyle={{fontSize:16}} 
              icon={props=><Material 
                size={35}
                color={'#fff'}
                name="keyboard-arrow-right"/>}
              contentStyle={{flexDirection:"row-reverse",paddingTop:1,height:47}}
            //   onPress={hideModal}
              >
               Connect
             </Button>
        </View>
      </View>
    </View>
    </>)
}