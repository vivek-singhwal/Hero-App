import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,Image} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { EventRegister } from 'react-native-event-listeners';

export default class DeviceStatus extends React.Component {
  static navigationOptions = {
    title:"Device Status",
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
    }
  }
  componentDidMount() {

  }
  componentWillUnmount() {
  }
  render() {
    return ( 
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <Text style={{textAlign:'center',color: '#DFECF5'}}>
                  Hey This is Device Status
                </Text>
            </TouchableOpacity>
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
    backgroundColor: '#fff',
    color:'white',
  },
  buttonContainer: {
    width: '100%',
    height:'100%',
    alignSelf:"center",
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#0D294E',
  }
});



