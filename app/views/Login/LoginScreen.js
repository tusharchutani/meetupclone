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
  TouchableOpacity
} from 'react-native';
import {reduxForm} from 'redux-form';
import { Button, FormLabel, FormInput, SocialIcon, FormValidationMessage } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from '../../MokUI/UIConstants';
import {authUser} from '../../actions';
import {NavigationActions} from 'react-navigation'

export default class LoginScreen extends Component{

  loginButtonValid(){
  /*  const {username, password} = this.state; 
    if(username.length == 0 || password.length == 0 ){
      return true;
    }*/

    return false;
  }


  _login(){
    var {username, password} = this.props.fields;
    
    this.props.dispatch(authUser('fake id'));
    const navigateAction = NavigationActions.navigate({
      routeName: 'MainApp',
    }); 
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    var {fields:{username,password}} = this.props;

    var errorMessage = (field) => {
       if(field.touched && field.error){
        return (<FormValidationMessage>Please enter valid username and pasword</FormValidationMessage>)  
      }
      
    }


    return (
      <View style = {styles.container}> 
        <View> 
            <FormLabel>Username</FormLabel>
            <FormInput {...username} autoCapitalize="none" placeholderTextColor={Constants.color3} placeholder="Username" />

            <FormLabel>Password</FormLabel>
            <FormInput {...password} autoCapitalize="none" secureTextEntry={true} inputStyle={styles.formInput} placeholderTextColor={Constants.color3} placeholder="Password" />
            {errorMessage(username)}
        </View>

        <Button
          small
          title='Login'
          backgroundColor={Constants.color2} 
          containerViewStyle={styles.loginButton}
          disabled={this.loginButtonValid()}
          onPress={()=>{this._login()}}/>


          <TouchableOpacity style={{alignItems:'center'}}> 
            <Text>Forgot password</Text>
          </TouchableOpacity>


        <View style={{justifyContent:'center', alignItems:'center',paddingTop:20}}> 
          <Icon.Button style={{width:306,height:42}} borderRadius={0} name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
            Login with Facebook
          </Icon.Button>
        </View>

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
  },
  LoginButton: {
    backgroundColor: 'grey',
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    opacity: 0.7
  },loginButton:{
    padding:20
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
  if(!formProps.username || !formProps.password){
    errors.username = "Please enter username";
  }
  return errors; 
}

module.exports = reduxForm({
  form:'login',
  fields:['username','password'],
  validate: validate
}, null, null )(LoginScreen);
// AppRegistry.registerComponent('LoginScreen', () => LoginScreen);

