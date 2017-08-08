import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';

import Following from './Following'
import Followers from './Followers'

var ScrollableTabView = require('react-native-scrollable-tab-view');

export default class Connection extends Component{
  render() {
    return (
      <ScrollableTabView style = {styles.tabView}>
     <Following tabLable="Following" />
     <Followers tabLable="Followers" />
      </ScrollableTabView>

    );
  }
}
 
const styles = StyleSheet.create({
	container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  tabView: {

  }
  
    
});


AppRegistry.registerComponent('Connection', () => Connection);
 // <View>