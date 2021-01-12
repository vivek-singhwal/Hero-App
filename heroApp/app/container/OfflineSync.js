import React,{useEffect,useState} from 'react';
import {BluetoothStatus} from 'react-native-bluetooth-status';

export default OfflineSync = () =>{

    // var interval = setInterval(()=> {
    //    console.log('Hello')
    // },1000)
    var handleBtChanges =(btState)=>{
        console.log(">btState ",btState)
      }
    useEffect(()=>{
    //    let btListner = BluetoothStatus.addListener(({ eventType, status }) => {
    //        console.log(">>status ",status,eventType)
        
    // })
        // return ()=>{
        //     clearInterval(interval);
        // }   
        // return ()=>{
        //     BluetoothStatus.removeListener(btListner)
        // }
    })
    return(<>
    </>)


}