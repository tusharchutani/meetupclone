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
import {loginUser,openMainApp,showErrorAlert,navigateToForgetPassword} from '../../actions';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

export default class LoginScreen extends Component{
  

  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      username:"",
      password:"",
      validationError:false
    }
  }


  loginButtonInvalid(){
    return this.state.isLoading || this.state.validationError;
  }


  _login(){
    
    
    var {dispatch} = this.props;
    var {username,password} = this.state;
    if(username.length == 0 || password.length == 0){
      this.setState({validationError:true});
      return;
    }
    this.setState({isLoading: true});
    dispatch(loginUser(username,password)).then((response)=>{
      dispatch(openMainApp());
      setTimeout(()=>{ 
        this.setState({isLoading: false}); }, 1000);
      
    }).catch((error)=>{
      dispatch(showErrorAlert(error));
      this.setState({isLoading: false});
    });
  }

  componentWillUnmount(){
    this.setState({isLoading: false});
  }

  render() {
    var {username,password} = this.state;



    return (
      <View style = {styles.container}> 
        <View> 
            <FormLabel>Email</FormLabel>
            <FormInput
            onChangeText={(event)=>{
              this.setState({username:event});
              (event.length == 0 && this.state.password.length == 0) ? this.setState({validationError:true}):this.setState({validationError:false})}}
            inputStyle={styles.formInput}
            autoCapitalize="none" placeholderTextColor={Constants.color3} placeholder="Email" />

            <FormLabel>Password</FormLabel>
            <FormInput
              inputStyle={styles.formInput}
              onChangeText={(event)=>{
                this.setState({password:event});
                (event.length == 0 && this.state.username.length == 0) ? this.setState({validationError:true}): this.setState({validationError:false})}}
              autoCapitalize="none" 
              secureTextEntry={true} 
              inputStyle={styles.formInput}
              placeholderTextColor={Constants.color3} 
              placeholder="Password" />
            {this.state.validationError && <FormValidationMessage>Please enter valid username and pasword</FormValidationMessage>}
        </View>

        <Button
          small
          title='Login'
          backgroundColor={Constants.color2} 
          containerViewStyle={styles.loginButton}
          disabled={this.loginButtonInvalid()}
          onPress={()=>{this._login()}}/>
          

          <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{this.props.dispatch(navigateToForgetPassword());}}> 
            <Text>Forgot password</Text>
          </TouchableOpacity>


        <View style={{justifyContent:'center', alignItems:'center',paddingTop:20}}> 

        </View>


          <ActivityIndicator
            animating={true}
            style={{opacity: this.state.isLoading ? 1.0 : 0.0}}
            size="large"
          />


      </View>
    );
  }
}
/*
          <Icon.Button style={{width:306,height:42}} borderRadius={0} name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
            Login with Facebook
          </Icon.Button>
*/
      
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
  if(!formProps.username || !formProps.password){
    errors.username = "Please enter username";
  }
  return errors; 
}

module.exports = connect()(LoginScreen);

