import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements'


export default class SignUp extends Component{
  render() {
    return (
      <View style = {styles.container}>
      <TextInput placeholder="     First Name" style = {styles.input}/>
      
      <TextInput placeholder="     Last Name" style = {styles.input}/>

      <TextInput placeholder="     Email" style = {styles.input}/>

      <TextInput placeholder="     Username"  style = {styles.input}/>

      <TextInput placeholder="     Password" style = {styles.input}/>

      <TextInput placeholder="     Confirm Password" style = {styles.input}/>

      <TextInput placeholder="     Phone Number" style = {styles.input}/>

      <TouchableOpacity style = {styles.button}>
      <Text style = {styles.textStyle}> Continue </Text> 
      </TouchableOpacity> 

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 20
  },
  input:{
    height: 40,
    backgroundColor: 'rgba(201,200,201,1.0)',
    marginBottom: 20,
    //textAlign: 'center'
  },
  button:{
    backgroundColor: 'lightgrey',
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
    opacity: 0.8
  },
  textStyle:{
    textAlign: 'center'
  }

});

AppRegistry.registerComponent('SignUp', () => SignUp);
