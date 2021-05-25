import React,{ useEffect, useState } from 'react';
import { View , StyleSheet, Text, TouchableOpacity, TextInput as Input,ScrollView, Image} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Modal, Portal, Provider } from 'react-native-paper';
import { launchCamera ,launchImageLibrary} from 'react-native-image-picker';
import { uploadImage } from '../services/apiService';
import { apiEndPoint } from '../services/constants';
import ImageResizer from 'react-native-image-resizer';

 export default SaveModal = ({locationImg,setLocationImg,addSessionList,setLocationText,locationText,commentText,setCommentText,visible,hideModal,SetReadingStatus}) => {
  var inputBox;
    const [textFocused,setTextFocused] = useState(false);
    const [isClickable,setIsClickable] = useState(false);
    
  //  const [imageUri,setImageUri] = useState('');
    const containerStyle = {backgroundColor: 'white', padding: 20};
   var openlaunchCamera = () => {
     console.log("Here")
      let options = {
        
        storageOptions: {
          skipBackup: true,
          path: 'images'
        },
      };
      launchImageLibrary(options,(response)=>{
        console.log('Response = ', response);

      })
      // return
      launchCamera(options, (response) => {
        console.log('Response = ', response);
        setIsClickable(false);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          console.log(">Resp",JSON.stringify(response));
          ImageResizer.createResizedImage(response.uri, 1000, 1000, 'JPEG', 50)
          .then(respImg => {
            // console.log(">response compressed  img ",respImg);
            uploadImage(respImg).then((resp)=>{
                console.log(">Re  sp",JSON.stringify(resp));
                if(resp.image){
                  let imageuri = resp.image.replace('/opt/data/','');
                // setImageUri(imageuri);
                setLocationImg(imageuri);
                setIsClickable(true);
            }
          })
         })
        .catch(err => {
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
        });
       }
      });
      return
    }
    return (
      <Provider>
        <Portal>
          <Modal visible={visible} dismissable={false} contentContainerStyle={containerStyle}>
          <ScrollView keyboardShouldPersistTaps='never'>
            <View style={{flexDirection:"column"}}>
            <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:5}}>Upload spread area picture</Text>
            <TouchableOpacity onPress={()=>openlaunchCamera()} style={{flexDirection:"row",justifyContent:"space-between",padding:10,marginTop:5,fontSize:16,borderWidth:1,paddingRight:10,borderColor:'#012554',borderRadius:4}}>
                <Text style={{alignSelf:"center",fontSize:18}}>Capture image</Text>
                <MaterialCom 
                size={30}
                color={'#012554'}
                name="camera-plus"/>
              </TouchableOpacity>
             { locationImg != "" && <Image style={{height:200,borderColor:'gray',borderWidth:1,marginTop:10}} source={{uri:apiEndPoint+'/'+locationImg}}></Image> } 
            <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:16,marginTop:10}}>Comments</Text>
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
              disabled={locationImg && locationImg !== ""?!isClickable?true:false:true}
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
  