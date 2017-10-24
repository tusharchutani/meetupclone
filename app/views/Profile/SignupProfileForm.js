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
import Constants from '../../MokUI/UIConstants';
import axios from 'axios';
import {RoundImage} from '../../MokUI/MokUI';
import {getMyprofile} from '../../actions';
import {connect} from 'react-redux';
import {CHANGE_USER_FIRST_NAME,
  CHANGE_USER_LAST_NAME,
  CHANGE_USER_MAIL,
  CHANGE_PASSWORD
} from '../../api';

import {FormLabel, FormInput, Button, Icon } from 'react-native-elements';

export default class SignupProfileForm extends Component {

    constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstname: this.props.firstname ? this.props.firstname : "",
      confirmPassword:"",
      password:"",
      lastname:  this.props.lastname ? this.props.lastname : "",
      email: this.props.email ? this.props.email : "",
      avatarurl: this.props.avatarurl ? this.props.avatarurl : Constants.defaultProfilePic,
      passwordError:false
    };
  }

  _onSave(){
    Keyboard.dismiss();

    var apiCallArray = [];
    const {dispatch} = this.props;
    var user_id = this.props.userId;
    if(this.props.firstname != this.state.firstname && this.state.firstname.length != 0){
      apiCallArray.push(axios.put(CHANGE_USER_FIRST_NAME(user_id),
        {firstname:this.state.firstname}));
    }
    if(this.props.lastname != this.state.lastname && this.state.lastname.length != 0){
      apiCallArray.push(axios.put(CHANGE_USER_LAST_NAME(user_id),
        {lastname:this.state.lastname}));
    }
    if(this.props.email != this.state.email && this.state.email.length != 0){
      apiCallArray.push(axios.put(CHANGE_USER_MAIL(user_id),
        {email:this.state.email}));
    }
    if(this.state.confirmPassword.length !=0 
      ||this.state.password.length !=0)
    {
      if(this.state.confirmPassword == this.state.password){
       apiCallArray.push(axios.put(CHANGE_PASSWORD(user_id),
        {"password":this.state.password}));
      }else{
      this.setState({passwordError:true});
        return;
      }
    }
      this.setState({isLoading:true});
      axios.all(apiCallArray).then(()=>{
        dispatch(getMyprofile()).then(()=>{
          this.props.screenProps.navigation.goBack();
        });          
        this.setState({isLoading:false});
      }).catch((error)=>{
        debugger
        this.setState({isLoading:false});
      });      
  
  }

  render() {
    return (
      <KeyboardAvoidingView 
      behavior='position'
      style={styles.container}
      keyboardVerticalOffset={-130}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.titleBar}> 
            <Icon name="clear" style={{paddingRight:10}} size={Constants.medium_icon_size} color={Constants.color2} onPress={()=> {this.props.screenProps.navigation.goBack()}}/>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>   
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
          {this.state.passwordError && <FormLabel FormLabel labelStyle={styles.formWarning}>The passwords do not match</FormLabel>}
          <Button
            small
            title='Save profile'
            backgroundColor={Constants.color2} 
            containerViewStyle={styles.saveButton}
            onPress={()=>{this._onSave();}}/>
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
  },
  titleBar:{
    backgroundColor:Constants.color1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingBottom:16,
    paddingTop:25

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


var mapStatesToProps = (state) => {
  return {
    userId: state.auth.user_id
  }
}

module.exports =  connect(mapStatesToProps)(SignupProfileForm)
