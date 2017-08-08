import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';


import Login from './app/components/Login/Login';
import LoginOptions from './app/components/Login/LoginOptions';
import SignUp from './app/components/Login/SignUp';
import LoginScreen from './app/components/Login/LoginScreen';
import Settings from './app/components/Settings/Settings';
import Connection from './app/components/Connections/Connection';
import { StackNavigator } from 'react-navigation';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
       <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

     //backgroundColor: 'green',
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});
AppRegistry.registerComponent('App', () => App);