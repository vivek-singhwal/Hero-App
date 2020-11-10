import React from 'react';
import { StyleSheet, Text, Button, View, ActivityIndicator, TouchableOpacity ,Image,TouchableHighlight} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { EventRegister } from 'react-native-event-listeners';

export default class HomePage extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
 
  constructor() {
    super()
    this.state = {
    }
  }
  componentDidMount() {
    this.listener = EventRegister.addEventListener('BLE_STATUS', (data) => {
      if(data.event == "Data_Recieved"){
        console.log(data.value);
      }
    });
  }
  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }
  scanAndConenct = () => {
    EventRegister.emit('SCAN', { cmd: 'startScan' });
  };
  
  disconnect = () => {
    this.setState({ statusMsg: "disconnecting..." });
    EventRegister.emit('SCAN', { cmd: 'disconnect' });
  };
  render() {
    return ( 
      <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonStyles}>
              <TouchableOpacity 
                onPress={() => {
                  this.scanAndConenct();
                }} >
                  <Text style={styles.buttonText}>
                    Connect
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonStyles}>
              <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Setting')} >
                  <Text style={styles.buttonText}>
                    Settings
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonStyles}>
              <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('DeviceStatus')} >
                  <Text style={styles.buttonText}>
                    Device Status
                </Text>
              </TouchableOpacity>
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
  },buttonStyles:{
    backgroundColor:'#0071ba',alignSelf:'center',padding:'5%',width:'70%', borderRadius: 10,marginBottom:'5%',color:'white'
  },
  buttonContainer: {
    width: '100%',
    height:'100%',
    alignSelf:"center",
    justifyContent: 'center',
    backgroundColor: '#0D294E',
  },buttonText: {
    textAlign: 'center',
    // justifyContent: 'center',
    fontSize: 25,
    color: '#DFECF5',
  }
});