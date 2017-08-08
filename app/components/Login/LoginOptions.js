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
import { Button } from 'react-native-elements';
import { SocialIcon } from 'react-native-elements';


export default class LoginOptions extends Component{
  render() {
    return (
      <View style = {styles.container}>
      <View style = {styles.Loginbutton}> 
       <Button
         raised
         icon={{name: 'person-pin', size: 20}}
          buttonStyle={{backgroundColor: '#abb7b7', borderRadius: 20}}
          textStyle={{textAlign: 'center'}}
          title={`Create a New Account`}
        />
      </View> 
      <View style = {styles.FBbutton}> 
       <SocialIcon
        title='Sign In With Facebook'
        button={true}
        type='facebook'
        iconSize= {12}
        />
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
    backgroundColor: 'white',
    justifyContent: 'center', 
    padding: 40
  },
  buttonsContainer:{
    paddingTop: 20

  },

  Loginbutton:{
    height: 40,
    width: 295,
    justifyContent: 'space-around',
    marginBottom: 30,
    marginTop: 300,
    opacity: 0.8

  },
  FBbutton:{
    //height: 40,
    justifyContent: 'space-around',
     marginBottom: 20,
     opacity: 0.8 
  }


});

AppRegistry.registerComponent('LoginOptions', () => LoginOptions);
