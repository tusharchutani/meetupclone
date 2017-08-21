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
import { FormLabel, FormInput, CheckBox } from 'react-native-elements'


export default class LoginScreen extends Component{
  render() {
    return (
      <View style = {styles.container}> 
      <View style = {styles.formContainer}> 
      <FormLabel>Username</FormLabel>
      <FormInput ref='forminput' textInputRef='Name' />
      <FormLabel>Password</FormLabel>
      <FormInput ref='forminput' textInputRef='Password' />
      
      <CheckBox style = {styles.checkboxStyle} title='Remember Me' />
      </View>
      <TouchableOpacity style = {styles.LoginButton} >
      <Text style = {styles.textstyle}> Login </Text>
      </TouchableOpacity>
      <View style = {styles.textView}>
      <Text style = {styles.otherText}> Forgot Your Password? </Text>
      </View>
      <TouchableOpacity style = {styles.FbButton} >
      <Text style = {styles.textstyle}> Login With Facebook </Text>
      </TouchableOpacity>
      <View style = {styles.secondTextView}>
      <Text style = {styles.otherText}> Don't Have an Account? </Text> 
      <Text> Sign Up! </Text>
      </View>
      </View>
    );
  }
}

  // Try setting `justifyContent` to `center`.
      // Try setting `flexDirection` to `row`.
      
       

const styles = StyleSheet.create({
	container:{
    flex: 1,
   // alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    marginLeft: 20,
    marginRight: 20

    
  },
  checkboxStyle: {
    padding: 25
  },
  LoginButton: {
    backgroundColor: 'grey',
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    opacity: 0.7
  },
  textstyle: {
    fontSize: 20
  },

  otherText: {
    color: 'grey',
    paddingTop: 8,
    paddingBottom: 10
  },
  textView: {
    alignItems: 'center'
  }, 
  FbButton: {
     backgroundColor: '#3B5998',
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    marginTop: 25
    
  },
  secondTextView: {
    alignItems: 'center',
    marginTop: 50,

  }
});

AppRegistry.registerComponent('LoginScreen', () => LoginScreen);

