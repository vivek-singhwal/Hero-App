import React, { Component } from 'react';
import {  StyleSheet, View } from 'react-native';
import StackNavigator from './components/StackNavigator';
import SplashScreen from 'react-native-splash-screen';
import BleComponent from './components/BleComponent';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <View style={{ height: '100%', width: '100%' }}>
        <BleComponent />
        <StackNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
