import React,{useEffect,useState} from 'react';
import { View , StyleSheet, Text} from 'react-native';
import { Button, Switch, ProgressBar } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Ionicons';
export default  HomePage = ()=>{
    const [readingStatus,setReadingStatus] = useState(false);
    const [isSwitchEleOn, setIsSwitchEleOn] = React.useState(false);
    const [isSwitchTrgOn, setIsSwitchTrgOn] = React.useState(false);

    const onToggleEleSwitch = () => setIsSwitchEleOn(!isSwitchEleOn);
    const onToggleTrgSwitch = () => setIsSwitchTrgOn(!isSwitchTrgOn);

    const toggleSetReading = () =>  setReadingStatus(preState=>!preState);
    return(<>
    <View style={{height:"100%"}}>
      <View style={{flex:1,flexDirection:"column",height:"100%",justifyContent:"space-between",backgroundColor:"#F7F9FA"}}>
          <View>
            {readingStatus? <View style={{padding:18}}>
                   <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:20,width:"100%"}}>
                    <Text style={{fontSize:20}}>Electrostatic</Text>
                    <Switch value={isSwitchEleOn} onValueChange={onToggleEleSwitch} color={'#012554'}/>
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:20}}>
                    <Text style={{fontSize:20}}>Trigger Lock</Text>
                    <Switch value={isSwitchTrgOn} onValueChange={onToggleTrgSwitch} color={'#012554'}/>
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",paddingBottom:20}}>
                    <Text style={{fontSize:20,}}>Battery</Text>
                    <Text style={{fontSize:18,}}>90%</Text>
                   </View>
                   <ProgressBar style={{height:10}} progress={0.8} color={'#012554'} />
                </View>: <View style={{backgroundColor:"#012554",padding:35}}>
                <Text style={{color:"#fff",alignSelf:"center",fontSize:18,paddingBottom:5}}>Your spray history will show up here.</Text>
                <Text style={{color:"#fff",alignSelf:"center",fontSize:18}}>Begin a new route to ge started.</Text>
              </View>}
          </View>
          <View style={{backgroundColor:"#fff",width:"100%",flexDirection:"row",justifyContent:"space-around"}}>
            <View style={{marginTop:20,width:"33%"}}>
              <Button
              icon={props=><Feather size={35} name="settings-sharp" 
              />}/>
            </View>
            <View>
            <Button 
            icon={props=><AwesomeIcon name={readingStatus?'stop':"play"} 
            size={45}
            color={'#fff'}
            style={{paddingTop:25,marginLeft:!readingStatus?25:17}}
            />} mode="contained" 
            style={[style.circle,{bottom:50}]}
            onPress={() => toggleSetReading()}/>
          </View>
          <View style={{marginTop:20,width:"33%"}}>
            {readingStatus? <View/>:<Button
              icon={props=><AwesomeIcon5 
                              size={35}
                              color={'#2C88D9'}
                              name="recycle"/>}/>}
            </View>
                              
        </View>
      </View>
  </View>
    </>)
}

const style =StyleSheet.create({
    circle: {
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      backgroundColor: "#012554",
    },
  });