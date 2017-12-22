
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {authUserPublic} from '../../actions'
import Constants from '../../MokUI/UIConstants';
import { NavigationActions } from 'react-navigation';


export default class LoginSignup extends Component{
  _val = 0;
  static navigationOptions = {
    headerNode:'screen',
    header:null
  }
   constructor(props) {
      super(props);
      this.state = {
        loginButtonDisabled:false,
        signupButtonDisabled:false
      }
    }

  render() {
    let onLoginButton = () => {
    if(this._val == 0){
      this._val++;
      this.props.navigation.navigate('LoginScreen');
      //temp fix later on
      setTimeout(()=>{this._val = 0; }, 1000); }
    }

    let onSignupButton = () => {
    if(this._val == 0){
      this._val++;
      this.props.navigation.navigate('SignUp');
      //temp fix later on
      setTimeout(()=>{this._val = 0; }, 1000); }      
    }

//
    return (
    <Image source = {require('../../../assets/images/front.png')} style={styles.imageContainer} resizeMode="stretch"> 
      <View style={styles.logoContainer}>
      
      </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.93} style={styles.button} onPress={onLoginButton}> 
            <Text style={styles.buttonText}>LOG IN</Text> 
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={0.97}
          onPress={onSignupButton}
          style={[styles.button,{backgroundColor:signupButtonColor}]}> 
            <Text style={styles.buttonText}>SIGN UP</Text> 
          </TouchableOpacity>
        </View>
      </Image>
    );
  }
}

const introTextPadding = 10;
const signupButtonColor = '#141414'
const styles = StyleSheet.create({
	imageContainer:{
    flex: 1,
    justifyContent:'space-between',
    alignItems:'center',
    height: null,
    width: null,
    backgroundColor:'black'
  },logoContainer:{
    paddingTop:70,
    alignItems:'center'
  },
  buttonContainer: {
    height: 50 ,
    alignItems: 'stretch',
    flexDirection:'row'
  },buttonText:{
    fontSize:19,
    color:Constants.color1
  },button:{
      flex:1,
      backgroundColor:Constants.color2, 
      alignItems:'center',
      justifyContent:'center'
  }
});

var mapStateToProps = (state) =>{
    return ({userId: state.auth.user_id});
}

module.exports = connect(mapStateToProps)(LoginSignup);
        
  