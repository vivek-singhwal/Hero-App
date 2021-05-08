import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,Image} from 'react-native';
import { getSessionByIdSync } from '../services/DBService';
export default EditScreen = ({route}) =>{
    const { id } = route.params;
    const [session,setSession] = useState({})
    useEffect(()=>{
        getSessionByIdSync(id).then((resSession)=>{
            console.log(">>resSession "+id,resSession);
        })
    })
    return(<>
    <Text>{id}</Text>
    </>)
}