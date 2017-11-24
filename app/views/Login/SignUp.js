import React, { Component } from 'react';
import {SecureStore} from 'expo';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {connect} from 'react-redux';
import Constants from '../../MokUI/UIConstants';
import axios from 'axios';
import {RoundImage} from '../../MokUI/MokUI';
import { ImagePicker } from 'expo';
import {signUpUser,openMainApp,showErrorAlert} from '../../actions';
import { RNS3 } from 'react-native-aws3';
import {CHANGE_USER_FIRST_NAME,
  CHANGE_USER_LAST_NAME,
  CHANGE_USER_MAIL,
  CHANGE_PASSWORD,
  CHANGE_USER_AVATAR
} from '../../api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {FormLabel, 
  FormInput, 
  Button, 
  Icon,
  SocialIcon,
  FormValidationMessage } from 'react-native-elements';

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
      isButtonDisabled:false,
      avatar:{
        name:"",
        type:""
      }
    };
  }
  uploadPhotoToS3(){
    
    if(this.state.avatarurl != Constants.defaultProfilePic){ 
      if(this.state.avatarurl.substring(0,4) == "http"){
          SecureStore.getItemAsync('user_id').then((user_id)=>{
            axios.post(
              CHANGE_USER_AVATAR(user_id),
              {url:this.state.avatarurl}).then(()=>{
              this.props.dispatch(openMainApp());
              this.setState({isDisabled:false,isLoading:false});
            });
          });        
      }else{
             var imageName = this.state.avatarurl.split("/");
                imageName = imageName[imageName.length-1];
                this.state.avatar.name = imageName;
                this.state.avatar.type = "image/jpg";
              const options = {
                keyPrefix: "uploads/",
                bucket: "uploadsformok",
                region: "us-east-1",
                accessKey: "AKIAI3LSLN3KT4SV4MNA",
                secretKey: "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",
                successActionStatus: 201
                };
              RNS3.put(this.state.avatar, options).then(response => {
                  if (response.status !== 201){
                          throw new Error("Failed to upload image to S3")
          
                        }
                        let photoLocation = response.body.postResponse.location; 
                        SecureStore.getItemAsync('user_id').then((user_id)=>{
                          axios.post(
                            CHANGE_USER_AVATAR(user_id),
                            {url:photoLocation}).then(()=>{
                            this.props.dispatch(openMainApp());
                            this.setState({isDisabled:false,isLoading:false});
                          });
                        });              
                      }
                );
            }  
      }else{
        this.props.dispatch(openMainApp());
        this.setState({isDisabled:false,isLoading:false});
      }
  }
  _onSignup(){

    this.setState({isLoading:true});
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
      this.uploadPhotoToS3();
    }).catch((response)=>{

      this.props.dispatch(showErrorAlert(JSON.stringify(response)));
      this.setState({isDisabled:false,isLoading:false});
    });
  }
   
  chooseProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({avatarurl: result.uri, avatar:result });
    }
  };

  async logInFB() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('300866317096349', {
        permissions: ['public_profile','email'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?fields=email,first_name,last_name,picture&access_token=${token}`);
      let resp = (await response.json());
      this.setState({
        email:resp.email,
        firstname:resp.first_name,
        lastname:resp.last_name,
        avatarurl:resp.picture.data.url

      });
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView>
      <SocialIcon
        title='Sign In With Facebook'
        button
        onPress={this.logInFB.bind(this)}
        type='facebook'
        style={{paddingBottom:20}}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={{alignItems:'center'}}>
            <RoundImage size={75} source={this.state.avatarurl}/>
            <TouchableOpacity onPress={()=>{this.chooseProfilePicture()}}><Text style={styles.choosePhotoText}>Choose photo</Text></TouchableOpacity>
          </View>

          
          <FormLabel>First name</FormLabel>
          <FormInput
          defaultValue={this.state.firstname} 
          onChangeText={(event)=>{
            this.setState({firstname:event});}}
          placeholderTextColor={Constants.color3} 
          inputStyle={styles.formInput}
          placeholder="First name" />

      
          <FormLabel>Last name</FormLabel>
          <FormInput defaultValue={this.state.lastname}  
          inputStyle={styles.formInput} 
          placeholderTextColor={Constants.color3} 
          onChangeText={(event)=>{
            this.setState({lastname:event});}}            
          placeholder="Last name" />
      

      
          <FormLabel>Email</FormLabel>
          <FormInput defaultValue={this.state.email} 
          inputStyle={styles.formInput}
          autoCapitalize="none" 
          placeholderTextColor={Constants.color3}
          onChangeText={(event)=>{
            this.setState({email:event});}}
          placeholder="Email" />



          <FormLabel>Password</FormLabel>
          <FormInput 
          secureTextEntry={true}
          inputStyle={styles.formInput}
          autoCapitalize="none" 
          placeholderTextColor={Constants.color3}
          onChangeText={(event)=>{
            this.setState({password:event});}}
          placeholder="Password" />


      
          <FormLabel>Confirm password</FormLabel>
          <FormInput
          secureTextEntry={true}
          inputStyle={styles.formInput}
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
      </KeyboardAwareScrollView>

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
    // paddingTop:10
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

var mapStateToProps = (state) => {
  return {
    userId:state.auth.user_id
  }
}


module.exports =  connect(mapStateToProps)(SignUp)
