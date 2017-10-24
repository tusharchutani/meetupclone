import React, { Component } from 'react';
import {SecureStore} from 'expo';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {connect} from 'react-redux';
import Constants from '../../MokUI/UIConstants';
import axios from 'axios';
import {RoundImage} from '../../MokUI/MokUI';
import {signUpUser} from '../../actions';

import {CHANGE_USER_FIRST_NAME,
  CHANGE_USER_LAST_NAME,
  CHANGE_USER_MAIL,
  CHANGE_PASSWORD
} from '../../api';

import {FormLabel, FormInput, Button, Icon,FormValidationMessage } from 'react-native-elements';

export default class SignUp extends Component {

    constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstname:"",
      confirmPassword:"",
      password:"",
      lastname: "",
      email: "",
      avatarurl: Constants.defaultProfilePic,
      notFilledError:false,
      passwordError:false,
      isButtonDisabled:false
    };
  }

  _onSignup(){

    this.setState({isLoading:true});
    //work around for now

  //check to see if it is empty
   if((this.state.firstname.length == 0)
    ||(this.state.lastname.length == 0)
    ||(this.state.email.length == 0)
    ||(this.state.password.length == 0)
    ||(this.state.password.length == 0)){

    this.setState({notFilledError:true,isLoading:false});
    return;
  }
  //check to see if passwords are correct 
  if(this.state.password != this.state.confirmPassword){
    this.setState({passwordError:true,isLoading:false});
    return;
  }
  var payload = {
    firstname:this.state.firstname,
    lastname:this.state.lastname,
    password:this.state.password,
    email:this.state.email
  };
  this.setState({isDisabled:true,notFilledError:false,passwordError:false});
  this.props.dispatch(signUpUser(payload)).then(()=>{
    this.setState({isDisabled:false,isLoading:false});
  }); 
  }
   
  

  render() {
    return (
      <KeyboardAvoidingView 
      behavior='position'
      style={styles.container}
      keyboardVerticalOffset={-64}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={{alignItems:'center'}}>
            <RoundImage size={75} source={this.state.avatarurl}/>
            <TouchableOpacity><Text style={styles.choosePhotoText}>Choose photo</Text></TouchableOpacity>
          </View>

          
          <FormLabel>First name</FormLabel>
          <FormInput 
          defaultValue={this.state.firstname} 
          autoCapitalize="none"
          onChangeText={(event)=>{
            this.setState({firstname:event});}}
          placeholderTextColor={Constants.color3} 
          style={styles.formInput}
          placeholder="First name" />

      
          <FormLabel>Last name</FormLabel>
          <FormInput defaultValue={this.state.lastname}  
          style={styles.formInput} 
          autoCapitalize="none" 
          placeholderTextColor={Constants.color3} 
          onChangeText={(event)=>{
            this.setState({lastname:event});}}            
          placeholder="Last name" />
      

      
          <FormLabel>Email</FormLabel>
          <FormInput defaultValue={this.state.email} 
          style={styles.formInput} 
          autoCapitalize="none" 
          placeholderTextColor={Constants.color3}
          onChangeText={(event)=>{
            this.setState({email:event});}}
          placeholder="Email" />



          <FormLabel>Password</FormLabel>
          <FormInput 
          secureTextEntry={true}
          style={styles.formInput} 
          autoCapitalize="none" 
          placeholderTextColor={Constants.color3}
          onChangeText={(event)=>{
            this.setState({password:event});}}
          placeholder="Password" />


      
          <FormLabel>Confirm password</FormLabel>
          <FormInput
          secureTextEntry={true}
          style={styles.formInput} 
          autoCapitalize="none" 
          placeholderTextColor={Constants.color3}
          onChangeText={(event)=>{
            this.setState({confirmPassword:event});}}
          placeholder="Confirm password" />
          {this.state.passwordError && <FormValidationMessage>The passwords don't match</FormValidationMessage>}
          {this.state.notFilledError && <FormValidationMessage>Please fill out all the information</FormValidationMessage>}
          <Button
            small
            title='Sign up'
            backgroundColor={Constants.color2} 
            containerViewStyle={styles.saveButton}
            onPress={()=>{
                  Keyboard.dismiss();
                  this._onSignup()}}/>
            <ActivityIndicator animating={this.state.isLoading}
                              style={{paddingTop: 30}}
                              size="large"/>
                              </View>   
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.color1
  },saveButton:{
    paddingTop: 10,
  },choosePhotoText:{
    color:Constants.color4,
    fontWeight:'bold'
  },formInput:{
    color:Constants.color2,
    paddingTop:10
  },formWarning:{
    fontSize:10
  },
  title:{
    textAlign:'left',
    color:Constants.color2,
    fontSize:22,
    paddingRight:220
  }
});




module.exports =  connect()(SignUp)
