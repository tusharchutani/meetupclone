import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Icon,Button, FormInput,CheckBox,Text,FormLabel } from 'react-native-elements';
import {connect} from 'react-redux';
import {flagUser,flagEvent,showAlert} from '../../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class ReportObjects extends Component {
 constructor(props) {
	    super(props);
	    this.state = {
	    	checkBox:[],
	    	isFormInvalid:false,
	    	isSubmitting:false,
        moreComments:""
	    }

      	feedbackList.map((feedbackItem)=>{this.state.checkBox[feedbackItem] = false});
	}	

 makeReport(){
    let report = this.state.checkBox;
    report["moreComments"] = this.state.moreComments;
		return report;
 }

 validateForm(){
 	//check if all of them are false
 	let isValid = false;
	let checkBoxes = this.state.checkBox;
	for (checkBoxKey in checkBoxes){
		isValid = isValid || this.state.checkBox[checkBoxKey];
	}
	this.setState({isFormInvalid:!isValid});
	return isValid;
 }


 reportObject(){
 	this.setState({isSubmitting:true});
 	if(this.validateForm()){
 		var report = this.makeReport();
    //if we are reporting event
    if(this.props.isEvent){
            this.props.dispatch(flagEvent(this.props.eventId,report)).then(()=>{
              this.setState({isSubmitting:false});
            }).catch((error)=>{
            this.setState({isSubmitting:false});
            this.props.dispatch(showAlert("Oops","Unable to report the user"));
          });
      }
      //if we are reporting user
      else{
        this.props.dispatch(flagUser(this.props.otherUserId,report)).then(()=>{
          this.setState({isSubmitting:false})
        }).catch((error)=>{
            this.setState({isSubmitting:false});
            this.props.dispatch(showAlert("Oops","Unable to report the user"));
          });
      } 
 	 }else{
    //form is invalid
 	 	this.setState({isFormInvalid:true, isSubmitting:false})
 	 }
	}


	checkboxEnable(feedbackItem){
		let checkBox = {...this.state.checkBox};
		checkBox[feedbackItem] = !this.state.checkBox[feedbackItem];
		this.setState({checkBox});
	}
	renderCheckBox(){
		return feedbackList.map((feedbackItem, i)=>
		 (<CheckBox
        key={i}
			  title={feedbackItem}
			  containerStyle={styles.checkBoxContainer}
			  checked={this.state.checkBox[feedbackItem]}
			  onPress={()=>{
			  	this.checkboxEnable(feedbackItem);
			  }}
			  textStyle={styles.checkBoxText}
			/>)
		)
	}
	componentWillMount(){
		let checkBox = this.state.checkBox;
		feedbackList.map((feedbackItem)=>{
			checkBox[feedbackItem] = false;
		});
	}
  render() {

    const isIOS = Platform.OS === 'ios';
  	let mainView = ( 
      <ScrollView style={{flex:1}}>
       <Text h4>Reason for reporting</Text>      
        {this.renderCheckBox()}
                <FormInput
                multiline
                maxLength={200}
                numberOfLines={4}
                fontSize={18}
                height={100}
                width={MULTILINE_TEXT_FIELD_HEIGHT}
                containerStyle={styles.testboxContainer} 
                placeholder="More info"
                inputStyle={styles.formInput}
                onChangeText={(event)=>{
                  this.setState({moreComments:event});
                }}
                blurOnSubmit={true} 
                />
          <Button
          medium
          title='Report'
          backgroundColor={Constants.color2} 
          containerViewStyle={styles.reportButton}
          disabled={this.state.isSubmitting}
          onPress={()=>{this.reportObject()}}/>
          {this.state.isFormInvalid && <FormLabel labelStyle={styles.formWarning}>Please select at least one reason for reporting</FormLabel>}
          
             {this.state.isSubmitting && <ActivityIndicator style={styles.activityIndicator} animating={true} color={Constants.color2}
                          size="large"/>}
                          </ScrollView>);
    if(isIOS){
     return (<KeyboardAwareScrollView style={styles.container}>
           {mainView}
           </KeyboardAwareScrollView>)
    }else{
      return (<KeyboardAvoidingView keyboardDismissMode="on-drag" keyboardVerticalOffset={80} style={styles.container} behavior="padding">
            {mainView}
            </KeyboardAvoidingView>);
    }
   
  }
}
const feedbackList = ["Nudity","Voilence","Harasment","Suicide or self-injury","Spam","Unauthorized sales","Hate speech"];
const styles = StyleSheet.create({
  container: {
  	flex: 1,
    // paddingTop:10,
    backgroundColor: '#F5FCFF',
  },activityIndicator:{
  	paddingTop:10
  },
  checkBoxText:{
	fontSize:16
  },
  checkBoxContainer:{
  	backgroundColor:'transparent'
  },
  formInput:{
  	paddingTop:20
  },
  testboxContainer:{
  	marginBottom:15
  },
  formWarning:{
  	fontSize:10,
  	color:'red'
  },reportButton:{
    paddingBottom:10
  }

});

const MULTILINE_TEXT_FIELD_HEIGHT=335;

  var mapStateToProps = (state) =>{
  	console.log("Event id is "+state.events.eventInfo._id);
    return {
      eventId: state.events.eventInfo ? state.events.eventInfo._id:null,
      userId: state.auth.user_id,
      otherUserId: state.profiles.other_user_profile ? state.profiles.other_user_profile._id:null,
      isEvent: state.flagObject.isEvent
    }
  }

module.exports = connect(mapStateToProps)(ReportObjects);