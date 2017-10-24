import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import SignupProfileForm from './SignupProfileForm';
import {connect} from 'react-redux';

export default class EditProfile extends Component {
  render() {
  	this.props.userProfile.title = "Edit profile";
    return (
    	<SignupProfileForm screenProps={{navigation:this.props.navigation}} {...this.props.userProfile}/>
    );
  }
}


var mapStateToProps = (state) =>{
  return {
    userProfile: state.profiles.myProfile
  }
}

module.exports =  connect(mapStateToProps)(EditProfile)