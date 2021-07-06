import React,{ useState,useEffect } from 'react';
import { View,  Text, TouchableOpacity,ScrollView,TouchableHighlight, TextInput as Input, Image,FlatList, Modal,StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {launchImageLibrary, launchCamera } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { EventRegister } from 'react-native-event-listeners';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const DeleteImageModal = ({modalVisible,setModalVisible,photoDelete}) => {
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        }}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: 'rgba(100,100,100, 0.5)',
          padding: 40,
        }}>
          <View style={styles.modalView}>
           <AwesomeIcon name="trash" size={29} color="red" />
            <Text style={styles.modalText}>Are you sure you want to delete this photo?</Text>
          <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:35,marginBottom:15}}>
            <TouchableOpacity
              style={{ ...styles.openButton,backgroundColor: "#fff",marginRight:10 ,borderColor:'#012554',borderWidth:1}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={[styles.textStyle,{color:'#012554'}]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "red" }}
              onPress={() => {
                if(typeof(photoDelete[0]) == 'function'){
                  photoDelete[0]();
                }
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default SubSession =({locationText,setLocationText,commentText,setCommentText, imageList, setImageList})=>{
    var inputBox;
    var photoDeleteFunArr = [];
    const [textFocused,setTextFocused] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [indexVal, setIndexVal] = useState(0);
    const [deletePhotoModalVisible, setDeletePhotoModalVisible] = React.useState(false);
    const [photoDeleteArray, setPhotoDeleteArray] = React.useState(photoDeleteFunArr);
    useEffect(()=>{
      let unsubscribe = EventRegister.addEventListener('OPEN_CAMERA', (value) => {
        if(value.cmd == "camera"){
          addImages("launchCamera");
        }else{
          addImages("launchImageLibrary");
        }
       });
       return ()=>{
        EventRegister.removeEventListener(unsubscribe);
      }
    });
    var getIndexVal=(index)=>{
      if(imageList.length == 3 || imageList.length == 6 || imageList.length == 9){
        return imageList.length - 3 == index;
      }else{
        return imageList.length - 1 == index;
      } 
    }
    var emptyList = ()=>{
      return(
       <TouchableOpacity onPress={()=>{ openCameraOption() }} 
          style={{borderColor:'#012554',borderWidth:1,width:95,height:90,justifyContent:"center"}}>
            <MaterialIcons name="add" color={'#012554'} size={35} style={{alignSelf:"center"}}/>
        </TouchableOpacity>
      )
    }
    
    var openCameraOption = ()=>{
      EventRegister.emit('SELECT_CAMERA', { cmd: 'openModal' });
    }
    var addImages = (funcName) =>{
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images'
        },
      };
    if(funcName == "launchImageLibrary"){
     launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          // console.log(">Resp",JSON.stringify(response));
          ImageResizer.createResizedImage(response.uri, 1000, 1000, 'JPEG', 50)
          .then(respImg => {
             console.log(">response compressed  img 01",respImg);
              let tempList = [...imageList];
              tempList.push(respImg.uri)
              setImageList(tempList);
          })
          .catch(err => {
           console.log(err);
          });
        }
      });
    } else {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          // console.log(">Resp",JSON.stringify(response));
          ImageResizer.createResizedImage(response.uri, 1000, 1000, 'JPEG', 50)
          .then(respImg => {
             let tempList = [...imageList];
              tempList.push(respImg.uri)
              setImageList(tempList);
          })
          .catch(err => {
           console.log(err);
          });
        }
      });
      }
    }
    if(imageList != null && typeof imageList.map != 'undefined' ){
      imageList.map((item)=>{
        console.log("Image Item::"+JSON.stringify(item));
      });
    }
  return <>
    <View style={{padding:25}}>
    <DeleteImageModal modalVisible={deletePhotoModalVisible} setModalVisible={setDeletePhotoModalVisible} photoDelete={photoDeleteArray}/>
       <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:5}}>Location*</Text>
              <Input placeholder={'Where did you spray?'}
              style={{padding:10,marginTop:5,fontSize:16,borderWidth:1,paddingRight:10,borderColor:'#012554',borderRadius:4}}
              defaultValue={locationText}
              onChangeText={text => { setLocationText(text)}}
              />
              <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:16,marginTop:10}}>Comments</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={()=>inputBox.focus()}>
              <View style={{borderColor:textFocused?'#012554':'gray',borderWidth:1.8,height:100,borderRadius:5}}>
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
            <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:10,paddingTop:15}}>Photos</Text>
            <ScrollView style={{borderColor:textFocused?'#012554':'gray',borderWidth:1.8,height:350,borderRadius:5,padding:8}}>
            <FlatList
            scrollEnabled={false}
            numColumns={3}
            data={imageList}
            ListEmptyComponent={emptyList}
            keyExtractor={(item, index) => String(item.id + index)}
            contentContainerStyle={{justifyContent: 'flex-start',marginBottom:20,width:"90%"}}
            renderItem={({item,index})=>
                <View key={index} style={{width:"32%", margin:7,flexDirection: imageList.length == 3 || imageList.length == 6 || imageList.length == 9?'column':'row' }}>
                  <View>
                    <Entypo color={'gray'} 
                      onPress={()=>{
                        let deleteImage = () =>{
                          console.log(">> deleteImage");
                          let tempList = [...imageList];
                          tempList.splice(index,1);
                          setImageList(tempList);
                          setIndexVal(index);
                        }
                        setPhotoDeleteArray([deleteImage]);
                        setDeletePhotoModalVisible(true)
                        //EventRegister.emit('DELETE_PHOTO',{callback:deleteImage})                        
                      }} 
                      name="circle-with-cross" 
                      size={25} 
                      style={{position:"absolute",top:-8, right:(imageList.length == 3 || imageList.length == 6 || imageList.length == 9)?0:-9 ,alignSelf:"flex-end",zIndex:1,backgroundColor:"#fff",borderRadius:15,overflow: 'hidden',}}/>
                    <Image style={{width:85,height:90,borderColor:'#012554',borderWidth:1}} source={{uri:item}}/>
                  </View>
                  { imageList.length < 12 && getIndexVal(index) && <TouchableOpacity onPress={()=>{
                    openCameraOption()
                  }} style={(imageList.length == 3 || imageList.length == 6 || imageList.length == 9)?{marginTop:15,borderColor:'#012554',borderWidth:1,width:85,height:90,justifyContent:"center"}:{marginLeft:22,borderColor:'#012554',borderWidth:1,width:85,height:90,justifyContent:"center"}}>
                      <MaterialIcons name="add" color={'#012554'} size={35} style={{alignSelf:"center"}}/>
                    </TouchableOpacity>}
                </View>
           }
         />
            </ScrollView>
    </View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: 'rgba(100,100,100, 0.5)',
          padding: 40,
        }}>
          <View style={styles.modalView}>
            <FontAwesome name="trash" size={30} color={'red'}/>
            <Text style={[styles.modalText,{fontSize:16}]}>Are you sure you want to {'\ndelete this Photo ?'}</Text>
            <Text style={[styles.modalText,{fontSize:16}]}>{'This cannot be undone.'}</Text>
          <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:35, marginBottom:15}}>
            <TouchableHighlight
              style={{ ...styles.openButton,backgroundColor: "#fff",marginRight:10 ,borderColor:'#012554',borderWidth:1}}
              onPress={() => {
                // EventRegister.emit('BLECMD',{cmd:'disconnect'}) 
                setmodalVisible(!modalVisible);
              }}>
              <Text style={[styles.textStyle,{color:'#012554'}]}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "red",paddingRight:18, paddingLeft:18 }}
              onPress={() => {
                    let tempList = [...imageList];
                    tempList.splice(indexVal,1);
                    setImageList(tempList);
                    setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
    </>
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  modalView: {
    margin: 20,
    backgroundColor:"black",
    backgroundColor: "white",
    borderRadius: 4,
    padding: 15,
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
    marginTop: 20,
    textAlign: "center"
  }
});