
import React,{useEffect,useState} from 'react';
import { View , StyleSheet, Text, TextInput as Input,Image, Alert, BackHandler} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Button, Switch, ProgressBar, Modal, Portal, Provider, TextInput } from 'react-native-paper';
export default TestPage = () =>{

    return(<>
  <Button onPress={()=>{
      EventRegister.emit('BLECMD',{event:'test'})
      console.log(">>press ");
  }} icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
    </>)
}