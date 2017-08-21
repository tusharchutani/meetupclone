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
import Constants  from '../../MokUI/UIConstants';

var ScrollableTabView = require('react-native-scrollable-tab-view');

export default class Connection extends Component{
  render() {
    return (
      <ScrollableTabView tabBarActiveTextColor={Constants.color4} tabBarUnderlineStyle={{backgroundColor:Constants.color4}} style = {styles.tabView}>
       <Following tabLabel="Following" />
       <Followers tabLabel="Followers" />
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
    paddingTop:15
  }
  
    
});


AppRegistry.registerComponent('Connection', () => Connection);
 // <View>