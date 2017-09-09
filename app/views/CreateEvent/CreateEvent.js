import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import moment from 'moment'
import { Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import Constants  from '../../MokUI/UIConstants';
import {MultiLineTextField} from '../../MokUI/MokUI';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {createEvent} from '../../actions';
import {connect} from 'react-redux';

export default class CreateEvent extends Component {

  constructor(props) {
      super(props);

      this.state = {
        isDateTimePickerVisible: false,

        eventTitle:"", 
        eventDescription:"",
        date:moment(),
        location:"",
        eventTags:"",

        isInvalid:{
          eventTitle:false,
          date:false,
          info:false,
          eventDescription:false,
          eventTags:false
        }
      }
    }
    
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
      this.setState({date});
      this._hideDateTimePicker();
    };

  _checkEventDateTimeTitle(){
    const {date, isInvalid} = this.state; 

    if(date > moment()){
      return moment(date).format('MMMM Do YYYY, h:mm:ss a'); 
    }
    return 'Pick a meet up date'
  }

  evetDateTimeView(){
      let PADDING_FOR_RN_ELEMENTS = 20;
          return (
            <View style={{paddingLeft:PADDING_FOR_RN_ELEMENTS,paddingTop:5}}>
            <Button
              medium
              title={this._checkEventDateTimeTitle()}
              backgroundColor={Constants.color3} 
              containerViewStyle={styles.createButton}
              onPress={this._showDateTimePicker}/>

              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                mode='datetime'/>                
          </View>);
      }
  
  createButtonValidation(){
    const {eventTitle, eventDescription, date, location, eventTags } = this.state; 
    var shouldBeDisabled = false;
    if((eventTitle.length < 5) || 
      (date < moment())||
      (date == 'Pick a meet up date') || 
      (eventTags.length < 4)){
      shouldBeDisabled = true;
    }

    return shouldBeDisabled;
  }

  _eventTitleChange(event){
    const {isInvalid} = this.state; 

    if(event.length < 5){
      isInvalid.eventTitle = true;
    }else{
      isInvalid.eventTitle = false;
    }
    this.setState({eventTitle:event, isInvalid});
  }

  _eventDescriptionChange(event){
    /*const {isInvalid} = this.state; 

    if(event.length < 12){
      isInvalid.eventDescription = true;
    }else{
      isInvalid.eventDescription = false;
    }*/
    this.setState({eventDescription:event});
  }
  _eventTagChange(event){
    const {isInvalid} = this.state; 

    if(event.length < 3){
      isInvalid.eventTags = true;
    }else{
      isInvalid.eventTags = false;
    }
    this.setState({eventTags:event, isInvalid});
  }


  _createEvent(){
    const state = this.state;
    // debugger
    this.props.dispatch(createEvent(state));
  }



  render() {
    return (
      <ScrollView style={styles.container}>
          <View style={styles.titleBar}> 
            <Icon name="clear" size={Constants.medium_icon_size} color={Constants.color2} onPress={()=> {this.props.navigation.goBack()}}/>
            <Text style={styles.title}>Create event</Text>
          </View>

          <View>
            <FormLabel>Event Title</FormLabel>
            <FormInput inputStyle={styles.formInput} placeholderTextColor={Constants.color3} placeholder="Event title" 
            onChangeText={(event)=>{
             this._eventTitleChange(event);
            }
          }/>
            {this.state.isInvalid.eventTitle && <FormValidationMessage>The event name should be at least 5 characters long</FormValidationMessage>}
            <FormLabel>Event date time</FormLabel>
            {this.evetDateTimeView()}

            <FormLabel>Event Description</FormLabel>
            <MultiLineTextField
            fieldWidth={MULTILINE_TEXT_FIELD_HEIGHT}
            maxLength={40}
            numberOfLines={4}
            height={100}
            placeholder="blah blah blah blah"
            onChangeText={(event)=>{this._eventDescriptionChange(event);
            }}            
            />


            <FormLabel>Event Tags (seperated by commas)</FormLabel>
            <MultiLineTextField 
            fieldWidth={MULTILINE_TEXT_FIELD_HEIGHT}
            maxLength={40}
            numberOfLines={2}
            height={45}
            placeholderTextColor={Constants.color3}
            placeholder="Enter event tags"
            onChangeText={(event)=>{this._eventTagChange(event);
            }}            
            />
            {this.state.isInvalid.eventTags && <FormValidationMessage>Please enter event tags (should be at least 3 character long)</FormValidationMessage>}

            <Button
              medium
              title='Create'
              backgroundColor={Constants.color2} 
              containerViewStyle={styles.createButton}
              disabled={this.createButtonValidation()}
              onPress={()=>{this._createEvent()}}/>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.color1,
    paddingTop:28 //TODO: remove this and add this to the app.js where <Provider> tag is
  },
  formInput:{
    color:Constants.color2
  },
  titleBar:{
    backgroundColor:Constants.color1,
    flexDirection:'row',
    alignItems:'center',
    padding:16,
  },
  title:{
    textAlign:'center',
    color:Constants.color2,
    fontSize:20,
  },
  formTitle:{
    color:Constants.color2
  },
  createButton:{
    padding:20
  }
});

const MULTILINE_TEXT_FIELD_HEIGHT=335;

var mapStateToProps = (state) =>{
  return {

        newEventTitle: state.eventTitle,
        newEventDescription:state.eventTitle,
        newventDate:state.date,
        newEventLocation:state.location,
        newEventTags:state.eventTags
  }
}



module.exports = connect(mapStateToProps)(CreateEvent);
// AppRegistry.registerComponent('CreateEvent', () => CreateEvent);