import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,Image} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Prompt from 'react-native-input-prompt';
import { EventRegister } from 'react-native-event-listeners';

export default function Settings({navigation}){
  const [sprayOnOff, setsprayOnOff] = useState(false);
  const [esvOnOff, setesvOnOff] = useState(false);
  const [sprayInOz, setsprayInOz] = useState(false);
  const [isPrompt, setisPrompt] = useState(false);

  useEffect(()=>{
   
  return ()=>{
  }
  });
    var doSprayButton = (onOff) =>{
      if(onOff){
        EventRegister.emit('BLECMD', { cmd:'sprayEnable'});
        setsprayOnOff(true);
      }else{
        EventRegister.emit('BLECMD', { cmd:'sprayDisable'});
        setsprayOnOff(false);
      }
    }
    return ( 
        <View style={styles.container}>
             <Prompt
                visible = {isPrompt}
                title="Input "
                placeholder="Enter Value"
                onCancel={() =>
                  setisPrompt(!isPrompt)
                }
                onSubmit={text =>
                  setisPrompt(!isPrompt)
                }
            />
          <View style={styles.buttonContainer}>
              <View style={{justifyContent:'center',flexDirection:'row'}}>
              <TouchableOpacity 
                        onPress={() => 
                        {
                          //setsprayOnOff(!sprayOnOff);
                          doSprayButton(!sprayOnOff)
                        }} >
                <View style={styles.buttonStyles} >
                        <Text style={styles.buttonText}>
                            {sprayOnOff?'SPRAY ON':'SPRAY OFF'}
                        </Text>
                    
                </View>
                </TouchableOpacity>
                <View style={{margin:'5%'}}></View>
                    <TouchableOpacity 
                        onPress={() => {
                          setesvOnOff(!esvOnOff)
                        }} >
                      <View style={styles.buttonStyles}>
                        <Text style={styles.buttonText}>
                        {esvOnOff?'ESV ON':'ESV OFF'}
                        </Text>
                      </View>
                    </TouchableOpacity>
              </View>
              <View style={{margin:'5%'}}></View>
              <View style={{justifyContent:'center',flexDirection:'row'}}>
                    <TouchableOpacity 
                        onPress={() => {
                            setsprayInOz(!sprayInOz)
                        }} >
                      <View style={styles.setButtonButtonStyles}>
                        <Text style={styles.buttonText}>
                         {sprayInOz?'OZ':'MIN'}
                        </Text>
                        <Text style={styles.buttonText}>
                         {sprayInOz?'Set to min':'Set To oz'}
                        </Text>
                      </View>
                    </TouchableOpacity>
              <View style={{margin:'5%'}}></View>
                    <TouchableOpacity 
                        onPress={() => {
                           setisPrompt(!isPrompt)
                        }} >
                      <View style={styles.setButtonButtonStyles}>
                        <Text style={styles.buttonText}>
                        Set Pump Current
                        </Text>
                      </View>
                    </TouchableOpacity>
              </View>
              <View style={{margin:'1%'}}></View>
              <View style={{justifyContent:'center',flexDirection:'row'}}>
                    <TouchableOpacity 
                        onPress={() => {

                        }} >
                      <View style={styles.setButtonButtonStyles}>
                        <Text style={styles.buttonText}>
                        Set Battery Capacity
                        </Text>
                      </View>
                    </TouchableOpacity>
                <View style={{margin:'5%'}}></View>
                    <TouchableOpacity 
                        onPress={() =>{

                        }} >
                      <View style={styles.setButtonButtonStyles}>
                        <Text style={styles.buttonText}>
                        Set Error Code
                        </Text>
                      </View>
                    </TouchableOpacity>
              </View>
              <View style={{margin:'1%'}}></View>
              <View style={{justifyContent:'center',flexDirection:'row'}}>
                    <TouchableOpacity 
                      onPress={() => navigation.navigate('Settings')}
                    >
                      <View style={styles.setButtonButtonStyles}>
                        <Text style={styles.buttonText}>
                        Set Serial No 
                        </Text>
                      </View>
                    </TouchableOpacity>
                <View style={{margin:'5%'}}></View>
                    <TouchableOpacity 
                          onPress={() => navigation.navigate('Settings')}>
                      <View style={styles.setButtonButtonStyles}>
                        <Text style={styles.buttonText}>
                        Set Firmware  
                        </Text>
                      </View>
                    </TouchableOpacity>
              </View>
          </View>
      </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#0D294E',
    // color:'white',
  },
  buttonStyles:{
    backgroundColor:'#62C487',alignSelf:'center',padding:'5%',width:120,height:100, borderRadius: 50,color:'#0D294E',justifyContent:'center'
  },
  setButtonButtonStyles:{
    backgroundColor:'#556983',alignSelf:'center',padding:'5%',width:120,height:100, borderRadius: 10,color:'#DFECF5',justifyContent:'center'
  },
  buttonText: {
    textAlign:'center',
    justifyContent:'center',
    fontSize: 16,
    color: '#DFECF5',
  },
  buttonContainer: {
    width: '100%',
    height:'100%',
    alignSelf:"center",
    justifyContent: 'center',
    backgroundColor: '#0D294E',
  }
});



