import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import moment from 'moment'
import {FormLabel, FormInput, Button } from 'react-native-elements'
import Constants  from '../../MokUI/UIConstants';
import {MultiLineTextField} from '../../MokUI/MokUI';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {createEvent, showAlert, getMyprofile, updateEventInfo} from '../../actions';
import {connect} from 'react-redux';
import axios from 'axios';
import {GOOGLE_MAP_API,EVENT_EDIT_TITLE,EVENT_EDIT_DESCRIPTION,EVENT_EDIT_TAG, GET_ALL_HOSTS_EVENTS} from '../../api';
import { Icon } from 'react-native-elements';

export default class EventEdit extends Component {


  constructor(props) {
    _intialTitle = "";
    _initialAddress="";
    _initialDescription="";
    _intialStartDate = moment();
    _initialTags=[];
    _initialStreet = "";
      super(props);

      this.state = {
        isDateTimePickerVisible: false,
        loading:false,
        isCreateButtonDisabled:true,
        eventInfo:{
                title:this.props.eventInfo.title,
                address:this.props.eventInfo.streetname,
                description:this.props.eventInfo.description,
                startDate:moment(this.props.eventInfo.startDate),
                tags:this.props.eventInfo.tags,
                street:this.props.eventInfo.street,
                location:this.props.eventInfo.location
              },
        isInvalid:{
          eventTitle:true,
          startDate:true,
          info:true,
          address:true,
          eventDescription:true,
          tags:true
        }
      }

      this._intialTitle = this.state.eventInfo.title;
      this._initialAddress= this.state.eventInfo.address;
      this._initialDescription=this.state.eventInfo.description;
      this._intialStartDate = this.state.eventInfo.startDate;
      this._initialTags=this.state.tags;
      this._initialStreet = this.state.street;      
    }

