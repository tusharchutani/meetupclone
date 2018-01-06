import React from 'react';
import { StyleSheet, AppRegistry, View, StatusBar } from 'react-native';

import {Provider} from 'react-redux';
import {configureStore} from './app/store';
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import MokApp from './app/MokApp';


//debugging
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?  
  GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

  
export default class App extends React.Component {

  render() {
    console.ignoredYellowBox = ['Remote debugger'];
    
    return (
      <Provider style={styles.container} store={configureStore()}>
         <MokApp />           
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }});

module.exports = App;