import React,{ useEffect, useState } from 'react';
import { View , StyleSheet, Text, TouchableOpacity, TextInput as Input,ScrollView, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default SubSession =()=>{
    var inputBox;
    const [textFocused,setTextFocused] = useState(false);
    return <>
    <View style={{padding:25}}>
       <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:5}}>Location*</Text>
       <Input
                        // onFocus={()=> setTextFocused(true)}
                        // onBlur={()=> setTextFocused(false)}
                        placeholder={'Where did you spray?'}
                        style={{padding:10,marginTop:5,fontSize:16,borderWidth:1,paddingRight:10,borderColor:'#012554',borderRadius:4}}
                        // defaultValue={locationText}
                        // onChangeText={text => setLocationText(text)}
                        // ref = {(input) => this.input = input}
                    />
              <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:16,marginTop:10}}>Comments</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={()=>inputBox.focus()}>
              <View style={{borderColor:textFocused?'#012554':'gray',borderWidth:1.8,height:130,borderRadius:5}}>
                    <Input
                        onFocus={()=> setTextFocused(true)}
                        onBlur={()=> setTextFocused(false)}
                        placeholder={'Notes?'}
                        style={{padding:10,marginTop:5,fontSize:16}}
                        multiline={true}
                        // defaultValue={commentText}
                        // onChangeText={text => setCommentText(text)}
                        ref = {(input) => inputBox = input}
                    />
              </View>
            </TouchableOpacity>
            <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:10,paddingTop:15}}>Photos</Text>
            <View style={{borderColor:textFocused?'#012554':'gray',borderWidth:1.8,height:400,borderRadius:5}}>
              <TouchableOpacity style={{borderColor:'#012554',borderWidth:1,width:80,height:80,justifyContent:"center",margin:10}}>
                 <MaterialIcons name="add" color={'#012554'} size={35} style={{alignSelf:"center"}}/>
              </TouchableOpacity>
            </View>
    </View>
    </>
}