import React,{ useState } from 'react';
import { View , StyleSheet, Text, Modal, TextInput as Input,TouchableHighlight } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {delsession} from '../services/DBService';

export default DeleteSessionModal = ({deleteSucess,sessionId,deleteModal,setDeleteModal}) => {
    return(<Modal
        animationType="slide"
        transparent={true}
        visible={deleteModal}
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
            <AwesomeIcon name="trash" size={30} color={'red'}/>
            <Text style={[styles.modalText,{fontSize:16}]}>Are you sure you want to {'\ndelete this session ?'}</Text>
            <Text style={[styles.modalText,{fontSize:16}]}>{'This cannot be undone.'}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:35, marginBottom:15}}>
            <TouchableHighlight
              style={{ ...styles.openButton,backgroundColor: "#fff",marginRight:10 ,borderColor:'#012554',borderWidth:1}}
              onPress={() => {
                // EventRegister.emit('BLECMD',{cmd:'disconnect'}) 
                setDeleteModal(!deleteModal);
              }}>
              <Text style={[styles.textStyle,{color:'#012554'}]}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "red",paddingRight:18, paddingLeft:18 }}
              onPress={() => {
                  console.log(">Indx val"+sessionId);
                  if(sessionId){
                    // delsession(sessionId).then(()=>{
                        deleteSucess();
                    // })
                  }
                 
                  setDeleteModal(!deleteModal);
              }}>
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>)
}

const styles = StyleSheet.create({
    circle: {
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      backgroundColor: "#012554",
    },
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