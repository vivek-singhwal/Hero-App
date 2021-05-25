import React,{ useEffect, useState } from 'react';
import { ScrollView, Image, TouchableOpacity,Text, View, Modal, StyleSheet,TouchableHighlight} from 'react-native';
import {updateSessionsDetail} from '../services/DBService';
import SubSession from './AddSession';
import DeleteSessionModal from './DeleteSessionModal';
export default EditSession=({ route , navigation})=>{
    const { id, comment,images,location } = route.params;
    if( images == null && typeof(images) != 'object' ){
      images = []; //default images init
    }
    // console.log(">>comment "+JSON.stringify(route.params))
    const [commentText, setCommentText] = useState(comment);
    const [locationText, setLocationText] = useState(location);
    const [imageList, setImageList] = useState(images);
    const [deleteModal, setDeleteModal] = useState(false);
    var updateDetails=() =>{
        console.log(">> updateDetails: ",imageList);
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
            <SubSession locationText={locationText} setLocationText={setLocationText} 
            commentText={commentText} setCommentText={setCommentText} 
            imageList={imageList} setImageList={setImageList}/>
            <View style={{flexDirection:"row",justifyContent:"space-around",paddingBottom:20}}>
                <TouchableOpacity onPress={()=>{setDeleteModal(true)}} style={{borderWidth:1,width:"35%", height:40,justifyContent:"center",borderColor:"red"}}><Text style={{alignSelf:"center",fontSize:17,color:"red"}}>Delete</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>updateDetails()} style={{borderWidth:1,width:"35%",height:40,justifyContent:"center",backgroundColor:"#012554" }}><Text style={{alignSelf:"center",fontSize:17,color:"white"}}>Save</Text></TouchableOpacity>
            </View>
    </ScrollView>
    <DeleteSessionModal deleteSucess={()=>{navigation.navigate('HomePage');}} sessionId={id} deleteModal={deleteModal} setDeleteModal={setDeleteModal}/>
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