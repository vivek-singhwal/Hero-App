import React,{useEffect,useState} from 'react';
import { View , StyleSheet, Text, TouchableOpacity, TextInput as Input,ScrollView} from 'react-native';
import { Button, Switch, ProgressBar, Modal, Portal, Provider, TextInput } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import {getReadingStatus,setReadingStatus} from '../services/DataService';

export default  HomePage = ()=>{

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {backgroundColor: 'white', padding: 20};
  const [readingStatus,setReadStatus] = useState(getReadingStatus);
    const [isSwitchEleOn, setIsSwitchEleOn] = useState(false);
    const [isSwitchTrgOn, setIsSwitchTrgOn] = useState(false);
    const onToggleEleSwitch = () => setIsSwitchEleOn(!isSwitchEleOn);
    const onToggleTrgSwitch = () => setIsSwitchTrgOn(!isSwitchTrgOn);
    const toggleSetReading = () => setReadStatus(preState=>!preState);

  const SaveModal = () => {
    const [locationText, setLocationText] = useState('');
    const [commentText, setCommentText] = useState('');
    const [textFocused,setTextFocused] = useState(false);
    return (
      <Provider>
        <Portal>
          <Modal visible={visible} dismissable={false} contentContainerStyle={containerStyle}>
            <View style={{flexDirection:"column"}}>
            <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:10}}>Location</Text>
            <TextInput
              theme={{ colors: { primary: '#012554',underlineColor:'transparent',}}}
              style={{paddingBottom:20,backgroundColor:"white"}}
              mode={'outlined'}
              value={locationText}
              placeholder={'Where did you spray?'}
              onChangeText={text => setLocationText(text)}
            />
            <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:16}}>Comments</Text>
           
            <TouchableOpacity
              activeOpacity={1}
              onPress={()=>this.input.focus()}>
              <View style={{borderColor:textFocused?'#012554':'gray',borderWidth:1.8,height:200,borderRadius:5}}>
                    <Input
                        onFocus={()=> setTextFocused(true)}
                        onBlur={()=> setTextFocused(false)}
                        placeholder={'Notes?'}
                        style={{padding:10,marginTop:5,fontSize:16}}
                        multiline={true}
                        value={commentText}
                        onChangeText={text => setCommentText(text)}
                        ref = {(input) => this.input = input}
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
              onPress={hideModal}>
              Back
            </Button>
             
             <Button 
              color={'#012554'}
              mode={'contained'}
              disabled={commentText && locationText && commentText !== "" && locationText !== ""?false:true}
              labelStyle={{fontSize:16}} 
              icon={props=><Material 
                size={35}
                color={'#fff'}
                name="keyboard-arrow-right"/>}
              contentStyle={{flexDirection:"row-reverse",paddingTop:1}}
              onPress={hideModal}>
               End
             </Button>

          </View>
          </Modal>
         
        </Portal>
      </Provider>
    );
  };
  
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
            <View style={{bottom:79,}}>
            <Button 
            icon={props=><AwesomeIcon name={readingStatus?'stop-circle':"play-circle"} 
              size={115}
              color={'#012554'}
              style={{paddingTop:25}}/>} 
            // mode="contained" 
            // style={[style.circle,{bottom:50}]}
            onPress={() => {
              showModal();
              setReadingStatus(!readingStatus);
              toggleSetReading();
            }}/>
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
  <SaveModal/>
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