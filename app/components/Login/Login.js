
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

export default class Login extends Component{
  render() {
    return (
      <View style={styles.imageContainer}>
      <Image source = {require('../../../assets/images/aa.png')} resizeMode="stretch">
      	<View>
      	<TouchableOpacity style ={styles.buttonContainer}> 
     	<Text style = {styles.textContainer}> LOG IN </Text>
		</TouchableOpacity>
		</View>
      </Image>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
	
	imageContainer:{
		//flex: 1,
		justifyContent: 'center', //y axis
    	alignItems: 'stretch',
    	backgroundColor: 'transparent' //x axis
	},
	buttonContainer:{
		backgroundColor: 'red'

	},
	textContainer: {
		color: 'darkblue'

	}
});


AppRegistry.registerComponent('Login', () => Login);


