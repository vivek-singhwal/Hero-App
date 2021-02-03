import React,{useEffect,useState} from 'react';
import { View , StyleSheet, Text, TouchableOpacity, TextInput as Input,ScrollView, Keyboard} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import { Button, Switch, ProgressBar, Modal, Portal, Provider, TextInput } from 'react-native-paper';

 export default SaveModal = ({addSessionList,setLocationText,locationText,commentText,setCommentText,visible,hideModal,SetReadingStatus}) => {
  var inputBox;
    const [textFocused,setTextFocused] = useState(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    return (
      <Provider>
        <Portal>
          <Modal visible={visible} dismissable={false} contentContainerStyle={containerStyle}>
          <ScrollView keyboardShouldPersistTaps='never'>
            <View style={{flexDirection:"column"}}>
            <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:10}}>Location</Text>
            {/* <TextInput
              theme={{ colors: { primary: '#012554',underlineColor:'transparent',}}}
              style={{paddingBottom:20}}
              mode={'outlined'}
              defaultValue={locationText}
              placeholder={'Where did you spray?'}
              onChangeText={text => setLocationText(text)}
            /> */}
            <Input
                        onFocus={()=> setTextFocused(true)}
                        onBlur={()=> setTextFocused(false)}
                        placeholder={'Where did you spray?'}
                        style={{padding:10,marginTop:5,fontSize:16,borderWidth:1,paddingRight:10,borderColor:'#012554',borderRadius:4}}
                        // multiline={true}
                        defaultValue={locationText}
                        onChangeText={text => setLocationText(text)}
                        // ref = {(input) => this.input = input}
                    />
            <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:16}}>Comments</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={()=>inputBox.focus()}>
              <View style={{borderColor:textFocused?'#012554':'gray',borderWidth:1.8,height:200,borderRadius:5}}>
                    <Input
                        onFocus={()=> setTextFocused(true)}
                        onBlur={()=> setTextFocused(false)}
                        placeholder={'Notes?'}
                        style={{padding:10,marginTop:5,fontSize:16}}
                        multiline={true}
                        defaultValue={commentText}
                        onChangeText={text => setCommentText(text)}
                        ref = {(input) => inputBox = input}
                    />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-around",marginTop: 30,}}>
              <Button 
              color={'#012554'}
              labelStyle={{fontSize:16}} 
              icon={props=><Material 
                size={35}
                color={'#012554'}
                name="keyboard-arrow-left"/>}
              mode={'outlined'} 
              contentStyle={{paddingTop:1,paddingRight:5,}}
              onPress={()=>{
                hideModal();
                SetReadingStatus(true);
                // SetReadingStatus(false);
                }}>
              Back
            </Button>
             
             <Button 
              color={'#012554'}
              mode={'contained'}
              disabled={locationText && locationText !== ""?false:true}
              labelStyle={{fontSize:16}} 
              icon={props=><Material 
                size={35}
                color={'#fff'}
                name="keyboard-arrow-right"/>}
              contentStyle={{flexDirection:"row-reverse",paddingTop:1}}
              onPress={()=>{
                SetReadingStatus(false);
                hideModal();
                addSessionList(commentText,locationText);
              }}
              >
               End
             </Button>

          </View>
          </ScrollView>
          </Modal>
         
        </Portal>
      </Provider>
    );
  };
  