  validateForm(){
    const {title, startDate, tags, street} = this.state.eventInfo;
    if((title && title.length == 0) || (tags && tags.length == 0) || (street && street.length) == 0 || startDate <= moment()){
      this.setState({isCreateButtonDisabled:true});
    }else{
      this.setState({isCreateButtonDisabled:false});
    }
  }
    
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
      const {eventInfo,isInvalid} = this.state; 
      eventInfo.startDate=date;
      if(date <= moment()){
          isInvalid.startDate = true;
      }else{
        isInvalid.startDate = false;
      }
      this.setState({isInvalid});
      this.setState({eventInfo});      
      this._hideDateTimePicker();
      this.validateForm();
    };

  _checkEventDateTimeTitle(){

    const {eventInfo,isInvalid} = this.state; 

    if(eventInfo.startDate > moment()){
      // this.setState({date: moment(date).format('MMMM Do YYYY, h:mm:ss a')});
      return moment(eventInfo.startDate).format('MMMM Do YYYY, h:mm:ss a'); 
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


  _eventTitleChange(event){
    const {isInvalid, eventInfo} = this.state; 
    
    if(event.length < 5){
      isInvalid.eventTitle = true;
    }else{
      isInvalid.eventTitle = false;
    }
    eventInfo.title = event;
    this.setState({eventInfo, isInvalid});
    this.validateForm();
  }

  _eventDescriptionChange(event){
    const {eventInfo} = this.state; 
    eventInfo.description = event;
    this.setState({eventInfo});
  }
  _eventTagChange(event){
    const {isInvalid,eventInfo} = this.state; 

    if(event.length < 3){
      isInvalid.tags = true;
    }else{
      isInvalid.tags = false;
    }
    eventInfo.tags = event.replace(/\s+/, "").split(",");
    this.setState({eventInfo, isInvalid});
    this.validateForm();
  }

  _eventAddressChange(event){
    const {isInvalid, eventInfo} = this.state; 
    axios.get(GOOGLE_MAP_API(event)).then((response)=>{

      if(response.data.results.length != 1){
         isInvalid.address = true;
        this.setState({isInvalid});

      }else{

        isInvalid.address = false;
        eventInfo.street = event + " - "+response.data.results[0].formatted_address;
        let {lat, lng} = response.data.results[0].geometry.location;
        //city or not TODO

      /*  let cityArray = response.data.results[0].filter(function(e){
          console.log("e is "+e.type);
          return true;
        });*/
        // console.log(cityArray[0].long_name);
        // eventInfo.city = cityArray[0].long_name;

        
        eventInfo.location = [lng,lat];
        this.setState({eventInfo, isInvalid});
      }
    }).catch(()=>{
         isInvalid.address = true;
          this.setState({isInvalid});
      });
    this.validateForm();
  }
  saveEvent(){
    /*
        _intialTitle = "";
    _initialAddress="";
    _initialDescription="";
    _intialStartDate = moment();
    _initialTags=[];
    _initialStreet = "";
    */

    this.setState({loading:true});
    const {eventTitle, startDate, address, tags} = this.state.isInvalid; 
    
/*
EVENT_EDIT_TITLE
EVENT_EDIT_DESCRIPTION
EVENT_EDIT_TAG
GET_ALL_HOSTS_EVENTS
*/
  var eventId = this.props.eventInfo._id;

  var editEventsRequestArray = [];

  if(this._intialTitle != this.state.eventInfo.title){
    editEventsRequestArray.push(axios.put(EVENT_EDIT_TITLE(eventId),{title:this.state.eventInfo.title}));
  }
  if(this._initialAddress != this.state.eventInfo.street){
    // editEventsRequestArray.push(axios.post(EVENT_EDIT_ADDRESS(eventId),{title:this.state.eventInfo.title}));
  }
  if(this._initialDescription != this.state.eventInfo.description){
    editEventsRequestArray.push(axios.put(EVENT_EDIT_DESCRIPTION(eventId),
      {description:this.state.eventInfo.description}));
  }
  if(this._intialStartDate != this.state.eventInfo.startDate){
    // editEventsRequestArray.push(axios.put(EVENT_EDIT_TAG(eventId),{tags:this.state.eventInfo.tags}));
  }
  var a1 = this._initialTags || [];
  var a2 = this.state.eventInfo || [];
  if(!(a1.length==a2.tags.length && a1.every((v,i)=> v === a2[i]))){
    // editEventsRequestArray.push(axios.post(EVENT_EDIT_TAG(eventId),{tags:this.state.eventInfo.tags}));
  }

this.setState({isLoading:true});
axios.all(editEventsRequestArray).then(()=>{
  this.props.navigation.goBack();
  this.props.dispatch(updateEventInfo(eventId, this.props.userId)).then(()=>{
      this.setState({isLoading:false});
      this.props.dispatch(getMyprofile());
  })
  
}).catch((error)=>{
  this.props.dispatch(showAlert("Oops","There was an error editing the event"));
  this.setState({isCreateButtonDisabled:false});

});
    
 }

  render() {

    var tagString ="";
    const {tags} = this.state.eventInfo;
    for(var x = 0; x < tags.length;x++){
      if(x == 0){
        tagString = tags[x]
      }else {
        tagString = ","+tags[x];
      }
    }
    
    return (

       <View style={styles.container}>
        <ScrollView>
            <View>
              <FormLabel>Event Title</FormLabel>
              <FormInput defaultValue={this.state.eventInfo.title} inputStyle={styles.formInput} placeholderTextColor={Constants.color3} placeholder="Event title" 
              onChangeText={(event)=>{
               this._eventTitleChange(event);
              }
            }/>
              {this.state.isInvalid.eventTitle && <FormLabel labelStyle={styles.formWarning}>The event name should be at least 5 characters long</FormLabel>}

              <FormLabel>Event address</FormLabel>
              <FormInput defaultValue={this.state.eventInfo.address} inputStyle={styles.formInput} 
              placeholderTextColor={Constants.color3} 
              placeholder="Event address" 
              onChangeText={(event)=>{
                this._eventAddressChange(event);
              }
            }/>
            {this.state.isInvalid.address && <FormLabel FormLabel labelStyle={styles.formWarning}>The address is not valid</FormLabel>}



              <FormLabel>Event date time</FormLabel>
              {this.evetDateTimeView()}

              <FormLabel>Event Description</FormLabel>
              <MultiLineTextField
              defaultValue={this.state.eventInfo.description}
              maxLength={40}
              numberOfLines={4}
              height={100}
              style={styles.formInput} 
              width={MULTILINE_TEXT_FIELD_HEIGHT}
              placeholder="Event description"
              onChangeText={(event)=>{this._eventDescriptionChange(event);
              }}            
              />


              <FormLabel>Event Tags (seperated by commas)</FormLabel>

            <MultiLineTextField
              defaultValue={tagString}
              maxLength={200}
              numberOfLines={4}
              height={50}
              width={MULTILINE_TEXT_FIELD_HEIGHT}
              style={styles.formInput} 
              placeholder="Event Tags"
              onChangeText={(event)=>{this._eventTagChange(event);
              }}            
              />

              {this.state.isInvalid.tags && <FormLabel labelStyle={styles.formWarning}>Please enter event tags (should be at least 3 character long)</FormLabel>}

              <Button
                medium
                title='Edit'
                backgroundColor={Constants.color2} 
                containerViewStyle={styles.createButton}
                disabled={this.state.isCreateButtonDisabled}
                onPress={()=>{this.saveEvent()}}/>
            </View>
        </ScrollView>      
      </View>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.color1,
    // marginTop:28 //TODO: remove this and add this to the app.js where <Provider> tag is
  },
  formInput:{
    color:Constants.color2
  },
  titleBar:{
    backgroundColor:Constants.color1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingBottom:16,
    paddingTop:25

  },
  title:{
    textAlign:'left',
    color:Constants.color2,
    fontSize:22,
    paddingRight:180
  },
  formTitle:{
    color:Constants.color2
  },formWarning:{
  fontSize:10
  },
  createButton:{
    padding:20
  }
});
/*
{
  "_id": "59e5a822669999b5413ba1fd",
  "updatedAt": "2017-10-17T07:27:32.255Z",
  "createdAt": "2017-10-17T06:50:10.228Z",
  "title": "How I met your morther screening",
  "city": "",
  "description": "",
  "host": "59e1da3d1e596a4d2ac67b35",
  "streetname": "1/18199 70th Ave Surrey BC - 18199 70 Ave, Surrey, BC V3S 8E7, Canada",
  "location": [
    -122.7180252,
    49.1303184
  ],
  "backgroundimage": "",
  "startDate": "2017-10-19T06:48:34.000Z",
  "endDate": null,
  "__v": 2,
  "discussionboard": [],
  "going": [],
  "interested": [],
  "tags": [
    "show"
  ]
}
*/
const MULTILINE_TEXT_FIELD_HEIGHT=335;

var mapStateToProps = (state) => {
  return {
    eventInfo:state.events.eventInfo,
    userId:state.auth.user_id
  }
}

module.exports = connect(mapStateToProps)(EventEdit);
