
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
import { Button } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';

export default class Login extends Component{
  static navigationOptions = {
    title: 'Welcome',

  };
  render() {
    return (
      
      <Image style={styles.imageContainer} source = {require('../../../assets/images/aa.png')} resizeMode="stretch">
        <View style={styles.buttonContainer}>
        <TouchableOpacity>
        <Text style = {styles.textStyle}> Login </Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style = {styles.textStyle}> Sign Up </Text>
        </TouchableOpacity>
        </View>
      </Image>
      
    );
  }
}

  // Try setting `justifyContent` to `center`.
      // Try setting `flexDirection` to `row`.

const MokApp = StackNavigator({
  LoginMain: { screen: Login }, 
});      
       

const styles = StyleSheet.create({
	imageContainer:{
    flex: 1,
    justifyContent:'flex-end',
    alignItems:'stretch',
    height: null,
    width: null,
    opacity: 0.7


    
  },
  buttonContainer: {
    backgroundColor:'black',
    height: 50 ,
    justifyContent: 'space-around', 
    alignItems: 'center',
    flexDirection:'row',
    opacity: 0.8,
    
  },
  textStyle: {
    color: 'white',
    fontSize: 18
  }
});


AppRegistry.registerComponent('Login', () => Login);
        
