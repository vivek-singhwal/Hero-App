import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,Image} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Prompt from 'react-native-input-prompt';
import { EventRegister } from 'react-native-event-listeners';

export default class Settings extends React.Component {
  static navigationOptions = {
    title:"Settings",
    headerStyle: {
      backgroundColor: '#556983',
    },
    headerBackTitleVisible:false,
    headerTintColor: '#DFECF5',
    headerTitleStyle: {
      paddingRight:'10%',
      textAlign:'center',
      fontWeight: 'bold',
    }
  };
  constructor() {
    super()
    this.state = {
        sprayOnOff:false,
        esvOnOff:false,
        sprayInOz:true,
        isPrompt:false,
    }
  }
  componentDidMount() {

  }
  componentWillUnmount() {
  }
  inputValue(){
        
  }
  render() {
    return ( 
        <View style={styles.container}>
             <Prompt
                visible = {this.state.isPrompt}
                title="Input "
                placeholder="Enter Value"
                onCancel={() =>
                    this.setState({
                        text: "User Cancelled!",
                        isPrompt: !this.state.isPrompt
                    })
                }
                onSubmit={text =>
                    this.setState({
                        text: "User submitted: " + text,
                        isPrompt: !this.state.isPrompt
                    })
                }
            />
          <View style={styles.buttonContainer}>
              <View style={{justifyContent:'center',flexDirection:'row'}}>
                <View style={styles.buttonStyles} >
                    <TouchableOpacity 
                        onPress={() => 
                        {
                            if(this.state.sprayOnOff){
                                this.setState({sprayOnOff:false})
                            }else{
                                this.setState({sprayOnOff:true})
                            }
                        }} >
                        <Text style={styles.buttonText}>
                            {this.state.sprayOnOff?'SPRAY ON':'SPRAY OFF'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin:'5%'}}></View>
                <View style={styles.buttonStyles}>
                    <TouchableOpacity 
                        onPress={() => {
                            if(this.state.esvOnOff){
                                this.setState({esvOnOff:false})
                            }else{
                                this.setState({esvOnOff:true})
                            }
                        }} >
                        <Text style={styles.buttonText}>
                        {this.state.esvOnOff?'ESV ON':'ESV OFF'}
                        </Text>
                    </TouchableOpacity>
                </View>
              </View>
              <View style={{margin:'5%'}}></View>
              <View style={{justifyContent:'center',flexDirection:'row'}}>
                <View style={styles.setButtonButtonStyles}>
                    <TouchableOpacity 
                        onPress={() => {
                            if(this.state.sprayInOz){
                                this.setState({sprayInOz:false})
                            }else{
                                this.setState({sprayInOz:true})
                            }
                        }} >
                        <Text style={styles.buttonText}>
                         {this.state.sprayInOz?'OZ':'MIN'}
                        </Text>
                        <Text style={styles.buttonText}>
                         {this.state.sprayInOz?'Set to min':'Set To oz'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin:'5%'}}></View>
                <View style={styles.setButtonButtonStyles}>
                    <TouchableOpacity 
                        onPress={() => {
                           this.setState({isPrompt:true})
                           this.inputValue();
                        }} >
                        <Text style={styles.buttonText}>
                        Set Pump Current
                        </Text>
                    </TouchableOpacity>
                </View>
              </View>
              <View style={{margin:'1%'}}></View>
              <View style={{justifyContent:'center',flexDirection:'row'}}>
                <View style={styles.setButtonButtonStyles}>
                    <TouchableOpacity 
                        onPress={() => {

                        }} >
                        <Text style={styles.buttonText}>
                        Set Battery Capacity
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin:'5%'}}></View>
                <View style={styles.setButtonButtonStyles}>
                    <TouchableOpacity 
                        onPress={() =>{

                        }} >
                        <Text style={styles.buttonText}>
                        Set Error Code
                        </Text>
                    </TouchableOpacity>
                </View>
              </View>
              <View style={{margin:'1%'}}></View>
              <View style={{justifyContent:'center',flexDirection:'row'}}>
                <View style={styles.setButtonButtonStyles}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Setting')} >
                        <Text style={styles.buttonText}>
                        Set Serial No 
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin:'5%'}}></View>
                <View style={styles.setButtonButtonStyles}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Setting')} >
                        <Text style={styles.buttonText}>
                        Set Firmware  
                        </Text>
                    </TouchableOpacity>
                </View>
              </View>
          </View>
      </View>
    );
  }
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
    fontSize: 15,
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



