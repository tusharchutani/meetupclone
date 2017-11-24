import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity, 
  ActivityIndicator
} from 'react-native';
import {reduxForm} from 'redux-form';
import { Button, FormLabel, FormInput, SocialIcon, FormValidationMessage } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from '../../MokUI/UIConstants';
import {loginUser,openMainApp,showErrorAlert,showAlert, forgotPassword} from '../../actions';
import {FORGOT_PASSWORD} from '../../api';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import axios from 'axios';

export default class ForgotPassword extends Component{
  

  constructor(props) {
    super(props);
    this.state = {isLoading:false}
  }


  forgotPasswordButton(){
    var {username, password} = this.props.fields;

    if(username.value.length == 0){
      return true;
    }

    return this.state.isLoading;
  }


  _forgotPassword(){
    var {dispatch, fields:{username}} = this.props;
    this.setState({isLoading: true});
    axios.post(FORGOT_PASSWORD,{email:username.value},).then(()=>{
      this.props.navigation.goBack();
      this.props.dispatch(showAlert("Password reset","The password has been reset. Please check your email for the temprory password"));
      this.setState({isLoading:false});
    }).catch((error)=>{
        this.setState({isLoading:false});
        if(error.response.data){
          this.props.dispatch(showErrorAlert(error.response.data.message));
        }else{
          this.props.dispatch(showErrorAlert(error.message));
        }
        
    });
  }

  componentWillUnmount(){
    this.setState({isLoading: false});
  }

  render() {
    var {fields:{username,password}} = this.props;

    return (
      <View style = {styles.container}> 
        <View> 
            <FormLabel>Email</FormLabel>
            <FormInput {...username} 
            inputStyle={styles.formInput}
            autoCapitalize="none" placeholderTextColor={Constants.color3} placeholder="Email" />
            
        </View>

        <Button
          small
          title='Send email'
          backgroundColor={Constants.color2} 
          containerViewStyle={styles.forgetPasswordButton}
          disabled={this.forgotPasswordButton()}
          onPress={()=>{this._forgotPassword()}}/>


        <View style={{justifyContent:'center', alignItems:'center',paddingTop:20}}> 

        </View>


          <ActivityIndicator
            animating={this.state.isLoading}
            style={[Constants.styles.inColumnComponents, {height: 80}]}
            size="large"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
    flex: 1,
    backgroundColor:Constants.color5,
    // alignItems: 'center',
  },
  checkboxStyle: {
    padding: 25
  },forgetPasswordButton:{
    padding:20
  },formInput:{
    color:Constants.color2
  },
  forgotPasswordText: {
    color: 'grey',
    paddingTop: 8,
    paddingBottom: 10
  },FbButton: {
     backgroundColor: '#3B5998',
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    marginTop: 25
    
  }
});

var validate = (formProps) =>{
  var errors = {};
  if(!formProps.username){
    errors.username = "Please enter username";
  }
  return errors; 
}

module.exports = reduxForm({
  form:'login',
  fields:['username'],
  validate: validate
}, null, null )(ForgotPassword)


// AppRegistry.registerComponent('ForgotPassword', () => ForgotPassword);

