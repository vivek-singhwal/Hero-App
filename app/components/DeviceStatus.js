import React from 'react';
import configSetup from '../services/configSetup';
import { StyleSheet, Text, Button, View, ActivityIndicator, TouchableOpacity ,Image,ToastAndroid} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { EventRegister } from 'react-native-event-listeners';
import KeepAwake from 'react-native-keep-awake';

export default class DeviceSelection extends React.Component {
  static navigationOptions = {
    title:"Device Setup",
    headerStyle: {
      backgroundColor: '#0071ba',
    },
    headerBackTitleVisible:false,
    headerTintColor: '#fff',
    headerTitleStyle: {
      justifyContent: 'center',
      fontWeight: 'bold',
    },
  };
  constructor() {
    super()
    this.state = {

    }
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  getOptions = () => {
        return  <View >
                    <TouchableOpacity 
                    >
                        <View style={styles.dropdownContainer}>
                            <Text style={styles.TextStyle}>Single VWT</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    >
                        <View style={styles.dropdownContainer}>
                            <Text style={styles.TextStyle}>Duel VWT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
  }
  render() {
    return ( 
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
           >
              <View>
                <Text style={styles.buttonText}>
                  Device Selection
              </Text>
              </View>
            </TouchableOpacity>
          </View>
          {this.getOptions()}
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
    backgroundColor: '#fff',
    // color:'white',
  },
  spinnerTextStyle: {
    color: '#FFF',
    textAlign:"center",
    fontSize:18,
    backgroundColor:'#737373'
  },
  dropdownContainer: {
        width: 400,
        height: 50,
        marginBottom: 1,
        alignSelf:"center",
        justifyContent: 'center',
        backgroundColor: '#eff0f4',
  },
  buttonContainer: {
    width: 400,
    height: 100,
    borderRadius:5,
    alignSelf:"center",
    marginTop: 50,
    marginBottom: 5,
    justifyContent: 'center',
    backgroundColor: '#eff0f4',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
  },
  TextStyle: {
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    paddingLeft:'10%',
    fontSize: 20,
  }
});



