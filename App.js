import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';


import {MokApp} from './app/MainApp';


export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
       <MokApp />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
AppRegistry.registerComponent('App', () => App);