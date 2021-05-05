import React from 'react';
import { View, TextInput as Input,Linking,TouchableHighlight,StyleSheet ,Image} from 'react-native';
import { Text ,Modal} from 'react-native-paper';

export default BleStatusModal  = ({status,hideModal,containerStyle})=>{
    return(<Modal visible={status} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <View style={{alignSelf:"center",width:"95%",paddingTop:10,paddingBottom:10}}>
        <Text style={styles.modalStyle}>Your mobile device's Bluetooth is</Text>
        <Text style={styles.modalStyle}>turned OFF.</Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.modalStyle}>Please open your device settings</Text>
        <Text style={styles.modalStyle}>and turn bluetooth ON, then return</Text>
        <Text style={styles.modalStyle}>to the Scout ES app.</Text>
        {/* <View style={{height:200,backgroundColor:"gray", marginTop:10}}/> */}
        <Image source={require('../asset/bleStatus.png')} style={{alignSelf:"center",marginTop:10,height:"45%",width:"80%",borderWidth:0.7,borderColor:"gray"}}/>
          <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#012554",width:170,alignSelf:"center",marginTop:20, }}
              onPress={() => {
                Linking.openURL('App-Prefs:Bluetooth');
                // setVisible(false);
                hideModal()
              }}>
              <Text style={[styles.modalStyle,{color: "white",fontWeight: "bold",textAlign: "center"}]}>Open Settings</Text>
            </TouchableHighlight>
          </View>
      </Modal>)
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