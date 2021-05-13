import React,{ useEffect, useState } from 'react';
import { ScrollView, Image, TouchableOpacity,Text, View, Modal, StyleSheet,TouchableHighlight} from 'react-native';
import {updateSessionsDetail} from '../services/DBService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SubSession from './AddSession';

export default EditSession=({ route , navigation})=>{
    const { id, comment,images,location } = route.params;
    // console.log(">>comment "+JSON.stringify(route.params))
    const [commentText, setCommentText] = useState(comment);
    const [locationText, setLocationText] = useState(location);
    const [imageList, setImageList] = useState(images);
    const [modalVisible,setModalVisible] = useState(false);
    var updateDetails=() =>{
        let sessionObj = {
            sessionLocation: locationText,
            sessionComment:commentText,
            isSync:0,
            locationImages: JSON.stringify(imageList),
            id:id,
        }
        updateSessionsDetail(sessionObj).then((resDetail)=>{
            navigation.navigate('SessionDetail');
        })
    }
  return(
  <>
  <ScrollView>
            <SubSession locationText={locationText} setLocationText={setLocationText} commentText={commentText} setCommentText={setCommentText} imageList={imageList} setImageList={setImageList}/>
            <View style={{flexDirection:"row",justifyContent:"space-around",paddingBottom:20}}>
                <TouchableOpacity onPress={()=>{setModalVisible(true)}} style={{borderWidth:1,width:"35%", height:40,justifyContent:"center",borderColor:"red"}}><Text style={{alignSelf:"center",fontSize:17,color:"red"}}>Delete</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>updateDetails()} style={{borderWidth:1,width:"35%",height:40,justifyContent:"center",borderColor:"#012554"}}><Text style={{alignSelf:"center",fontSize:17,color:"#012554"}}>Save</Text></TouchableOpacity>
            </View>
    </ScrollView>
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
            <Text style={[styles.modalText,{fontSize:16}]}>Are you sure you want to {'\ndelete this spray session?'}</Text>
            <Text style={[styles.modalText,{fontSize:16}]}>{'This cannot be undone.'}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:35, marginBottom:15}}>
            <TouchableHighlight
              style={{ ...styles.openButton,backgroundColor: "#fff",marginRight:10 ,borderColor:'#012554',borderWidth:1}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={[styles.textStyle,{color:'#012554'}]}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "red",paddingRight:18, paddingLeft:18 }}
              onPress={() => {
                    // console.log(">Indx val"+indexVal);
                    // let tempList = [...imageList];
                    // tempList.splice(indexVal,1);
                    // setImageList(tempList);
                    setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
    </>
    )
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